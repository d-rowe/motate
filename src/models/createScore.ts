import {VF} from '../constants';
import MeasureModel from './MeasureModel';

import type {
    StaveConfig,
    VexVoice,
    MeasureConfig,
} from '../constants';
import type {
    SystemMeasureConfig,
    Score,
} from './constants';

// Width factor (min renderable width = 1)
const DEFAULT_VOICE_WIDTH_FACTOR = 2.2;
const DEFAULT_MAX_WIDTH = 700;

type CalculatedSystemMeasure = {
    measures: MeasureModel[];
    voices: Vex.Flow.Voice[];
    voiceWidth: number,
    width: number,
};

/**
 * Create formatted score model from stave configs
 *
 * NOTE:
 *    this is expensive, and it's worth
 *    investigating where memoization/other
 *    perf improvements can be made
 *
 *    shallow equality in resulting score's
 *    members can be used in future to
 *    prevent unwanted/unnecessary renders
 */
export default function createScore(
    staves: StaveConfig[],
    width?: number,
): Score {
    const maxSystemWidth = width || DEFAULT_MAX_WIDTH;
    const formatter = new VF.Formatter();
    const systemMeasureConfig = getSystemMeasureConfig();

    const score: Score = [];
    let currentSystemWidth = 0;
    let currentSystemIndex = 0;

    systemMeasureConfig.forEach(formatSystemMeasure);

    return score;

    /**
     * Get system measures indexed by measure number
     * helpful for chronological operations
     *
     * This essentially just rotates the staves matrix from
     * being stave indexed to being measure indexed
     */
    function getSystemMeasureConfig(): SystemMeasureConfig {
        const initSystemMeasures: SystemMeasureConfig = [];
        return staves.reduce((systemMeasures, stave) => {
            stave.measures?.forEach((measureConfig, measureIndex) => {
                const isFirstMeasure = measureIndex === 0;
                systemMeasures[measureIndex] = systemMeasures[measureIndex] || [];
                systemMeasures[measureIndex].push({
                    ...measureConfig,
                    clef: stave.clef,
                    hasBegBarline: !isFirstMeasure,
                    showClef: isFirstMeasure,
                    showTimeSignature: isFirstMeasure,
                });
            });

            return systemMeasures;
        }, initSystemMeasures);
    }

    function formatSystemMeasure(systemMeasure: MeasureConfig[], measureIndex: number): void {
        let calculatedSystemMeasure = calculateSystemMeasure(
            systemMeasure,
            measureIndex === 0,
        );

        const nextSystemWidth = currentSystemWidth + calculatedSystemMeasure.width;
        if (nextSystemWidth > maxSystemWidth) {
            // Not enough space in current system,
            // we have to start a new one
            currentSystemWidth = 0;
            currentSystemIndex++;
            // re-calculate system measure with clef and timesig visible
            calculatedSystemMeasure = calculateSystemMeasure(systemMeasure, true);
            /**
             * TODO: re-calculate/format entire last
             *       system to fill width entirely
             */
        } else {
            currentSystemWidth = nextSystemWidth;
        }

        const {
            measures,
            voices,
            voiceWidth,
            width,
        } = calculatedSystemMeasure;

        // update measures to newly calculated width
        measures.forEach(m => m.setWidth(width));
        /**
         * format cross-stave voices (align across x axis)
         *
         * once we have post-processing logic (notes below), we should
         * try to avoid formatting until we can we can do one batch
         * format across the entire score
         */
        formatter.format(voices, voiceWidth);

        // Assure system entry exists
        score[currentSystemIndex] = score[currentSystemIndex] || [];

        /**
         * We'll have to do some sort of post-processing here
         * to set things like clef & time sig visibility,
         * and reformat/recreate measures accordingly
         *
         * This is just a short-term workaround
         */
        if (!score[currentSystemIndex].length) {
            // Hide begBarLine if first system measure
            measures.forEach(m => m.clearBegBarLine());
        }

        // need to push this to the correct system within score
        score[currentSystemIndex].push({measures, width});
    }

    function calculateSystemMeasure(
        systemMeasure: MeasureConfig[],
        isStartOfSystem: boolean = false,
        voiceWidthFactor?: number,
    ): CalculatedSystemMeasure {
        let noteStartX = 0;
        const voices: VexVoice[] = [];
        const measures = systemMeasure.map(staveMeasure => {
            const measure = new MeasureModel({
                ...staveMeasure,
                showClef: isStartOfSystem,
                showTimeSignature: isStartOfSystem,
            });
            noteStartX = Math.max(measure.stave.getNoteStartX(), noteStartX);
            voices.push(measure.voice);
            return measure;
        });

        const minTotalWidth = formatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = minTotalWidth * (voiceWidthFactor || DEFAULT_VOICE_WIDTH_FACTOR);

        return {
            measures,
            voices,
            voiceWidth,
            width: noteStartX + voiceWidth,
        }
    }
}
