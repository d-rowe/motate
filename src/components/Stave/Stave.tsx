import React, {PureComponent} from 'react';
import Measure from '../Measure';

import type {Note} from '../../constants';

export type Props = {
    name?: string,
    clef?: string,
    measures: number,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    measureNotes?: Array<Note[]>,
};

class Stave extends PureComponent<Props> {
    render() {
        const {
            name,
            clef,
            measures,
            hasBegBarline = true,
            hasEndBarline = true,
            measureNotes = [],
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
                    hasEndBarline={!(!hasEndBarline && i === measures - 1)}
                    clefType={clef}
                    key={i}
                    notes={measureNotes[i]}
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
