import React from 'react';
import styled from '@emotion/styled';
import Measure from './Measure';

import type {SystemMeasure as SystemMeasureType} from '../models/constants';

/**
 * A measure that can span multiple instruments (or "staves")
 */

const SystemMeasureContainer = styled.div`
    position: relative;
`;

const MeasureNumber = styled.p`
    position: absolute;
    top: -10px;
    left: 4px;
`;

type Props = {
    systemMeasure: SystemMeasureType,
    measureNumber?: number,
}

function SystemMeasure({systemMeasure, measureNumber}: Props): JSX.Element {
    const {
        measures,
        width
    } = systemMeasure;
    return (
        <SystemMeasureContainer style={{width}}>
            {Number.isFinite(measureNumber) &&
                <MeasureNumber>
                    {measureNumber}
                </MeasureNumber>
            }
            {measures.map((measure, i) => (
                <Measure
                    key={i}
                    measure={measure}
                />
            ))}
        </SystemMeasureContainer>
    );
}

export default React.memo(SystemMeasure);
