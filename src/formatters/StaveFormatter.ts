import BaseFormatter from './BaseFormatter';
import MeasureModel from '../lib/MeasureModel';

type PreformattedMeasureDimensions = {
    noteStartX: number,
    minVoiceWidth: number,
};

class StaveFormatter extends BaseFormatter {
    private measures: MeasureModel[] = [];
    private measureWidths: number[] = [];

    setMeasure(measure: MeasureModel) {
        const {measureIndex} = measure;
        if (measureIndex === undefined) {
            throw new Error('measureIndex must be supplied for stave formatting');
        }

        this.measures[measureIndex] = measure;
    }

    getMeasureWidth(measure: MeasureModel): number {
        const {measureIndex = 0} = measure;
        return this.measureWidths[measureIndex];
    }

    format() {
        const measuresDimensions = this.measures.map(measure => {
            const {stave, voice} = measure;
            const noteStartX = stave.getNoteStartX();
            const minVoiceWidth = this.vexFormatter.preCalculateMinTotalWidth([voice]);
            return {
                noteStartX,
                minVoiceWidth,
            }
        });

        const widthFactor = this.getWidthFactor(measuresDimensions);

        this.measures.forEach((measure, i) => {
            const {minVoiceWidth, noteStartX}  = measuresDimensions[i];
            const measureWidth = (minVoiceWidth * widthFactor) + noteStartX;
            const voiceWidth = minVoiceWidth * widthFactor;

            this.measureWidths[i] = measureWidth;
            measure.stave.setWidth(measureWidth);
            this.vexFormatter.format([measure.voice], voiceWidth);
        });
    }

    private getWidthFactor(measuresDimensions: PreformattedMeasureDimensions[]): number {
        const {width} = this.options;
        if (width === undefined) {
            return this.WIDTH_FACTOR;
        }

        let minTotalVoiceWidth = 0;
        let avalableVoiceWidth = width;
        measuresDimensions.forEach(dimensions => {
            minTotalVoiceWidth += dimensions.minVoiceWidth;
            avalableVoiceWidth -= dimensions.noteStartX;
        });

        return avalableVoiceWidth / minTotalVoiceWidth / this.measures.length;
    }
}

export default StaveFormatter;
