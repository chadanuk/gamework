import { GameObject } from '../src/gameObject';
import { Vector } from '../src/vector';
import { Collision } from '../src/collision';

describe('GameObject', () => {
  let rectangle, sceneMock, obj;

  beforeEach(() => {
    rectangle = { x: 0, y: 0, width: 10, height: 10 };
    sceneMock = { addObject: jest.fn(), game: { canvas: { width: 100, height: 100 } } };
    obj = new GameObject(sceneMock, 'test', rectangle);
  });

  it('constructs with expected properties and adds itself to scene', () => {
    expect(obj.name).toBe('test');
    expect(obj.rectangle).toBe(rectangle);
    expect(obj.scene).toBe(sceneMock);
    expect(sceneMock.addObject).toHaveBeenCalledWith(obj);
    expect(obj.velocity).toBeInstanceOf(Vector);
    expect(obj.acceleration).toBeInstanceOf(Vector);
    expect(obj.keysDown).toBeInstanceOf(Set);
    expect(obj.sounds).toEqual([]);
  });

  it('pause sets paused to true', () => {
    obj.paused = false;
    obj.pause();
    expect(obj.paused).toBe(true);
  });

  it('addSound adds a sound if not present', () => {
    const sound = {};
    obj.addSound(sound);
    expect(obj.sounds).toContain(sound);
    // Should not add duplicate
    obj.addSound(sound);
    expect(obj.sounds.length).toBe(1);
  });

  it('setShowHitBox sets showHitBox', () => {
    obj.setShowHitBox(true);
    expect(obj.showHitBox).toBe(true);
  });

  it('setAsset sets asset', () => {
    const asset = {};
    obj.setAsset(asset);
    expect(obj.asset).toBe(asset);
  });

  it('setScene sets scene', () => {
    const newScene = {};
    obj.setScene(newScene);
    expect(obj.scene).toBe(newScene);
  });

  it('setMaxSpeed sets maxSpeed', () => {
    obj.setMaxSpeed(42);
    expect(obj.maxSpeed).toBe(42);
  });

  it('setVelocity sets velocity', () => {
    const v = new Vector(1, 2);
    obj.setVelocity(v);
    expect(obj.velocity).toBe(v);
  });

  it('setAcceleration sets acceleration', () => {
    const a = new Vector(3, 4);
    obj.setAcceleration(a);
    expect(obj.acceleration).toBe(a);
  });

  it('setFriction sets friction', () => {
    obj.setFriction(0.5);
    expect(obj.friction).toBe(0.5);
  });

  it('getFriction returns 0 if friction is null', () => {
    obj.friction = null;
    expect(obj.getFriction()).toBe(0);
  });

  it('getFriction returns friction if set', () => {
    obj.friction = 0.7;
    expect(obj.getFriction()).toBe(0.7);
  });

  it('remove sets deleted to true', () => {
    obj.deleted = false;
    obj.remove();
    expect(obj.deleted).toBe(true);
  });

  it('setPosition updates rectangle and shape', () => {
    const pos = { x: 5, y: 6 };
    obj.setPosition(pos);
    expect(obj.rectangle.x).toBe(5);
    expect(obj.rectangle.y).toBe(6);
    expect(obj.shape.x).toBe(5);
    expect(obj.shape.y).toBe(6);
  });

  it('updateVelocity updates velocity and caps at maxSpeed', () => {
    obj.velocity = new Vector(3, 4);
    obj.acceleration = new Vector(0, 0);
    obj.maxSpeed = 5;
    obj.updateVelocity();
    // Should not change since already at maxSpeed
    expect(Math.round(Math.sqrt(obj.velocity.x ** 2 + obj.velocity.y ** 2))).toBe(5);
    // Now test with override
    obj.updateVelocity({ x: 10, y: 0 });
    expect(obj.velocity.x).toBe(obj.maxSpeed);
  });

  it('updatePositionBasedOnKeys sets velocity based on keysDown', () => {
    obj.userControlledSpeed = 2;
    obj.keysDown = new Set(['ArrowUp']);
    obj.updatePositionBasedOnKeys();
    expect(obj.velocity.y).toBe(-2);
    obj.keysDown = new Set(['ArrowDown']);
    obj.updatePositionBasedOnKeys();
    expect(obj.velocity.y).toBe(2);
    obj.keysDown = new Set(['ArrowLeft']);
    obj.updatePositionBasedOnKeys();
    expect(obj.velocity.x).toBe(-2);
    obj.keysDown = new Set(['ArrowRight']);
    obj.updatePositionBasedOnKeys();
    expect(obj.velocity.x).toBe(2);
  });

  it('draw calls drawHitBox, asset.draw, sprite.draw, and drawTraceLine as appropriate', () => {
    const context = {
      save: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      clearRect: jest.fn(),
    };
    obj.drawHitBox = jest.fn();
    obj.drawTraceLine = jest.fn();
    obj.asset = { draw: jest.fn() };
    obj.sprite = { draw: jest.fn() };
    obj.currentAngle = 45;
    obj.deleted = false;
    obj.draw(context);
    expect(context.save).toHaveBeenCalled();
    expect(obj.drawHitBox).toHaveBeenCalledWith(context);
    expect(obj.asset.draw).toHaveBeenCalledWith(context);
    expect(obj.sprite.draw).toHaveBeenCalledWith(context);
    expect(context.restore).toHaveBeenCalled();
    expect(obj.drawTraceLine).toHaveBeenCalledWith(context);
  });

  it('draw does nothing if deleted', () => {
    const context = { save: jest.fn(), restore: jest.fn() };
    obj.deleted = true;
    obj.draw(context);
    expect(context.save).not.toHaveBeenCalled();
  });

  it('detectCollisions detects rectangle overlap and adds collisions', () => {
    obj.velocity = new Vector(1, 0);
    const other = new GameObject(null, 'other', { x: 5, y: 0, width: 10, height: 10 });
    obj.currentCollisions = [];
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c instanceof Collision)).toBe(true);
  });

  it('detectCollisions does nothing if object.ignoreCollisions is true', () => {
    const other = new GameObject(null, 'other', { x: 5, y: 0, width: 10, height: 10 });
    other.ignoreCollisions = true;
    obj.currentCollisions = [];
    obj.detectCollisions(other);
    expect(obj.currentCollisions.length).toBe(0);
  });

  it('handleCollisions responds to collisions and clears currentCollisions (fixed)', () => {
    obj.velocity = new Vector(1, 0);
    obj.acceleration = new Vector(1, 0);
    obj.currentCollisions = [
      new Collision('right', obj, {}),
      new Collision('top', obj, {})
    ];
    obj.getCollisionsFriction = jest.fn(() => 1);
    obj.collisionExists = jest.fn(type => type === 'right' || type === 'top');
    obj.handleRotationInCollision = jest.fn();
    obj.playSound = jest.fn();
    obj.onCollision = jest.fn();
    obj.hasNoVelocity = jest.fn(() => false);
    obj.handleCollisions();
    expect(obj.velocity.x).toBe(-1);
    expect(obj.acceleration.x).toBe(-1);
    expect(obj.handleRotationInCollision).toHaveBeenCalledWith('right', 1);
    expect(obj.playSound).toHaveBeenCalledWith('collision');
    // Check the actual argument passed to onCollision
    const callArg = obj.onCollision.mock.calls[0][0];
    expect(Array.isArray(callArg)).toBe(true);
    expect(callArg.length).toBe(2);
    expect(callArg[0]).toBeInstanceOf(Collision);
    expect(callArg[1]).toBeInstanceOf(Collision);
    expect(callArg[0].type).toBe('right');
    expect(callArg[1].type).toBe('top');
    expect(obj.currentCollisions).toEqual([]);
  });

  it('handleCollisions clears currentCollisions if hasNoVelocity or empty', () => {
    obj.currentCollisions = [new Collision('right', obj, {})];
    obj.hasNoVelocity = jest.fn(() => true);
    obj.handleCollisions();
    expect(obj.currentCollisions).toEqual([]);
  });

  it('handleCollisions handles left collision with velocity.x < 0', () => {
    obj.velocity = new Vector(-2, 0);
    obj.acceleration = new Vector(-2, 0);
    obj.currentCollisions = [new Collision('left', obj, {})];
    obj.getCollisionsFriction = jest.fn(() => 1);
    obj.collisionExists = jest.fn(type => type === 'left');
    obj.handleRotationInCollision = jest.fn();
    obj.playSound = jest.fn();
    obj.onCollision = jest.fn();
    obj.hasNoVelocity = jest.fn(() => false);
    obj.handleCollisions();
    expect(obj.velocity.x).toBe(2); // reversed and friction applied
    expect(obj.acceleration.x).toBe(2); // reversed
    expect(obj.handleRotationInCollision).toHaveBeenCalledWith('left', 1);
    expect(obj.playSound).toHaveBeenCalledWith('collision');
    expect(obj.onCollision).toHaveBeenCalled();
    expect(obj.currentCollisions).toEqual([]);
  });

  it('handleCollisions handles top collision with velocity.y < 0', () => {
    obj.velocity = new Vector(0, -3);
    obj.acceleration = new Vector(0, -3);
    obj.currentCollisions = [new Collision('top', obj, {})];
    obj.getCollisionsFriction = jest.fn(() => 1);
    obj.collisionExists = jest.fn(type => type === 'top');
    obj.handleRotationInCollision = jest.fn();
    obj.playSound = jest.fn();
    obj.onCollision = jest.fn();
    obj.hasNoVelocity = jest.fn(() => false);
    obj.handleCollisions();
    expect(obj.velocity.y).toBe(3); // reversed and friction applied
    expect(obj.acceleration.y).toBe(3); // reversed
    expect(obj.handleRotationInCollision).toHaveBeenCalledWith('top', 1);
    expect(obj.playSound).toHaveBeenCalledWith('collision');
    expect(obj.onCollision).toHaveBeenCalled();
    expect(obj.currentCollisions).toEqual([]);
  });

  it('handleCollisions handles bottom collision with velocity.y > 0', () => {
    obj.velocity = new Vector(0, 4);
    obj.acceleration = new Vector(0, 4);
    obj.currentCollisions = [new Collision('bottom', obj, {})];
    obj.getCollisionsFriction = jest.fn(() => 1);
    obj.collisionExists = jest.fn(type => type === 'bottom');
    obj.handleRotationInCollision = jest.fn();
    obj.playSound = jest.fn();
    obj.onCollision = jest.fn();
    obj.hasNoVelocity = jest.fn(() => false);
    obj.handleCollisions();
    expect(obj.velocity.y).toBe(-4); // reversed and friction applied
    expect(obj.acceleration.y).toBe(-4); // reversed
    expect(obj.handleRotationInCollision).toHaveBeenCalledWith('bottom', 1);
    expect(obj.playSound).toHaveBeenCalledWith('collision');
    expect(obj.onCollision).toHaveBeenCalled();
    expect(obj.currentCollisions).toEqual([]);
  });

  // drawRotated
  it('drawRotated applies rotation and translation to context', () => {
    const context = { translate: jest.fn(), rotate: jest.fn() };
    obj.rectangle = { x: 10, y: 20, width: 30, height: 40 };
    obj.currentAngle = 90;
    obj.drawRotated(context);
    expect(context.translate).toHaveBeenCalledTimes(2);
    expect(context.rotate).toHaveBeenCalled();
  });

  // setScreenDrawObject/getDrawObjectPosition
  it('setScreenDrawObject sets and getDrawObjectPosition returns correct value', () => {
    const shape = { x: 7, y: 8 };
    obj.setScreenDrawObject(shape);
    expect(obj.screenDrawObject).toBe(shape);
    expect(obj.getDrawObjectPosition()).toEqual({ x: 7, y: 8 });
  });

  // hasNoVelocity
  it('hasNoVelocity returns true if velocity is zero and keysDown is empty', () => {
    obj.velocity = new Vector(0, 0);
    obj.controlledByKeyPad = false;
    expect(obj.hasNoVelocity()).toBe(true);
    obj.controlledByKeyPad = true;
    obj.keysDown = new Set();
    expect(obj.hasNoVelocity()).toBe(true);
  });
  it('hasNoVelocity returns false if velocity is not zero', () => {
    obj.velocity = new Vector(1, 0);
    expect(obj.hasNoVelocity()).toBe(false);
  });

  // getCollisionByType
  it('getCollisionByType returns the correct collision', () => {
    const c = new Collision('right', obj, {});
    obj.currentCollisions = [c];
    expect(obj.getCollisionByType('right')).toBe(c);
    expect(obj.getCollisionByType('left')).toBeUndefined();
  });

  // collisionExists
  it('collisionExists returns true if collision of type exists', () => {
    obj.currentCollisions = [new Collision('right', obj, {})];
    expect(obj.collisionExists('right')).toBe(true);
    expect(obj.collisionExists('left')).toBe(false);
  });

  // getCollisionsFriction
  it('getCollisionsFriction sums friction for given types', () => {
    const c1 = { type: 'right', getFriction: () => 0.3 };
    const c2 = { type: 'left', getFriction: () => 0.8 };
    obj.currentCollisions = [c1, c2];
    expect(obj.getCollisionsFriction(['right', 'left'])).toBe(1);
    expect(obj.getCollisionsFriction(['right'])).toBe(1);
    expect(obj.getCollisionsFriction(['none'])).toBe(1);
  });

  // handleRotationInCollision
  it('handleRotationInCollision updates velocity and calls correctAccelerationAfterRotation', () => {
    obj.rotation = 2;
    obj.velocity = new Vector(1, 2);
    obj.acceleration = new Vector(1, 1);
    obj.updateVelocity = jest.fn();
    obj.correctAccelerationAfterRotation = jest.fn();
    obj.handleRotationInCollision('top', 0.5);
    expect(obj.updateVelocity).toHaveBeenCalled();
    expect(obj.correctAccelerationAfterRotation).toHaveBeenCalled();
  });
  it('handleRotationInCollision does nothing if rotation is 0', () => {
    obj.rotation = 0;
    obj.updateVelocity = jest.fn();
    obj.correctAccelerationAfterRotation = jest.fn();
    obj.handleRotationInCollision('top', 0.5);
    expect(obj.updateVelocity).not.toHaveBeenCalled();
  });

  // correctAccelerationAfterRotation
  it('correctAccelerationAfterRotation flips acceleration if needed', () => {
    obj.velocity = new Vector(-1, 1);
    obj.acceleration = new Vector(1, -1);
    obj.correctAccelerationAfterRotation();
    expect(obj.acceleration.x).toBe(-1);
    expect(obj.acceleration.y).toBe(1);
  });

  // stop
  it('stop sets velocity to zero', () => {
    obj.velocity = new Vector(5, 5);
    obj.stop();
    expect(obj.velocity.x).toBe(0);
    expect(obj.velocity.y).toBe(0);
  });

  // playSound/stopSound/findSound
  it('findSound returns sound by name', () => {
    const sound = { name: 'foo' };
    obj.sounds = [sound];
    expect(obj.findSound('foo')).toBe(sound);
    expect(obj.findSound('bar')).toBe(null);
  });
  it('playSound calls play on found sound', () => {
    const sound = { name: 'foo', play: jest.fn() };
    obj.sounds = [sound];
    obj.playSound('foo');
    expect(sound.play).toHaveBeenCalled();
  });
  it('stopSound calls stop on found sound', () => {
    const sound = { name: 'foo', stop: jest.fn() };
    obj.sounds = [sound];
    obj.stopSound('foo');
    expect(sound.stop).toHaveBeenCalled();
  });
  it('stopSound calls stop on all sounds if no name given', () => {
    const sound1 = { name: 'foo', stop: jest.fn() };
    const sound2 = { name: 'bar', stop: jest.fn() };
    obj.sounds = [sound1, sound2];
    obj.stopSound();
    expect(sound1.stop).toHaveBeenCalled();
    expect(sound2.stop).toHaveBeenCalled();
  });
});

