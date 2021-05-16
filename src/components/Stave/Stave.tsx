import React, {PureComponent} from 'react';
import {CLEFS} from '../../constants';
import Measure from '../Measure';

const DEFAULT_CLEF = CLEFS.TREBLE;

export type Props = {
    name?: string,
    clef?: string,
    measures: number,
    hasBegBarline?: boolean,
};

class Stave extends PureComponent<Props> {
    render() {
        const {
            name,
            clef,
            measures,
            hasBegBarline = true,
        } = this.props;
        // TODO: measures should be array of Objects
        // this is just for initial PoC
        const m = [];
        for (let i = 0; i < measures; i++) {
            m.push(
                <Measure
                    showClef={i === 0}
                    width={200}
                    hasBegBarline={hasBegBarline}
                    clefType={clef  || DEFAULT_CLEF}
                    key={i}
                />
            )
        }
        return (
            <div
                aria-label={`${name} stave`}
                style={{display: 'flex'}}
            >
                {m}
            </div>
        );
    }
}

export default Stave;
