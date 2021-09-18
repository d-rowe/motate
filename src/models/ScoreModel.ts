import {
    MeasureConfig,
    StaveConfig,
    VexVoice,
    VF
} from '../constants';
import MeasureModel from './MeasureModel';

// Width factor (min renderable width = 1)
const MEASURE_WIDTH_FACTOR = 2;

type SystemMeasure = {
    measures: MeasureModel[],
    width: number,
}

type Score = SystemMeasure[];

export function createScore(staves: StaveConfig[]): Score {
    const formatter = new VF.Formatter();
    const systemMeasureConfig = getSystemMeasureConfig();
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
        const voiceWidth = minVoiceWidth * MEASURE_WIDTH_FACTOR;

        formatter.format(voices, voiceWidth);

        return {
            measures,
            width: maxNoteStartX + voiceWidth,
        };
    });

    /**
     * Get system measures indexed by measure number
     * helpful for chronological operations
     */
    function getSystemMeasureConfig() {
        const initSystemMeasures: MeasureConfig[][] = [];
        return staves.reduce((acc, stave) => {
            const {clef} = stave;
            stave.measures?.forEach((measure, measureIndex) => {
                const isFirstMeasure = measureIndex === 0;

                if (!acc[measureIndex]) {
                    acc[measureIndex] = [];
                }

                acc[measureIndex].push({
                    ...measure,
                    clef,
                    showClef: isFirstMeasure,
                    showTimeSignature: isFirstMeasure,
                });
            });

            return acc;
        }, initSystemMeasures);
    }
}
