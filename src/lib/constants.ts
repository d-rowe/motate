import type MeasureModel from './MeasureModel';
import type {MeasureConfig} from '../constants';

export type SystemMeasureConfig = MeasureConfig[][];

export type SystemMeasure = {
    measures: MeasureModel[],
    width: number,
    voiceWidth: number,
    config: MeasureConfig[],
};

export type System = SystemMeasure[];
export type Score = System[];
