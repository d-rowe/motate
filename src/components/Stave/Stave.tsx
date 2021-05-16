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
    static defaultProps = {
        hasBegBarline: true,
        hasEndBarline: true,
    };

    render() {
        const {
            name,
            clef,
            measures,
            hasBegBarline,
            hasEndBarline,
            measureNotes = [],
        } = this.props;
        // TODO: measures should be array of Objects
        // this is just for initial PoC
        const m = [];
        for (let i = 0; i < measures; i++) {
            const isFirstMeasure = i === 0;
            const isLastMeasure = i === measures - 1;
            m.push(
                <Measure
                    showClef={isFirstMeasure}
                    showTimeSignature={isFirstMeasure}
                    width={200}
                    hasBegBarline={isFirstMeasure && hasBegBarline}
                    hasEndBarline={!(isLastMeasure && !hasEndBarline)}
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
