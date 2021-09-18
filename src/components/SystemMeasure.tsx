import React from 'react';
import Measure from './Measure';

/**
 * A measure that can span multiple instruments (or "staves")
 */

function SystemMeasure({systemMeasure}: Props): JSX.Element {
    const {measures, width} = systemMeasure;
    return (
        <div className='system-measure'>
            {measures.map(measure => (
                <Measure {...measure} width={width} />
            ))}
        </div>
    );
}

export default React.memo(SystemMeasure);
