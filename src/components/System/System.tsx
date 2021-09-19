import React, {PureComponent} from 'react';
import createSystem from '../../models/createScore';
import Left from './Left';
import Right from './Right';
import SystemMeasure from '../SystemMeasure';
import {FlexContainer} from '../base';

import type {StaveConfig as StaveType} from '../../constants';

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};


class System extends PureComponent<Props> {
    static defaultProps = {
        showInstrumentLabels: true,
    };


    render() {
        const {showInstrumentLabels, staves} = this.props;
        const system = createSystem(staves);

        return (
            <FlexContainer>
                <Left
                    staves={staves}
                    showInstrumentLabels={showInstrumentLabels}
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
