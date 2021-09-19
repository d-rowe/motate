import React from 'react';
import styled from '@emotion/styled';
import {VerticalContainer} from '../base';

import type {StaveConfig} from '../../constants';

const LeftContainer = styled(VerticalContainer)`
    justify-items: stretch;
    justify-content: space-between;
    padding: 0 12px 0 0;
    margin: 42px 0;
    text-align: right;
    border-right: 4px solid black;
`;

const InstrumentLabel = styled.p`
    margin: 10px 0 12px;
    white-space: nowrap;
`;

type Props = {
    staves: StaveConfig[],
    showInstrumentLabels: boolean,
};

function Left(props: Props) {
    const {
        staves,
        showInstrumentLabels,
    } = props;

    return (
        <LeftContainer>
            {showInstrumentLabels && staves.map(({name}, i) => (
                <InstrumentLabel key={i}>
                    {name}
                </InstrumentLabel>
            ))}
        </LeftContainer>
    );
}

export default React.memo(Left);
