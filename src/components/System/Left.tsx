import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import {VerticalContainer} from '../base';

import type {StaveConfig} from '../../constants';


const LeftContainer = styled(VerticalContainer)`
    justify-items: stretch;
    justify-content: space-between;
    padding: 0 12px 0 0;
    margin: 42px 0;
    text-align: right;
    border-right: 3px solid black;
`;

const InstrumentLabel = styled.p`
    margin: 10px 0 12px;
    white-space: nowrap;
`;

type Props = {
    staves: StaveConfig[],
    showInstrumentLabels: boolean,
    onInstrumentLabelResize: (width: number) => void,
};

class Left extends PureComponent<Props> {
    private resizeObserver: ResizeObserver;
    private containerRef = React.createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.resizeObserverCallback = this.resizeObserverCallback.bind(this);
        this.resizeObserver = new ResizeObserver(this.resizeObserverCallback);
    }

    componentDidMount() {
        const container = this.containerRef.current;
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

    private resizeObserverCallback(entries: ResizeObserverEntry[]): void {
        const {onInstrumentLabelResize} = this.props;
        entries.forEach(({contentRect}) => {
            onInstrumentLabelResize(contentRect.width);
        });
    }

    render() {
        const {
            staves,
            showInstrumentLabels,
        } = this.props;

        return (
            <LeftContainer ref={this.containerRef}>
                {showInstrumentLabels && staves.map(({name}, i) => (
                    <InstrumentLabel key={i}>
                        {name}
                    </InstrumentLabel>
                ))}
            </LeftContainer>
        );
    }
}

export default React.memo(Left);
