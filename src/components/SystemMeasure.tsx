import React from 'react';
import Measure from './Measure';

/**
 * A measure that can span multiple instruments (or "staves")
 *
 * TODO: add prop type
 */
function SystemMeasure({systemMeasure}): JSX.Element {
    const {measures, width} = systemMeasure;
    return (
        <div className='system-measure' style={{width}}>
            {measures.map(measure => (
                <Measure {...measure} />
            ))}
        </div>
    );
}

export default React.memo(SystemMeasure);
