import React, {PureComponent} from 'react';
import styled from '@emotion/styled-base';
import debounce from 'lodash.debounce';
import createScore from '../lib/createScore';
import {VerticalContainer} from './base';
import System from './System';

import type {StaveConfig as StaveType} from '../constants';
import type {Score as ScoreType} from '../lib/constants';

const ScoreContainer = styled(VerticalContainer)`
    width: 100%;
`;

const RESIZE_DEBOUNCE = 50;

export type Props = {
    staves: StaveType[],
    showInstrumentLabels: boolean,
};

type State = {
    score: ScoreType,
    width: number,
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

    setWidth(width: number) {
        if (width === this.state.width) {
            return;
        }

        this.setState({
            width: width,
            score: createScore(this.props.staves, width - 100),
        });
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

    private getInitialState(): State {
        return {
            score: [],
            width: 0,
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
                    />
                ))}
            </ScoreContainer>
        );
    }
}

export default React.memo(Score);
