import Vex from 'vexflow';

import type {VexStave, VexVoice} from '../../constants';

const Renderer = Vex.Flow.Renderer;
const RENDERER_BACKEND = Renderer.Backends.SVG;

type Config = {
    stave: VexStave,
    voice: VexVoice,
};

function renderer(container: HTMLDivElement, config: Config) {
    const vexFragment = document.createDocumentFragment();
    const {
        stave,
        voice,
    } = config;
    // @ts-ignore
    const vexRenderer = new Renderer(vexFragment, RENDERER_BACKEND);
    const context = vexRenderer.getContext();

    stave.setContext(context).draw();
    voice.draw(context, stave);

    container.innerHTML = '';
    container.appendChild(vexFragment);
}

export default renderer;
