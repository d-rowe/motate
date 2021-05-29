import React, {PureComponent, ReactChild} from 'react';
import MeasureModel from './MeasureModel';
import renderer from './renderer';

import type {
    Measure as MeasureType,
    VexBeam,
    VexStave,
    VexVoice
} from '../../constants';

export type Props = MeasureType;

type State = {
    beams?: VexBeam[],
    stave?: VexStave,
    voice?: VexVoice,
    width?: number,
};

class Measure extends PureComponent<Props, State> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;
    static defaultProps = {
        hasBegBarline: true,
        hasEndBarline: true,
        showClef: true,
    };

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

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
        const {width} = this.state;
        return <div
            ref={this.ref}
            style={{
                width: `${width}px`,
                height: '125px',
                position: 'relative',
            }}
        />;
    }

    static getDerivedStateFromProps(props: Props): State {
        const {
            beams,
            voice,
            stave,
            width
        } = new MeasureModel(props);
        return {
            beams,
            voice,
            stave,
            width
        };  
    }

    renderNotation() {
        if (!this.container) {
            throw new Error('Cannot render notation before container is initialized');
        }

        const {beams = [], stave, voice} = this.state;
        if (!stave || !voice) {
            return;
        }

        renderer(this.container, {beams, stave, voice});
    }
}

export default Measure;
