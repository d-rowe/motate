import Box, {BBox} from './box';

const DEFAULT_BACKGROUND_COLOR = '#e9edc9';
const DEFAULT_BORDER_COLOR = '#ccd5ae';
const SVG_NS = 'http://www.w3.org/2000/svg';;

type Options = {
    svg: SVGElement,
    isHidden?: boolean;
    backgroundColor?: string;
    backgroundOpacity?: number;
    borderColor?: string;
    borderOpacity?: number,
} & BBox;

class SelectionBox extends Box {
    svg: SVGElement;
    rect: SVGRectElement;
    isHidden: boolean = false;
    backgroundColor: string = DEFAULT_BACKGROUND_COLOR;
    backgroundOpacity: number = 1;
    borderColor: string = DEFAULT_BORDER_COLOR;
    borderOpacity: number = 1;

    constructor(options: Options) {
        super(options);
        const {x, y, width, height} = options;
        const bbox = {x, y, width, height};
        this.svg = options.svg;
        this.rect = this.createRect();
        this.setBBox(bbox);
        this.setBackgroundColor(options.backgroundColor);
        this.setBackgroundOpacity(options.backgroundOpacity || 1);
        this.setBorderColor(options.borderColor);
        this.setBorderOpacity(options.borderOpacity || 1);
        this.setVisibility(!options.isHidden);
        this.svg.insertBefore(this.rect, this.svg.firstChild);
    }

    private createRect(): SVGRectElement {
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.classList.add('selection-box');
        return rect;
    }

    render() {
        this.dispose();
        this.rect = this.createRect();

    }

    show() {
        this.setVisibility(true);
    }

    hide() {
        this.setVisibility(false);
    }

    setVisibility(isVisibile: boolean = true) {
        this.isHidden = !isVisibile;
        if (this.isHidden) {
            this.rect.setAttribute('fill-opacity', '0');
            this.rect.setAttribute('stroke-opacity', '0');
            return;
        }

        this.rect.setAttribute('fill-opacity', '1');
        // this.rect.setAttribute('stroke-opacity', '1');
        this.rect.setAttribute('stroke-opacity', '0');
    }

    setBackgroundColor(color: string = DEFAULT_BACKGROUND_COLOR) {
        this.backgroundColor = color;
        this.rect.setAttribute('fill', color);
    }

    setBackgroundOpacity(opacity: number) {
        this.backgroundOpacity = opacity;
        if (!this.isHidden) {
            this.rect.setAttribute('fill-opacity', opacity.toString());
        }
    }

    setBorderColor(color: string = DEFAULT_BORDER_COLOR) {
        this.borderColor = color;
        this.rect.setAttribute('stroke', color);
    }

    setBorderOpacity(opacity: number) {
        this.borderOpacity = opacity;
        if (!this.isHidden) {
            this.rect.setAttribute('stroke-opacity', opacity.toString());
        }
    }

    setBBox(bbox: BBox): void {
        Object
            .entries(bbox)
            .forEach(([prop, val]) => {
                if (val !== undefined) {
                    this.rect.setAttribute(prop, `${val}`)
                }
            });
    }

    getBBox(): BBox {
        const {x, y, width, height} = this;
        return {x, y, width, height};
    }

    dispose() {
        this.rect.remove();
    }
}

export default SelectionBox;
