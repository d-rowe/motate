import {Measure, Stave} from "../constants";
import MeasureModel from "./MeasureModel";

type Staves = Stave[];

class ScoreModel {
    private staves: Staves;
    private systemMeasures: Measure[][];

    constructor(staves: Staves) {
        this.staves = staves;
        this.systemMeasures = this.getDerivedSystemMeasures();
        this.format();
    }

    format() {
        this.systemMeasures.forEach((systemMeasure, measureIndex) => {
            let minWidth = Infinity;
            systemMeasure.forEach((staveMeasure, staveIndex) => {
                const measureModel = new MeasureModel(staveMeasure);
                if (measureModel.width < minWidth) {
                    minWidth = measureModel.width;
                }
            });
            console.log(minWidth);
        });
    }

    /**
     * Get measures (across system) indexed by measure number
     * helpful for chronological operations
     */
    getDerivedSystemMeasures(): Measure[][] {
        const systemMeasures: Measure[][] = []
        return this.staves.reduce((acc, stave) => {
            const {clef} = stave;
            stave.measures?.forEach((measure, measureIndex) => {
                if (!acc[measureIndex]) {
                    acc[measureIndex] = [];
                }

                acc[measureIndex].push({...measure, clef});
            });

            return acc;
        }, systemMeasures);
    }
}

export default ScoreModel;
