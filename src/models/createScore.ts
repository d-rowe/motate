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
const VOICE_WIDTH_FACTOR = 2.2;
const DEFAULT_MAX_WIDTH = 700;

type ProcessedSystemMeasure = {
    measures: MeasureModel[];
    noteStartX: number;
    voices: Vex.Flow.Voice[];
};

/**
 * Create formatted score model from stave configs
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

    systemMeasureConfig.forEach(processSystemMeasure);

    return score;

    /**
     * Get system measures indexed by measure number
     * helpful for chronological operations
     *
     * This esentially just rotates the staves matrix from
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

    function processSystemMeasure(systemMeasure: MeasureConfig[]): void {
        const {
            measures,
            voices,
            noteStartX,
        } = getProcessedSystemMeasures(systemMeasure);

        const minVoiceWidth = formatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = minVoiceWidth * VOICE_WIDTH_FACTOR;
        const width = noteStartX + voiceWidth;

        if (currentSystemWidth + width > maxSystemWidth) {
            // Not enough space in current system,
            // we have to start a new one
            currentSystemWidth = 0;
            currentSystemIndex++;
            // TODO: we'll have to so some re-formatting
            //       on the previous system to stretch
            //       across entire available width
        } else {
            currentSystemWidth += width;
        }

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
}

function getProcessedSystemMeasures(systemMeasure: MeasureConfig[]): ProcessedSystemMeasure {
    let noteStartX = 0;
    const voices: VexVoice[] = [];
    const measures = systemMeasure.map(staveMeasure => {
        // TODO: cache measure model by measure/stave indexes
        //       this will help with component memoization/perf in future
        const measure = new MeasureModel(staveMeasure);
        noteStartX = Math.max(measure.stave.getNoteStartX(), noteStartX);
        voices.push(measure.voice);
        return measure;
    });

    return {
        measures,
        noteStartX,
        voices,
    }
}
