import Vex from 'vexflow';

import type {Stave, Voice} from '../../constants';

const Renderer = Vex.Flow.Renderer;
const DEFAULT_RENDERER_BACKEND = Renderer.Backends.SVG;

type Config = {
    stave: Stave,
    voice: Voice,
};

function renderer(container: HTMLDivElement, config: Config) {
    const vexFragment = document.createDocumentFragment();
    const {
        stave,
        voice,
    } = config;
    // @ts-ignore
    const vexRenderer = new Renderer(vexFragment, DEFAULT_RENDERER_BACKEND);
    const context = vexRenderer.getContext();

    stave.setContext(context).draw();
    voice.draw(context, stave);

    container.innerHTML = '';
    container.appendChild(vexFragment);
}

export default renderer;
