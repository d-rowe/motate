import {
    MeasureConfig,
    StaveConfig,
    SystemMeasure,
    VexFormatter,
    VexVoice,
    VF
} from '../constants';
import MeasureModel from './MeasureModel';

// Width factor (min renderable width = 1)
const MEASURE_WIDTH_FACTOR = 1.3;

type Staves = StaveConfig[];

class ScoreModel {
    private staves: Staves;
    private scoreModel: MeasureModel[][] = [];
    private systemMeasures: SystemMeasure[] = [];
    private systemMeasureWidths: number[] = [];
    private formatter: VexFormatter;

    constructor(staves: Staves) {
        this.formatter = new VF.Formatter();
        this.staves = staves;
        this.deriveSystemMeasures();
        this.format();
    }

    format() {
        this.systemMeasures.forEach((systemMeasure, systemMeasureIndex) => {
            let maxNoteStartX = 0;
            const voices: VexVoice[] = [];
            systemMeasure.forEach(staveMeasure => {
                // TODO: cache measure model by measure/stave indexes
                //       this will help with component memoization/perf in future
                const measureModel = new MeasureModel(staveMeasure);
                const noteStartX = measureModel.stave.getNoteStartX();
                if (noteStartX > maxNoteStartX) {
                    maxNoteStartX = noteStartX;
                }
                voices.push(measureModel.voice);

                if (!this.scoreModel[systemMeasureIndex]) {
                    this.scoreModel[systemMeasureIndex] = [];
                }

                this.scoreModel[systemMeasureIndex].push(measureModel);
            });

            const minStaveMeasureWidth = maxNoteStartX + this.formatter.preCalculateMinTotalWidth(voices);
            const systemMeasureWidth = minStaveMeasureWidth * MEASURE_WIDTH_FACTOR;
            this.systemMeasureWidths[systemMeasureIndex] = minStaveMeasureWidth;
            this.formatter.format(voices, systemMeasureWidth);
        });
    }

    /**
     * Set system measures indexed by measure number
     * helpful for chronological operations
     */
    deriveSystemMeasures(): void {
        const initSystemMeasures: MeasureConfig[][] = [];
        this.systemMeasures = this.staves.reduce((acc, stave) => {
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

    getSystemMeasures(): SystemMeasure[] {
        return this.systemMeasures;
    }

    getSystemMeasureWidth(systemMeasureIndex: number): number | undefined {
        return this.systemMeasureWidths[systemMeasureIndex];
    }
}

export default ScoreModel;