describe('constrainObjectToCanvasBounds', () => {
  let scene, obj;
  beforeEach(() => {
    scene = { game: { canvas: { width: 100, height: 100 } }, addObject: jest.fn() };
    obj = new GameObject(scene, 'test', { x: 0, y: 0, width: 10, height: 10 });
    obj.shouldConstrainToCanvasBounds = true;
  });

  it('does nothing if shouldConstrainToCanvasBounds is false', () => {
    obj.shouldConstrainToCanvasBounds = false;
    obj.rectangle.x = -50;
    obj.velocity.x = 5;
    obj.constrainObjectToCanvasBounds();
    expect(obj.rectangle.x).toBe(-50);
    expect(obj.velocity.x).toBe(5);
  });

  it('bounces off the left edge', () => {
    obj.rectangle.x = -15;
    obj.velocity.x = -2;
    obj.constrainObjectToCanvasBounds();
    expect(obj.rectangle.x).toBe(0);
    expect(obj.velocity.x).toBe(2);
  });

  it('bounces off the right edge', () => {
    obj.rectangle.x = 120;
    obj.velocity.x = 3;
    obj.constrainObjectToCanvasBounds();
    expect(obj.rectangle.x).toBe(100);
    expect(obj.velocity.x).toBe(-3);
  });

  it('bounces off the top edge', () => {
    obj.rectangle.y = -20;
    obj.velocity.y = -4;
    obj.constrainObjectToCanvasBounds();
    expect(obj.rectangle.y).toBe(0);
    expect(obj.velocity.y).toBe(4);
  });

  it('bounces off the bottom edge', () => {
    obj.rectangle.y = 120;
    obj.velocity.y = 5;
    obj.constrainObjectToCanvasBounds();
    expect(obj.rectangle.y).toBe(100);
    expect(obj.velocity.y).toBe(-5);
  });
});

