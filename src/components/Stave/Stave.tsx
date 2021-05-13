import React, {PureComponent} from 'react';
import {CLEFS} from '../../constants';
import Measure from '../Measure';

const DEFAULT_CLEF = CLEFS.TREBLE;

export type Props = {
    measures: number,
    clef: string,
    selectedMeasure: number,
};

class Stave extends PureComponent<Props> {
    render() {
        const {clef, measures, selectedMeasure} = this.props;
        // TODO: measures should be array of Objects
        // this is just for initial PoC
        const m = [];
        for (let i = 0; i < measures; i++) {
            m.push(
                <Measure
                    showClef={i === 0}
                    height={125}
                    width={200}
                    hasBegBarline={false}
                    clefType={clef  || DEFAULT_CLEF}
                    isSelected={i === selectedMeasure}
                    key={i}
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
