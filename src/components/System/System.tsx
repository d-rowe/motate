import React, {PureComponent} from 'react';
import ScoreModel from '../../models/ScoreModel';
import Left from './Left';
import Right from './Right';
import SystemMeasure from '../SystemMeasure';
import {FlexContainer} from '../base';

import type {StaveConfig as StaveType} from '../../constants';

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};

type State = {
    scoreModel: ScoreModel,
};

class System extends PureComponent<Props, State> {
    static defaultProps = {
        showInstrumentLabels: true,
    };

    constructor(props: Props) {
        super(props);
        this.state = getStateFromProps(props);
    }

    static getDerivedStateFromProps(props: Props): State {
        return getStateFromProps(props);
    }

    render() {
        const {showInstrumentLabels, staves} = this.props;
        const systemMeasures = this.state.scoreModel.getSystemMeasures();

        return (
            <FlexContainer>
                <Left
                    staves={staves}
                    showInstrumentLabels={showInstrumentLabels}
                />
                <FlexContainer>
                    {systemMeasures.map(systemMeasure => (
                        <SystemMeasure systemMeasure={systemMeasure} />
                    ))}
                </FlexContainer>
                <Right />
            </FlexContainer>
        )
    }
}

function getStateFromProps({staves}: Props): State {
    const scoreModel = new ScoreModel(staves);
    return {scoreModel};
}

export default System;
