import Vex from 'vexflow';

type Config = {
    stave: Vex.Flow.Stave,
    voice: Vex.Flow.Voice,
};

function renderer(container: HTMLDivElement, config: Config) {
    container.innerHTML = '';
    const {
        stave,
        voice,
    } = config;
    const renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
    const context = renderer.getContext();

    stave.setContext(context).draw();
    voice.draw(context, stave);
}

export default renderer;
