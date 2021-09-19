import type MeasureModel from './MeasureModel';
import type {MeasureConfig} from '../constants';

export type SystemMeasure = {
    measures: MeasureModel[],
    width: number,
}

export type SystemMeasureConfig = MeasureConfig[][];

export type System = SystemMeasure[];
export type Score = System[];