describe('calculatePosition', () => {
  let scene, obj;
  beforeEach(() => {
    scene = { game: { canvas: { width: 100, height: 100 } }, addObject: jest.fn() };
    obj = new GameObject(scene, 'test', { x: 10, y: 20, width: 10, height: 10 });
    obj.velocity = new Vector(2, 3);
    obj.acceleration = new Vector(0, 0);
    obj.rotation = 0;
    obj.paused = false;
    obj.onPositionChange = jest.fn();
  });

  it('does nothing if paused', () => {
    obj.paused = true;
    obj.rectangle.x = 10;
    obj.calculatePosition();
    expect(obj.rectangle.x).toBe(10);
  });

  it('updates position and calls onPositionChange', () => {
    obj.velocity = new Vector(4, 6);
    obj.acceleration = new Vector(0, 0);
    obj.maxSpeed = 100;
    obj.calculatePosition();
    expect(obj.velocity.x).toBeLessThanOrEqual(obj.maxSpeed);
    expect(obj.rectangle.x).toBe(14);
    expect(obj.rectangle.y).toBe(26);
    expect(obj.shape.x).toBe(14);
    expect(obj.shape.y).toBe(26);
    expect(obj.onPositionChange).toHaveBeenCalled();
  });

  it('updates currentAngle if rotation is set', () => {
    obj.rotation = 5;
    obj.currentAngle = 10;
    obj.calculatePosition();
    expect(obj.currentAngle).toBe(15);
  });

  it('calls updatePositionBasedOnKeys if controlledByKeyPad', () => {
    obj.controlledByKeyPad = true;
    obj.updatePositionBasedOnKeys = jest.fn();
    obj.calculatePosition();
    expect(obj.updatePositionBasedOnKeys).toHaveBeenCalled();
  });
});

