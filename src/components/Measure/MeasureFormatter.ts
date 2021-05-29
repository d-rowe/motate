import BaseFormatter from '../../BaseFormatter';
import MeasureModel from './MeasureModel';

class MeasureFormatter extends BaseFormatter {
    private measure?: MeasureModel;
    width?: number;

    setMeasure(measure: MeasureModel) {
        this.measure = measure;
        this.joinVoices([measure.voice]);
    }

    format() {
        if (!this.measure) {
            throw new Error('Cannot format before setting measure');
        }

        const {stave, voice} = this.measure;
        const voices = [voice];
        const startX = stave.getNoteStartX();

        const {width} = this.options || {};
        if (width) {
            this.vexFormatter.format(voices, width - startX);
            return;
        }

        // No width provided - calculate appropriate width
        this.vexFormatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = this.vexFormatter.getMinTotalWidth() * this.WIDTH_FACTOR;
        this.width = startX + voiceWidth;
        this.measure.stave.setWidth(this.width);
        this.vexFormatter.format(voices, voiceWidth);
    }
}

export default MeasureFormatter;