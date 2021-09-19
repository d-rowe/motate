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
const DEFAULT_MAX_WIDTH = 800;

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
    systemMeasureConfig.forEach(systemMeasure => {
        const {
            measures,
            voices,
            noteStartX,
        } = processSystemMeasures(systemMeasure);

        const minVoiceWidth = formatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = minVoiceWidth * VOICE_WIDTH_FACTOR;
        const width = noteStartX + voiceWidth;

        // TODO: complete
        if (currentSystemWidth + width > maxSystemWidth) {
            console.log('need new system');
            currentSystemWidth = 0;
            currentSystemIndex++;
        } else {
            currentSystemWidth += width;
        }

        // update staves to calculated width
        measures.forEach(({stave}) => stave.setWidth(width));
        // format cross-stave voices (align across x axis)
        formatter.format(voices, voiceWidth);

        // Assure system entry exists
        score[currentSystemIndex] = score[currentSystemIndex] || [];

        // Hide begBarLine if first system measure in system
        if (!score[currentSystemIndex].length) {
            measures.forEach(m => {
                m.clearBegBarLine();

                if (currentSystemIndex !== 0) {
                    m.showTimeSignature();
                    m.showClef();
                }
            });
        }
        // need to push this to the correct system within score
        score[currentSystemIndex].push({measures, width});
    });

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

function processSystemMeasures(systemMeasure: MeasureConfig[]) {
    let noteStartX = 0;
    const voices: VexVoice[] = [];
    const measures = systemMeasure.map(staveMeasure => {
        // TODO: cache measure model by measure/stave indexes
        //       this will help with component memoization/perf in future
        const measure = new MeasureModel(staveMeasure);
        const currentNoteStartX = measure.stave.getNoteStartX();
        if (currentNoteStartX > noteStartX) {
            noteStartX = currentNoteStartX;
        }
        voices.push(measure.voice);
        return measure;
    });

    return {
        measures,
        noteStartX,
        voices,
    }
}
