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

class Measure extends PureComponent<Props> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;

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
        const {width = 200} = this.props
        return <div
            ref={this.ref}
            style={{
                width: `${width}px`,
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
