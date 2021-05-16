import React, {PureComponent, ReactChild} from 'react';
import MeasureModel from './MeasureModel';
import renderer from './renderer';

import type {Note, Stave, Voice} from '../../constants';

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
    stave?: Stave,
    voice?: Voice,
    minWidth?: number,
};

class Measure extends PureComponent<Props, State> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;
    state: State = {};
    static defaultProps = {
        hasBegBarline: true,
        hasEndBarline: true,
        showClef: true,
    };

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
        const measureModel = new MeasureModel(props);
        return {
            voice: measureModel.getVoice(),
            stave: measureModel.getStave(),
            minWidth: measureModel.getMinWidth(),
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
