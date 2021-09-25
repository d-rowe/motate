import React, {PureComponent} from 'react';
import styled from '@emotion/styled-base';
import debounce from 'lodash.debounce';
import createScore from '../lib/createScore';
import {VerticalContainer} from './base';
import System from './System';

import type {StaveConfig as StaveType} from '../constants';
import type {Score as ScoreType} from '../lib/constants';

const RIGHT_PADDING = 16;
const RESIZE_DEBOUNCE = 50;

const ScoreContainer = styled(VerticalContainer)`
    width: 100%;
`;

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};

type State = {
    score: ScoreType,
    width: number,
    instrumentLabelWidth: number,
};

class Score extends PureComponent<Props, State> {
    private resizeObserver: ResizeObserver;
    private containerRef = React.createRef<HTMLDivElement>();

    static defaultProps = {
        showInstrumentLabels: true,
    }

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState();
        this.onInstrumentLabelResize = debounce(this.onInstrumentLabelResize, RESIZE_DEBOUNCE).bind(this);
        this.resizeObserverCallback = debounce(
                this.resizeObserverCallback,
                RESIZE_DEBOUNCE
        ).bind(this);
        this.resizeObserver = new ResizeObserver(this.resizeObserverCallback);
    }

    // Update width on container resize
    private resizeObserverCallback(entries: ResizeObserverEntry[]): void {
        entries.forEach(({contentRect}) => {
            this.setWidth(contentRect.width);
        });
    }

    private setWidth(width: number) {
        if (width === this.state.width) {
            return;
        }

        this.setState({
            width,
            score: createScore(
                this.props.staves,
                this.getScoreWidth(width, this.state.instrumentLabelWidth),
            ),
        });
    }

    private onInstrumentLabelResize(instrumentLabelWidth: number): void {
        this.setState({
            instrumentLabelWidth,
            score: createScore(
                this.props.staves,
                this.getScoreWidth(this.state.width, instrumentLabelWidth),
            ),
        });
    }

    private getScoreWidth(width: number, instrumentLabelWidth: number): number {
        return width - instrumentLabelWidth - RIGHT_PADDING;
    }

    componentDidMount() {
        const container = this.containerRef.current;
        const clientRect = container?.getBoundingClientRect();
        if (!clientRect) {
            return;
        }

        this.setWidth(clientRect.width);

        if (container) {
            this.resizeObserver.observe(container);
        }
    }

    componentWillUnmount() {
        const container = this.containerRef.current;
        if (container) {
            this.resizeObserver.unobserve(container);
        }
    }

    private getInitialState(): State {
        return {
            score: [],
            width: 0,
            instrumentLabelWidth: 0,
        };
    }

    render() {
        const {staves, showInstrumentLabels} = this.props;
        const {score} = this.state;
        return (
            <ScoreContainer ref={this.containerRef}>
                {score.map((system, i) => (
                    <System
                        key={i}
                        system={system}
                        staves={staves}
                        showInstrumentLabels={showInstrumentLabels}
                        onInstrumentLabelResize={this.onInstrumentLabelResize}
                    />
                ))}
            </ScoreContainer>
        );
    }
}

export default React.memo(Score);
