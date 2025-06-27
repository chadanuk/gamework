import { CircleGameObject } from '../src/circleGameObject';
import { Rectangle } from '../src/rectangle';

describe('CircleGameObject', () => {
  it('constructs with expected properties', () => {
    const circle = { x: 10, y: 20, radius: 5 };
    const cg = new CircleGameObject(null, 'circle', circle, { x: 0, y: 0 });
    expect(cg.circle).toBe(circle);
    expect(cg.shape).toBe(circle);
    expect(cg.rectangle).toBeInstanceOf(Rectangle);
  });

  it('setPosition updates all relevant properties', () => {
    const circle = { x: 10, y: 20, radius: 5 };
    const cg = new CircleGameObject(null, 'circle', circle, { x: 0, y: 0 });
    cg.setPosition({ x: 30, y: 40 });
    expect(cg.rectangle.x).toBe(25);
    expect(cg.rectangle.y).toBe(35);
    expect(cg.shape.x).toBe(30);
    expect(cg.shape.y).toBe(40);
    expect(cg.circle.x).toBe(30);
    expect(cg.circle.y).toBe(40);
  });

  it('detectCollisionsWithRectangle does not add collision if ignoreCollisions is true', () => {
    const circle = { x: 10, y: 20, radius: 5 };
    const cg = new CircleGameObject(null, 'circle', circle, { x: 0, y: 0 });
    const rectObj = { rectangle: { x: 0, y: 0, width: 10, height: 10 }, ignoreCollisions: true };
    cg.currentCollisions = [];
    cg.detectCollisionsWithRectangle(rectObj);
    expect(cg.currentCollisions.length).toBe(0);
  });
}); 