import React, {PureComponent} from 'react';
import ScoreModel from '../../models/ScoreModel';
import Left from './Left';
import Right from './Right';
import Stave from '../Stave';

import type {Stave as StaveType} from '../../constants';

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};

class System extends PureComponent<Props> {
    static defaultProps = {
        showInstrumentLabels: true,
    };

    constructor(props: Props) {
        super(props);
        const model = new ScoreModel(this.props.staves);
        console.log(model.measures);
    }

    render() {
        const {
            staves,
            showInstrumentLabels,
        } = this.props;
        return (
            <div style={{display: 'flex'}}>
                <Left
                    staves={staves}
                    showInstrumentLabels={showInstrumentLabels}
                />
                <div>
                    {staves.map(({name, clef, measures}, i) => (
                        <Stave
                            name={name}
                            measures={measures}
                            clef={clef}
                            hasBegBarline={false}
                            hasEndBarline={false}
                            key={i}
                            staveIndex={i}
                            showName={false}
                        />
                    ))}
                </div>
                <Right />
            </div>
        )
    }
}

export default System;
