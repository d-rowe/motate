import {Measure, Stave, VexFormatter, VexVoice, VF} from '../constants';
import MeasureModel from './MeasureModel';

type Staves = Stave[];

class ScoreModel {
    private staves: Staves;
    private systemMeasures: Measure[][];
    private formatter: VexFormatter;

    constructor(staves: Staves) {
        this.formatter = new VF.Formatter();
        this.staves = staves;
        this.systemMeasures = this.getDerivedSystemMeasures();
        this.format();
    }

    format() {
        this.systemMeasures.forEach(systemMeasure => {
            let maxNoteStartX = 0;
            const voices: VexVoice[] = [];
            systemMeasure.forEach(staveMeasure => {
                const measureModel = new MeasureModel(staveMeasure);
                const noteStartX = measureModel.stave.getNoteStartX();
                if (noteStartX > maxNoteStartX) {
                    maxNoteStartX = noteStartX;
                }
                voices.push(measureModel.voice);
            });

            const minStaveMeasureWidth = maxNoteStartX + this.formatter.preCalculateMinTotalWidth(voices)
            this.formatter.format(voices, minStaveMeasureWidth * 1.4);
        });
    }

    /**
     * Get measures (across system) indexed by measure number
     * helpful for chronological formatting
     */
    getDerivedSystemMeasures(): Measure[][] {
        const systemMeasures: Measure[][] = []
        return this.staves.reduce((acc, stave) => {
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
        }, systemMeasures);
    }
}

export default ScoreModel;
