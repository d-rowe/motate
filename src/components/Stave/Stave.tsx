import React, {PureComponent} from 'react';
import Measure from '../Measure';
import {Measure as MeasureType} from '../../constants';

export type Props = {
    name?: string,
    clef?: string,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    measures?: MeasureType[],
    staveIndex?: number,
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
            measures = [],
            hasBegBarline,
            hasEndBarline,
            staveIndex,
        } = this.props;
        return (
            <div
                aria-label={`${name} stave`}
                style={{display: 'flex'}}
            >
                {measures.map((measure, i) => (
                    <Measure
                        {...measure}
                        key={i}
                        showClef={measure.showClef || i === 0}
                        showTimeSignature={measure.showTimeSignature || i === 0}
                        hasBegBarline={measure.hasBegBarline || (i === 0 && hasBegBarline)}
                        hasEndBarline={measure.hasEndBarline || !(i === measures.length -1 && !hasEndBarline)}
                        clef={measure.clef || clef}
                        measureIndex={i}
                        staveIndex={staveIndex}
                    />
                ))}
            </div>
        );
    }
}

export default Stave;
