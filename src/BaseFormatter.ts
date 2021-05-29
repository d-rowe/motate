import {VexFormatter, VexVoice, VF} from './constants';
import MeasureModel from './components/Measure/MeasureModel';

export type Options = {
    width?: number,
};

export default class BaseFormatter {
    options?: Options;
    vexFormatter: VexFormatter;
    width?: number;
    WIDTH_FACTOR = 2;

    constructor(options?: Options) {
        this.options = options;
        this.vexFormatter = new VF.Formatter();
    }

    setMeasure(measure: MeasureModel) {}

    format() {}

    joinVoices(voices: VexVoice[]) {
        this.vexFormatter = new VF.Formatter();
        this.vexFormatter.joinVoices(voices);
    }
}
