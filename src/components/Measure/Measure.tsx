import React, {PureComponent, ReactChild} from 'react';
import constructVexModel from './constructVexModel';
import renderer from './renderer';

import type {Note} from '../../constants';

export type Props = {
    clefType?: string;
    showClef?: boolean;
    timeSignature?: string;
    showTimeSignature?: boolean;
    width: number,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    notes?: Note[],
}

type State = {
    stave?: Vex.Flow.Stave,
    voice?: Vex.Flow.Voice,
    minWidth?: number,
};

class Measure extends PureComponent<Props, State> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;
    state: State = {};

    componentDidMount() {
        this.container = this.ref.current;
        if (!this.container) {
            return;
        }

        this.renderNotation();
    }

    componentDidUpdate() {
        this.renderNotation();
    }

    render(): ReactChild {
        const {minWidth} = this.state;
        return <div
            ref={this.ref}
            style={{
                width: `${minWidth}px`,
                height: '125px',
            }}
        />;
    }

    static getDerivedStateFromProps(props: Props) {
        const {
            voice,
            stave,
            minWidth,
        } = constructVexModel(props);
        return {
            voice,
            stave,
            minWidth,
        };  
    }

    renderNotation() {
        if (!this.container) {
            throw new Error('Cannot render notation before container is initialized');
        }
        const {stave, voice} = this.state;
        if (!stave || !voice) {
            return;
        }
        renderer(this.container, {stave, voice});
    }
}

export default Measure;
