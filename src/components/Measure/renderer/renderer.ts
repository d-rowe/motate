import Vex, {IRenderContext} from 'vexflow';
import SelectionBox from './selectionBox';

const RENDERER_BACKEND = Vex.Flow.Renderer.Backends.SVG;

type Config = {
    isSelected?: boolean,
    width?: number,
    clefType?: string,
    showClef?: boolean;
    timeSignature?: string;
    showTimeSignature?: boolean;
    hasBegBarline?: boolean;
};

function renderer(container: HTMLDivElement, config: Config) {
    let stave: Vex.Flow.Stave;
    let staveContext: IRenderContext;

    render();

    function render() {
        const {
            clefType,
            showClef,
            timeSignature,
            showTimeSignature,
            hasBegBarline,
            width = 0,
        } = config;
        dispose();
        const vexContainer = document.createDocumentFragment();
        const vexRenderer = new Vex.Flow.Renderer(container, RENDERER_BACKEND);
        staveContext = vexRenderer.getContext();
        stave = new Vex.Flow.Stave(0, 2.5, width - 1);
        if (showClef && clefType) {
            renderClef(clefType);
        }
        if (showTimeSignature && timeSignature) {
            renderTimeSignature(timeSignature);
        }
        if (!hasBegBarline) {
            stave.setBegBarType(Vex.Flow.Barline.type.NONE);
        }
        stave.setContext(staveContext);
        stave.draw();
        renderSelectionBox();
        formatSvg();
        container.appendChild(vexContainer);
    }

    function renderClef(clefType: string) {
        try {
            stave?.addClef(clefType);
        } catch {
            console.warn('Unsupported clef type:', clefType);
        }  
    }

    function renderTimeSignature(timeSignature: string) {
        try {
            stave?.addTimeSignature(timeSignature);
        } catch {
            console.warn('Unsupported time signature:', timeSignature)
        }
    }

    function renderSelectionBox() {
        if (!stave) {
            return;
        }
        const paddingLeft = 5;
        const paddingRight = 10;
        const startX = stave.getNoteStartX() + paddingLeft;
        const selectionWidth = stave.getWidth() - startX - paddingRight;
        if (config.isSelected) {
            new SelectionBox({
                // @ts-ignore
                svg: staveContext.svg,
                x: startX,
                y: 0,
                width: selectionWidth,
                height: '100%',
            });
        }
    }

    function formatSvg() {
        // @ts-ignore
        const {svg} = staveContext || {};
        if (!svg) {
            throw new Error('Cannot format SVG before it has been constructed');
        }
        svg.setAttribute('style', 'width: 100%; height: 100%');
    }

    function dispose() {
        container.innerHTML = '';
    }
}

export default renderer;
