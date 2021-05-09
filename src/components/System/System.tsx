import React, {PureComponent} from 'react';
import Stave from '../Stave';

export type Props = {
    measures: 4,
    clefs: string[],
    selectedMeasure: number,
};

class System extends PureComponent<Props> {
    render() {
        const {clefs, measures, selectedMeasure} = this.props;
        return (
            <div>
                {clefs.map(clef => (
                    <Stave measures={measures} clef={clef} selectedMeasure={selectedMeasure} />
                ))}
            </div>
        )
    }
}

export default System;
