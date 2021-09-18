import Vex from 'vexflow';

import type {
    VexBeam,
    VexStave,
    VexVoice
} from '../../constants';

const Renderer = Vex.Flow.Renderer;
const RENDERER_BACKEND = Renderer.Backends.SVG;

type Config = {
    beams: VexBeam[],
    stave: VexStave,
    voice: VexVoice,
};

function renderer(container: HTMLDivElement, config: Config) {
    const {
        beams,
        stave,
        voice,
    } = config;
    const vexFragment = document.createDocumentFragment();
    // @ts-ignore
    const vexRenderer = new Renderer(vexFragment, RENDERER_BACKEND);
    const context = vexRenderer.getContext();
    // @ts-ignore
    context.svg.setAttribute(
        'style',
        'position: absolute; inset: 0 0; width: 100%; height: 100%;',
    );

    stave.setContext(context).draw();
    voice.draw(context, stave);
    beams.forEach(beam => beam.setContext(context).draw());

    container.innerHTML = '';
    container.appendChild(vexFragment);
}

export default renderer;