describe('detectCollisions', () => {
  let obj, other, scene;
  beforeEach(() => {
    scene = { game: { canvas: { width: 100, height: 100 } }, addObject: jest.fn() };
    obj = new GameObject(scene, 'obj', { x: 10, y: 10, width: 10, height: 10 });
    obj.currentCollisions = [];
    other = new GameObject(scene, 'other', { x: 0, y: 0, width: 10, height: 10 });
    other.currentCollisions = [];
  });

  it('does nothing if object.ignoreCollisions is true', () => {
    other.ignoreCollisions = true;
    obj.detectCollisions(other);
    expect(obj.currentCollisions).toEqual([]);
  });

  it('does nothing if rectangles do not overlap', () => {
    other.rectangle.x = 100;
    other.rectangle.y = 100;
    obj.detectCollisions(other);
    expect(obj.currentCollisions).toEqual([]);
  });

  it('detects right collision (velocity.x > 0)', () => {
    other.rectangle.x = 20;
    other.rectangle.y = 10;
    obj.velocity.x = 1;
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c.type === 'right')).toBe(true);
  });

  it('detects left collision (velocity.x < 0)', () => {
    // obj is to the right of other, moving left
    obj.rectangle.x = 19;
    obj.rectangle.width = 10;
    other.rectangle.x = 0;
    other.rectangle.width = 20;
    obj.velocity.x = -1;
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c.type === 'left')).toBe(true);
  });

  it('detects top collision (velocity.y < 0)', () => {
    // obj is below other, moving up
    obj.rectangle.y = 19;
    obj.rectangle.height = 10;
    other.rectangle.y = 0;
    other.rectangle.height = 20;
    obj.velocity.y = -1;
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c.type === 'top')).toBe(true);
  });

  it('detects bottom collision (velocity.y > 0)', () => {
    other.rectangle.y = 20;
    obj.velocity.y = 1;
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c.type === 'bottom')).toBe(true);
  });

  it('detects multiple collisions at once', () => {
    // Overlap on right and bottom
    obj.rectangle = { x: 9, y: 9, width: 10, height: 10 };
    other.rectangle = { x: 15, y: 15, width: 10, height: 10 };
    obj.velocity.x = 1;
    obj.velocity.y = 1;
    obj.currentCollisions = [];
    obj.detectCollisions(other);
    expect(obj.currentCollisions.some(c => c.type === 'right')).toBe(true);
    expect(obj.currentCollisions.some(c => c.type === 'bottom')).toBe(true);
  });
}); 