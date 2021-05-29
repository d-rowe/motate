import {VexFormatter, VexVoice, VF} from './constants';
import MeasureModel from './components/Measure/MeasureModel';

export type Options = {
    width?: number,
};

export default class BaseFormatter {
    options?: Options;
    vexFormatter: VexFormatter;
    WIDTH_FACTOR = 2;

    constructor(options?: Options) {
        this.options = options;
        this.vexFormatter = new VF.Formatter();
    }

    setMeasure(measure: MeasureModel) {}

    getMeasureWidth(measure: MeasureModel): number { return 0; }

    format() {}
}
