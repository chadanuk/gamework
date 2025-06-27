/** @jest-environment jsdom */

global.window = Object.create(global.window || {});
window.gamework = { WALL_DEPTH: 10 };
global.canvas = { width: 1000, height: 800 };
jest.mock('../src/wall', () => ({ Wall: jest.fn() }));
import { OuterWalls } from '../src/outer.walls';

describe('OuterWalls', () => {
  let sceneMock;
  let originalCanvas;
  let originalWALL_DEPTH;

  beforeAll(() => {
    // Mock canvas and WALL_DEPTH
    originalCanvas = global.canvas;
    global.canvas = { width: 1000, height: 800 };
    originalWALL_DEPTH = window.gamework.WALL_DEPTH;
    window.gamework.WALL_DEPTH = 10;
  });

  afterAll(() => {
    global.canvas = originalCanvas;
    window.gamework.WALL_DEPTH = originalWALL_DEPTH;
  });

  beforeEach(() => {
    sceneMock = { removeObjectsWithNameContaining: jest.fn() };
  });

  it('constructs and generates walls', () => {
    const ow = new OuterWalls(sceneMock);
    expect(ow.scene).toBe(sceneMock);
    expect(Array.isArray(ow.walls)).toBe(true);
  });

  it('setWallsConfig updates config and regenerates walls', () => {
    const ow = new OuterWalls(sceneMock);
    const newConfig = [{ x: 0, y: 0, w: 100, h: 10 }];
    ow.setWallsConfig(newConfig, null);
    expect(ow.wallsConfig).toBe(newConfig);
    expect(Array.isArray(ow.walls)).toBe(true);
  });
}); 