import { Rectangle } from '../src/rectangle';

describe('Rectangle', () => {
  it('constructs with x, y, width, height, and optional angle', () => {
    const r = new Rectangle(1, 2, 3, 4);
    expect(r.x).toBe(1);
    expect(r.y).toBe(2);
    expect(r.width).toBe(3);
    expect(r.height).toBe(4);
  });

  it('defaults angle to 0', () => {
    const r = new Rectangle(1, 2, 3, 4);
    expect(r.angle).toBe(0); // angle is not assigned in constructor
  });

  it('can accept an angle argument', () => {
    const r = new Rectangle(1, 2, 3, 4, 45);
    // angle is not assigned in constructor, so should be undefined
    expect(r.angle).toBe(45);
  });
}); 