import React, {PureComponent} from 'react';
import Left from './Left';
import Measure from '../Measure';
import BaseFormatter from '../../formatters/BaseFormatter';
import {Measure as MeasureType} from '../../constants';
import StaveFormatter from '../../formatters/StaveFormatter';

export type Props = {
    name?: string,
    clef?: string,
    width?: number,
    showName?: boolean,
    showClef?: boolean,
    showTimeSignature?: boolean,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    measures?: MeasureType[],
    staveIndex?: number,
    formatter?: BaseFormatter,
};

class Stave extends PureComponent<Props> {
    static defaultProps = {
        showClef: true,
        showName: true,
        showTimeSignature: true,
        hasBegBarline: true,
        hasEndBarline: true,
    };

    render() {
        const {
            name,
            clef,
            width,
            measures = [],
            showName,
            showClef,
            showTimeSignature,
            hasBegBarline,
            hasEndBarline,
            staveIndex,
            formatter = new StaveFormatter({width}),
        } = this.props;
        return (
            <div
                aria-label='stave'
                style={{display: 'flex'}}
            >
                {name && showName && <Left name={name} />}
                {measures.map((measure, i) => (
                    <Measure
                        {...measure}
                        key={i}
                        showClef={measure.showClef || (i === 0 && showClef)}
                        showTimeSignature={measure.showTimeSignature || (i === 0 && showTimeSignature)}
                        hasBegBarline={measure.hasBegBarline || (i === 0 && hasBegBarline)}
                        hasEndBarline={measure.hasEndBarline || !(i === measures.length -1 && !hasEndBarline)}
                        clef={measure.clef || clef}
                        measureIndex={i}
                        staveIndex={staveIndex}
                        formatter={formatter}
                    />
                ))}
            </div>
        );
    }
}

export default Stave;
