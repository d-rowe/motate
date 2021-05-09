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
    setX(x: NumberOrString) {this.x = x;}
    setY(y: NumberOrString) {this.y = y;}
    setWidth(width: NumberOrString) {this.width = width;}
    setHeight(height: NumberOrString) {this.height = height;}
    getX(): NumberOrString {return this.x;}
    getY(): NumberOrString {return this.y;}
    getWidth(): NumberOrString {return this.width;}
    getHeight(): NumberOrString {return this.height;}
}

export default Box;
