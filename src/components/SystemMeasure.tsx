import React from 'react';
import Measure from './Measure';
import type {SystemMeasure as SystemMeasureType} from '../constants';

/**
 * A measure that can span multiple instruments (or "staves")
 */

type Props = {
    systemMeasure: SystemMeasureType,
};

function SystemMeasure({systemMeasure}: Props): JSX.Element {
    return (
        <div className='system-measure'>
            {systemMeasure.map(measure => <Measure {...measure} />)}
        </div>
    );
}

export default React.memo(SystemMeasure);
