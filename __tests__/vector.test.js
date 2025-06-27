import { Vector } from '../src/vector';

describe('Vector', () => {
  it('constructs with x and y', () => {
    const v = new Vector(1, 2);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  it('adds another vector', () => {
    const v = new Vector(1, 2);
    v.add(new Vector(3, 4));
    expect(v.x).toBe(4);
    expect(v.y).toBe(6);
  });

  it('adds a scalar', () => {
    const v = new Vector(1, 2);
    v.add(2);
    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  it('subtracts another vector', () => {
    const v = new Vector(5, 7);
    v.subtract(new Vector(2, 3));
    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  it('subtracts a scalar', () => {
    const v = new Vector(5, 7);
    v.subtract(2);
    expect(v.x).toBe(3);
    expect(v.y).toBe(5);
  });

  it('multiplies by another vector', () => {
    const v = new Vector(2, 3);
    v.multiply(new Vector(4, 5));
    expect(v.x).toBe(8);
    expect(v.y).toBe(15);
  });

  it('multiplies by a scalar', () => {
    const v = new Vector(2, 3);
    v.multiply(2);
    expect(v.x).toBe(4);
    expect(v.y).toBe(6);
  });

  it('divides by another vector', () => {
    const v = new Vector(8, 9);
    v.divide(new Vector(2, 3));
    expect(v.x).toBe(4);
    expect(v.y).toBe(3);
  });

  it('divides by a scalar', () => {
    const v = new Vector(8, 9);
    v.divide(2);
    expect(v.x).toBe(4);
    expect(v.y).toBe(4.5);
  });

  it('diff returns the difference vector', () => {
    const v1 = new Vector(5, 5);
    const v2 = new Vector(2, 3);
    const diff = v1.diff(v2);
    expect(diff.x).toBe(3);
    expect(diff.y).toBe(2);
  });

  it('distanceFrom returns the correct distance', () => {
    const v1 = new Vector(0, 0);
    const v2 = new Vector(3, 4);
    expect(v1.distanceFrom(v2)).toBe(5);
  });

  it('angleToVector returns the correct angle', () => {
    const v1 = new Vector(0, 0);
    const v2 = new Vector(0, 1);
    expect(Math.round(v1.angleToVector(v2))).toBe(90);
  });
}); 