import React from 'react';
import createScore from '../models/createScore';
import {VerticalContainer} from './base';
import System from './System';

import type {StaveConfig as StaveType} from '../constants';

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};


function Score({showInstrumentLabels, staves}: Props) {
    const score = createScore(staves);
    return (
        <VerticalContainer>
            {score.map((system, i) => (
                <System
                    key={i}
                    system={system}
                    staves={staves}
                    showInstrumentLabels={showInstrumentLabels}
                />
            ))}
        </VerticalContainer>
    );
}

export default React.memo(Score);
