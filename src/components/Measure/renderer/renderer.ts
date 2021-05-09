import Vex, { IRenderContext } from 'vexflow';
import SelectionBox from './selectionBox';

const RENDERER_BACKEND = Vex.Flow.Renderer.Backends.SVG;

type Config = {
    isSelected?: boolean,
    width?: number,
    clefType?: string,
    showClef?: boolean;
};

class Renderer {
    private container: HTMLDivElement;
    private config: Config;
    private context?: IRenderContext;
    private stave?: Vex.Flow.Stave;
    private vexRenderer?: Vex.Flow.Renderer;
    
    constructor(container: HTMLDivElement, config: Config) {
        this.container = container;
        this.config = config;
    }

    setWidth(width: number) {
        this.config.width = width;
    }

    setIsSelected(isSelected: boolean) {
        this.config.isSelected = isSelected;
    }

    setClefType(clefType: string) {
        this.config.clefType = clefType;
    }

    setShowClef(showClef: boolean) {
        this.config.showClef = showClef;
    }

    private formatSvg(): void {
        // @ts-ignore
        const {svg} = this.context || {};
        if (!svg) {
            throw new Error('Cannot format SVG before it has been constructed');
        }
        const {width} = this.config;
        svg.setAttribute('viewBox', `0 0 ${width} 125`);
        svg.setAttribute('style', 'width: 100%; height: 100%');
    }

    render(): void {
        this.dispose();
        const vexContainer = document.createDocumentFragment();
        this.vexRenderer = new Vex.Flow.Renderer(this.container, RENDERER_BACKEND);
        this.context = this.vexRenderer.getContext();
        this.stave = new Vex.Flow.Stave(0, 0, (this.config.width|| 0) - 1);
        if (this.config.showClef) {
            try {
                this.stave.addClef(this.config.clefType || '');
            } catch {
                console.warn('Unsupported clef type:', this.config.clefType);
            }
        }
        this.stave.setContext(this.context);
        this.stave.draw();
        this.renderSelectionBox();
        this.formatSvg();
        this.container.appendChild(vexContainer);
    }

    renderSelectionBox() {
        if (!this.stave) {
            return;
        }
        const paddingLeft = 5;
        const paddingRight = 10;
        const startX = this.stave.getNoteStartX() + paddingLeft;
        const selectionWidth = this.stave.getWidth() - startX - paddingRight;
        if (this.config.isSelected) {
            new SelectionBox({
                // @ts-ignore
                svg: this.context.svg,
                x: startX,
                y: 0,
                width: selectionWidth,
                height: '100%',
            });
        }
    }

    dispose(): void {
        this.container.innerHTML = '';
    }
}

export default Renderer;
