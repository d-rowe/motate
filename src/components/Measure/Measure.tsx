import React, {PureComponent, ReactChild} from 'react';
import renderer from './renderer';

import type BaseFormatter from '../../formatters/BaseFormatter';
import type {
    ChordConfig,
    VexBeam,
    VexStave,
    VexVoice
} from '../../constants';

export type Props = {
    clef?: string,
    showClef?: boolean,
    timeSignature?: string,
    showTimeSignature?: boolean,
    width?: number,
    hasBegBarline?: boolean,
    hasEndBarline?: boolean,
    chordConfigs?: ChordConfig[],
    measureIndex?: number,
    staveIndex?: number,
    formatter?: BaseFormatter,
};

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
        return <div
            ref={this.ref}
            style={{
                width: '200px',
                height: '125px',
                position: 'relative',
            }}
        />;
    }

    renderNotation() {
        if (!this.container) {
            throw new Error('Cannot render notation before container is initialized');
        }

        const {beams = [], stave, voice} = this.props;
        if (!stave || !voice) {
            return;
        }

        renderer(this.container, {beams, stave, voice});
    }
}

export default Measure;
