import React, {PureComponent} from 'react';
import styled from '@emotion/styled';
import renderer from './renderer';

import type MeasureModel from '../../lib/MeasureModel';

const MeasureContainer = styled.div`
    position: relative;
    height: 125px;
    width: 100%;
`;

export type Props = {
    measure: MeasureModel,
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
        } = this.props.measure;
        if (!stave || !voice) {
            return;
        }

        renderer(this.container, {beams, stave, voice});
    }
}

export default Measure;
