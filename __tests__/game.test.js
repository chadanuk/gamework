import { Game } from '../src/game';

describe('Game', () => {
  let canvasMock, contextMock, game;

  beforeEach(() => {
    contextMock = {
      clearRect: jest.fn(),
      scale: jest.fn(),
      getContext: jest.fn(() => contextMock),
    };
    canvasMock = {
      width: 0,
      height: 0,
      getContext: jest.fn(() => contextMock),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    global.window.devicePixelRatio = 1;
    global.window.innerWidth = 800;
    global.window.innerHeight = 600;
    global.window.gamework = undefined;
    global.window.addEventListener = jest.fn();
    global.window.removeEventListener = jest.fn();
    global.document.addEventListener = jest.fn();
    global.document.removeEventListener = jest.fn();
    game = new Game(canvasMock);
  });

  it('constructs and sets up canvas and context', () => {
    expect(game.canvas).toBe(canvasMock);
    expect(game.context).toBe(contextMock);
    expect(canvasMock.width).toBe(800);
    expect(canvasMock.height).toBe(600);
    expect(contextMock.scale).toHaveBeenCalledWith(1, 1);
    expect(global.window.gamework).toBe(game);
  });

  it('setConstants merges constants', () => {
    const prev = { ...game.constants };
    game.setConstants({ foo: 'bar' });
    expect(game.constants.foo).toBe('bar');
    Object.keys(prev).forEach(k => {
      expect(game.constants[k]).toBe(prev[k]);
    });
  });

  it('pause sets paused to true', () => {
    game.paused = false;
    game.pause();
    expect(game.paused).toBe(true);
  });

  it('addScene adds a scene and sets its game', () => {
    const scene = { setShowHitBoxes: jest.fn(), setGame: jest.fn() };
    game.showHitBoxes = true;
    game.addScene(scene);
    expect(game.scenes).toContain(scene);
    expect(scene.setShowHitBoxes).toHaveBeenCalledWith(true);
    expect(scene.setGame).toHaveBeenCalledWith(game);
  });

  it('removeScene removes a scene and calls remove', () => {
    const scene = { id: 1, remove: jest.fn(), setGame: jest.fn() };
    game.scenes = [scene];
    game.removeScene(scene);
    expect(game.scenes).not.toContain(scene);
    expect(scene.remove).toHaveBeenCalled();
  });

  it('handleKeyDown only adds allowed keys and delegates to scenes', () => {
    const scene = { handleKeysDown: jest.fn() };
    game.scenes = [scene];
    const event = { key: 'ArrowUp', preventDefault: jest.fn() };
    game.handleKeyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(game.keysDown.has('ArrowUp')).toBe(true);
    expect(scene.handleKeysDown).toHaveBeenCalledWith(['ArrowUp']);
  });

  it('handleKeyUp removes key and delegates to scenes', () => {
    const scene = { handleKeyUp: jest.fn() };
    game.scenes = [scene];
    game.keysDown.add('ArrowUp');
    const event = { key: 'ArrowUp', preventDefault: jest.fn() };
    game.handleKeyUp(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(game.keysDown.has('ArrowUp')).toBe(false);
    expect(scene.handleKeyUp).toHaveBeenCalledWith([], 'ArrowUp');
  });

  it('getPositionFromPointerEvent handles mouse and touch events', () => {
    expect(game.getPositionFromPointerEvent({ pageX: 5, pageY: 6 })).toEqual({ x: 5, y: 6 });
    expect(game.getPositionFromPointerEvent({ touches: [{ clientX: 7, clientY: 8 }] })).toEqual({ x: 7, y: 8 });
  });

  it('handlePointerDown sets pointerIsDown and delegates to scenes', () => {
    const scene = { handlePointerDown: jest.fn() };
    game.scenes = [scene];
    const event = { pageX: 1, pageY: 2 };
    game.handlePointerDown(event);
    expect(game.pointerIsDown).toBe(true);
    expect(game.pointerDownPosition).toEqual({ x: 1, y: 2 });
    expect(scene.handlePointerDown).toHaveBeenCalledWith({ x: 1, y: 2 });
  });

  it('handlePointerMove delegates to scenes with correct dx/dy', () => {
    const scene = { handlePointerMovement: jest.fn() };
    game.scenes = [scene];
    game.pointerIsDown = true;
    game.pointerDownPosition = { x: 1, y: 2 };
    const event = { pageX: 4, pageY: 6 };
    game.handlePointerMove(event);
    expect(scene.handlePointerMovement).toHaveBeenCalledWith({ dx: 3, dy: 4 }, { x: 4, y: 6 }, true);
  });

  it('handlePointerEnd delegates to scenes and resets pointer state', () => {
    const scene = { handlePointerEnd: jest.fn() };
    game.scenes = [scene];
    game.pointerIsDown = true;
    game.pointerDownPosition = { x: 1, y: 2 };
    const event = { pageX: 4, pageY: 6 };
    game.handlePointerEnd(event);
    expect(scene.handlePointerEnd).toHaveBeenCalledWith({ dx: 3, dy: 4 });
    expect(game.pointerIsDown).toBe(false);
    expect(game.pointerDownPosition).toBeNull();
  });

  it('draw clears the context and draws all scenes', () => {
    const scene = { draw: jest.fn() };
    game.scenes = [scene];
    game.draw();
    expect(contextMock.clearRect).toHaveBeenCalledWith(0, 0, canvasMock.width, canvasMock.height);
    expect(scene.draw).toHaveBeenCalledWith(contextMock);
  });
}); 