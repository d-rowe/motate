type NumberOrString = number | string;

export type BBox = {
    x?: NumberOrString;
    y?: NumberOrString;
    width?: NumberOrString;
    height?: NumberOrString;
};

class Box {
    x: NumberOrString;
    y: NumberOrString;
    width: NumberOrString;
    height: NumberOrString;
    constructor(options: BBox) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }
    setX(x: number) {this.x = x;}
    setY(y: number) {this.y = y;}
    setWidth(width: number) {this.width = width;}
    setHeight(height: number) {this.height = height;}
    getX(): NumberOrString {return this.x;}
    getY(): NumberOrString {return this.y;}
    getWidth(): NumberOrString {return this.width;}
    getHeight(): NumberOrString {return this.height;}
}

export default Box;
