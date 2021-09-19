import React from 'react';
import Measure from './Measure';

import type {SystemMeasure as SystemMeasureType} from '../models/constants';

/**
 * A measure that can span multiple instruments (or "staves")
 */

type Props = {
    systemMeasure: SystemMeasureType,
}

function SystemMeasure({systemMeasure}: Props): JSX.Element {
    const {measures, width} = systemMeasure;
    return (
        <div className='system-measure' style={{width}}>
            {measures.map((measure, i) => (
                <Measure
                    key={i}
                    measure={measure}
                />
            ))}
        </div>
    );
}

export default React.memo(SystemMeasure);
