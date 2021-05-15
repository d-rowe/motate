import React, {PureComponent} from 'react';
import Left from './Left';
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
            selectedMeasure
        } = this.props;
        return (
            <div style={{display: 'flex'}}>
                <Left staves={staves} />
                <div>
                    {staves.map(({name, clef}, i) => (
                        <Stave
                            name={name}
                            measures={measures}
                            clef={clef}
                            selectedMeasure={selectedMeasure}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default System;
