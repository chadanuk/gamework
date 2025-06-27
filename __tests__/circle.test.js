import { Circle } from '../src/circle';

describe('Circle', () => {
  it('constructs with x, y, and radius', () => {
    const c = new Circle(1, 2, 3);
    expect(c.x).toBe(1);
    expect(c.y).toBe(2);
    expect(c.radius).toBe(3);
  });
}); 