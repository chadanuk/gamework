import { Collisions } from '../src/collisions';
import { Collision } from '../src/collision';

describe('Collisions', () => {
  describe('getRotatedCorners', () => {
    it('returns unrotated corners if angle is 0', () => {
      const obj = { rectangle: { x: 10, y: 20, width: 30, height: 40 }, currentAngle: 0 };
      const corners = Collisions.getRotatedCorners(obj);
      expect(corners).toEqual([
        { x: 10, y: 20 },
        { x: 40, y: 20 },
        { x: 40, y: 60 },
        { x: 10, y: 60 }
      ]);
    });
    it('returns rotated corners for 90 degrees', () => {
      const obj = { rectangle: { x: 0, y: 0, width: 10, height: 20 }, currentAngle: 90 };
      const corners = Collisions.getRotatedCorners(obj);
      // The center is (5,10), so corners should be rotated 90 degrees around that
      expect(corners[0].x).toBeCloseTo(15);
      expect(corners[0].y).toBeCloseTo(5);
    });
  });

  describe('polygonsCollideSAT', () => {
    it('returns true for overlapping squares', () => {
      const square1 = [ {x:0,y:0}, {x:2,y:0}, {x:2,y:2}, {x:0,y:2} ];
      const square2 = [ {x:1,y:1}, {x:3,y:1}, {x:3,y:3}, {x:1,y:3} ];
      expect(Collisions.polygonsCollideSAT(square1, square2)).toBe(true);
    });
    it('returns false for non-overlapping squares', () => {
      const square1 = [ {x:0,y:0}, {x:2,y:0}, {x:2,y:2}, {x:0,y:2} ];
      const square2 = [ {x:3,y:3}, {x:5,y:3}, {x:5,y:5}, {x:3,y:5} ];
      expect(Collisions.polygonsCollideSAT(square1, square2)).toBe(false);
    });
  });

  describe('detect', () => {
    function makeObj(x, y, w, h, vx = 0, vy = 0, angle = 0, ignore = false) {
      return {
        rectangle: { x, y, width: w, height: h },
        velocity: { x: vx, y: vy },
        currentAngle: angle,
        ignoreCollisions: ignore,
        getFriction: () => 0
      };
    }
    it('returns empty if ignoreCollisions is true', () => {
      const obj1 = makeObj(0,0,10,10);
      const obj2 = makeObj(0,0,10,10,0,0,0,true);
      expect(Collisions.detect(obj1, obj2)).toEqual([]);
    });
    it('returns empty if no overlap', () => {
      const obj1 = makeObj(0,0,10,10);
      const obj2 = makeObj(100,100,10,10);
      expect(Collisions.detect(obj1, obj2)).toEqual([]);
    });
    it('detects right collision', () => {
      const obj1 = makeObj(0,0,10,10,1,0);
      const obj2 = makeObj(10,0,10,10);
      const result = Collisions.detect(obj1, obj2);
      expect(result.some(c => c.type === 'right')).toBe(true);
    });
    it('detects left collision', () => {
      const obj1 = makeObj(19,0,10,10,-1,0);
      const obj2 = makeObj(0,0,20,10);
      const result = Collisions.detect(obj1, obj2);
      expect(result.some(c => c.type === 'left')).toBe(true);
    });
    it('detects top collision', () => {
      const obj1 = makeObj(0,19,10,10,0,-1);
      const obj2 = makeObj(0,0,10,20);
      const result = Collisions.detect(obj1, obj2);
      expect(result.some(c => c.type === 'top')).toBe(true);
    });
    it('detects bottom collision', () => {
      const obj1 = makeObj(0,0,10,10,0,1);
      const obj2 = makeObj(0,10,10,10);
      const result = Collisions.detect(obj1, obj2);
      expect(result.some(c => c.type === 'bottom')).toBe(true);
    });
    it('detects rotated collision', () => {
      const obj1 = makeObj(0,0,10,10,0,0,45);
      const obj2 = makeObj(5,5,10,10,0,0,0);
      const result = Collisions.detect(obj1, obj2);
      expect(result.some(c => c.type === 'rotated')).toBe(true);
    });
    it('returns empty for rotated non-colliding', () => {
      const obj1 = makeObj(0,0,10,10,0,0,45);
      const obj2 = makeObj(100,100,10,10,0,0,0);
      const result = Collisions.detect(obj1, obj2);
      expect(result.length).toBe(0);
    });
  });
}); 