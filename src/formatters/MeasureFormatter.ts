import BaseFormatter from './BaseFormatter';
import MeasureModel from '../lib/MeasureModel';

class MeasureFormatter extends BaseFormatter {
    private measure?: MeasureModel;
    private width?: number;

    setMeasure(measure: MeasureModel) {
        this.measure = measure;
        this.vexFormatter.joinVoices([measure.voice]);
    }

    getMeasureWidth(): number {
        return this.width || 0;
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
            this.width = width;
            return;
        }

        // No width provided - calculate appropriate width
        this.vexFormatter.preCalculateMinTotalWidth(voices);
        const voiceWidth = this.vexFormatter.getMinTotalWidth() * this.WIDTH_FACTOR;
        const newWidth = startX + voiceWidth;
        this.measure.stave.setWidth(newWidth);
        this.width = newWidth + 1;
        this.vexFormatter.format(voices, voiceWidth);
    }
}

export default MeasureFormatter;
