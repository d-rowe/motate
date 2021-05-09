import React, {PureComponent, ReactChild} from 'react';
import Renderer from './renderer';

const DEFAULT_CLEF_TYPE = 'treble';

export type Props = {
    clefType?: string;
    showClef?: boolean;
    height: number,
    width: number,
    isSelected?: boolean;
    hasBegBarline?: boolean;
}

class Measure extends PureComponent<Props> {
    private ref = React.createRef<HTMLDivElement>();
    private container?: HTMLDivElement | null;
    private renderer?: Renderer;

    componentDidMount(): void {
        this.container = this.ref.current;
        if (!this.container) {
            return;
        }
        const {
            clefType,
            showClef,
            isSelected,
            width,
            hasBegBarline = true,
        } = this.props;
        this.renderer = new Renderer(this.container, {
            width,
            clefType: clefType || DEFAULT_CLEF_TYPE,
            isSelected,
            showClef,
            hasBegBarline,
        });
        this.renderNotation();
    }

    componentDidUpdate(): void {
        if (!this.renderer) {
            throw new Error('Cannot render notation before renderer has been initilized');
        }
        const {
            clefType,
            isSelected,
            showClef,
            width,
            hasBegBarline = true,
        } = this.props;
        // TODO: just update whole config object at once
        this.renderer.setClefType(clefType || DEFAULT_CLEF_TYPE);
        if (width !== undefined) {
            this.renderer.setWidth(width);
        }
        this.renderer.setIsSelected(!!isSelected);
        this.renderer.setShowClef(!!showClef);
        this.renderer.setHasBegBarline(hasBegBarline);
        
        this.renderNotation();
    }

    componentWillUnmount(): void {
        this.renderer?.dispose();
    }

    render(): ReactChild {
        const {width, height} = this.props;
        return <div
            ref={this.ref}
            style={{width, height}}
        />;
    }

    renderNotation(): void {
        this.renderer?.render();
    }

    private setClefType(clefType: string = DEFAULT_CLEF_TYPE) {
        this.renderer?.setClefType(clefType);
    }
}

export default Measure;
