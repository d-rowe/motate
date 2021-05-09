import React, {PureComponent} from 'react';
import Measure from '../Measure';

export type Props = {
    measures: number,
    clef: string,
    selectedMeasure: number,
};

class Stave extends PureComponent<Props> {
    render() {
        const {clef, measures, selectedMeasure} = this.props;
        const m = [];
        for (let i = 0; i < measures; i++) {
            m.push(
                <Measure
                    showClef={i === 0}
                    height={125}
                    width={200}
                    hasBegBarline={i === 0}
                    clefType={clef}
                    isSelected={i === selectedMeasure}
                />
            )
        }
        return (
            <div style={{display: 'flex'}}>
                {m}
            </div>
        );
    }
}

export default Stave;
