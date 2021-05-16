import React, {PureComponent} from 'react';
import Left from './Left';
import Right from './Right';
import Stave from '../Stave';

import type {StaveOptions} from './constants';

export type Props = {
    measures: number,
    staves: StaveOptions[],
    selectedMeasure: number,
};

class System extends PureComponent<Props> {
    render() {
        const {
            staves,
            measures,
        } = this.props;
        return (
            <div style={{display: 'flex'}}>
                <Left staves={staves} />
                <div>
                    {staves.map(({name, clef, measureNotes}, i) => (
                        <Stave
                            name={name}
                            measures={measures}
                            clef={clef}
                            hasBegBarline={false}
                            hasEndBarline={false}
                            key={i}
                            measureNotes={measureNotes}
                        />
                    ))}
                </div>
                <Right />
            </div>
        )
    }
}

export default System;
