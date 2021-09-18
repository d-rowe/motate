import React, {PureComponent} from 'react';
import styled from '@emotion/styled';
import renderer from './renderer';

import type BaseFormatter from '../../formatters/BaseFormatter';
import type {
    ChordConfig,
    VexBeam,
    VexStave,
    VexVoice
} from '../../constants';

const MeasureContainer = styled.div`
    position: relative;
    height: 125px;
    width: 100%;
`;

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
    beams: VexBeam[],
    stave?: VexStave,
    voice?: VexVoice,
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

    render() {
        return <MeasureContainer ref={this.ref} />;
    }

    renderNotation() {
        if (!this.container) {
            throw new Error('Cannot render notation before container is initialized');
        }

        const {
            beams = [],
            stave,
            voice
        } = this.props;
        if (!stave || !voice) {
            return;
        }

        renderer(this.container, {beams, stave, voice});
    }
}

export default Measure;
