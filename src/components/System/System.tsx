import React, {PureComponent} from 'react';
import Left from './Left';
import Right from './Right';
import SystemMeasure from '../SystemMeasure';
import {FlexContainer} from '../base';

import type {StaveConfig as StaveType} from '../../constants';
import type {System as SystemType} from '../../lib/constants';

export type Props = {
    staves: StaveType[],
    system: SystemType,
    showInstrumentLabels: boolean,
    onInstrumentLabelResize: (width: number) => void,
};


class System extends PureComponent<Props> {
    static defaultProps = {
        showInstrumentLabels: true,
    };


    render() {
        const {
            staves,
            system,
            showInstrumentLabels,
            onInstrumentLabelResize,
        } = this.props;
        return (
            <FlexContainer>
                <Left
                    staves={staves}
                    showInstrumentLabels={showInstrumentLabels}
                    onInstrumentLabelResize={onInstrumentLabelResize}
                />
                <FlexContainer>
                    {system.map((systemMeasure, i) => (
                        <SystemMeasure
                            key={i}
                            systemMeasure={systemMeasure}
                        />
                    ))}
                </FlexContainer>
                <Right />
            </FlexContainer>
        )
    }
}

export default System;
