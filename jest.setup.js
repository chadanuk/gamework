global.window = Object.create(global.window || {});
window.gamework = { WALL_DEPTH: 10 };
global.canvas = { width: 1000, height: 800 };
if (!global.document) {
  global.document = {};
}
global.document.addEventListener = jest.fn();
global.document.removeEventListener = jest.fn(); 