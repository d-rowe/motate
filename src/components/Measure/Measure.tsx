import React, {PureComponent, ReactChild} from 'react';
import renderer from './renderer';

const DEFAULT_CLEF_TYPE = 'treble';

export type Props = {
    clefType?: string;
    showClef?: boolean;
    timeSignature?: string;
    showTimeSignature?: boolean;
    height: number,
    width: number,
    isSelected?: boolean;
    hasBegBarline?: boolean;
}

class Measure extends PureComponent<Props> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;

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
        const {width, height} = this.props;
        return <div
            ref={this.ref}
            style={{width, height}}
        />;
    }

    renderNotation() {
        if (!this.container) {
            return;
        }

        const {
            clefType,
            showClef,
            timeSignature,
            showTimeSignature,
            isSelected,
            width,
            hasBegBarline = true,
        } = this.props;

        renderer(this.container, {
            clefType: clefType || DEFAULT_CLEF_TYPE,
            showClef,
            timeSignature,
            showTimeSignature,
            isSelected,
            width,
            hasBegBarline,
        });
    }
}

export default Measure;
