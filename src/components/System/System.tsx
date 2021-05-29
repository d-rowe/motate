import React, {PureComponent} from 'react';
import Left from './Left';
import Right from './Right';
import Stave from '../Stave';

import type {Stave as StaveType} from '../../constants';

export type Props = {
    staves: StaveType[],
};

class System extends PureComponent<Props> {
    render() {
        const {
            staves,
        } = this.props;
        return (
            <div style={{display: 'flex'}}>
                <Left staves={staves} />
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
                        />
                    ))}
                </div>
                <Right />
            </div>
        )
    }
}

export default System;
