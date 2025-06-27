import { Collision } from '../src/collision';

describe('Collision', () => {
  it('constructs with type, object1, and object2', () => {
    const obj1 = { getFriction: () => 0.2 };
    const obj2 = { getFriction: () => 0.3 };
    const c = new Collision('test', obj1, obj2);
    expect(c.type).toBe('test');
    expect(c.object1).toBe(obj1);
    expect(c.object2).toBe(obj2);
  });

  it('getFriction returns the sum capped at 1', () => {
    const obj1 = { getFriction: () => 0.7 };
    const obj2 = { getFriction: () => 0.6 };
    const c = new Collision('test', obj1, obj2);
    expect(c.getFriction()).toBe(1);
  });

  it('getFriction returns the sum if less than 1', () => {
    const obj1 = { getFriction: () => 0.2 };
    const obj2 = { getFriction: () => 0.3 };
    const c = new Collision('test', obj1, obj2);
    expect(c.getFriction()).toBe(0.5);
  });
}); 