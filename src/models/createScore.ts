import {VF} from '../constants';
import MeasureModel from './MeasureModel';

import type {
    StaveConfig,
    VexVoice,
} from '../constants';
import type {
    SystemMeasureConfig,
    System,
} from './constants';

// Width factor (min renderable width = 1)
const VOICE_WIDTH_FACTOR = 2.2;
const DEFAULT_MAX_WIDTH = 500;

/**
 * Create formatted score model from stave configs
 */
export default function createSystem(
    staves: StaveConfig[],
    width?: number,
): System {
    const maxSystemWidth = width || DEFAULT_MAX_WIDTH;
    const formatter = new VF.Formatter();
    const systemMeasureConfig = getSystemMeasureConfig();

    let currentSystemWidth = 0;
    return systemMeasureConfig.map(systemMeasure => {
        let maxNoteStartX = 0;
        const voices: VexVoice[] = [];
        const measures = systemMeasure.map(staveMeasure => {
            // TODO: cache measure model by measure/stave indexes
            //       this will help with component memoization/perf in future
            const measure = new MeasureModel(staveMeasure);
            const noteStartX = measure.stave.getNoteStartX();
            if (noteStartX > maxNoteStartX) {
                maxNoteStartX = noteStartX;
            }
            voices.push(measure.voice);
            return measure;
        });

        const minVoiceWidth = formatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = minVoiceWidth * VOICE_WIDTH_FACTOR;
        const width = maxNoteStartX + voiceWidth;

        // TODO: complete
        if (currentSystemWidth + width > maxSystemWidth) {
            console.log('need new system');
            currentSystemWidth = 0;
        } else {
            currentSystemWidth += width;
        }
        console.log(currentSystemWidth);

        // update staves to calculated width
        measures.forEach(({stave}) => stave.setWidth(width));
        // format cross-stave voices (align across x axis)
        formatter.format(voices, voiceWidth);

        return {measures, width};
    });

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
            stave.measures?.forEach((measure, measureIndex) => {
                const isFirstMeasure = measureIndex === 0;
                systemMeasures[measureIndex] = systemMeasures[measureIndex] || [];
                systemMeasures[measureIndex].push({
                    ...measure,
                    clef: stave.clef,
                    hasBegBarline: !isFirstMeasure,
                    showClef: isFirstMeasure,
                    showTimeSignature: isFirstMeasure,
                });
            });

            return systemMeasures;
        }, initSystemMeasures);
    }
}
