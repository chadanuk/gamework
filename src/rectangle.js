/**
 * Rectangle class for representing rectangles.
 */
export class Rectangle {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} [angle=0]
     */
    constructor(x, y, width, height, angle = 0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}