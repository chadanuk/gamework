import { TextItem } from '../src/textItem';
import { Rectangle } from '../src/rectangle';

describe('TextItem', () => {
  const mockContext = () => ({
    beginPath: jest.fn(),
    fillStyle: '',
    font: '',
    measureText: jest.fn(() => ({ width: 42 })),
    fillText: jest.fn(),
    fill: jest.fn()
  });

  it('constructs with expected properties', () => {
    const t = new TextItem(null, 'name', {x: 1, y: 2}, '16px', 'Arial', '#fff', 'hello');
    expect(t.name).toBe('name');
    expect(t.position).toEqual({x: 1, y: 2});
    expect(t.fontSize).toBe('16px');
    expect(t.fontType).toBe('Arial');
    expect(t.colour).toBe('#fff');
    expect(t.text).toBe('hello');
  });

  it('setText updates the text', () => {
    const t = new TextItem(null, 'name', {x: 1, y: 2});
    t.setText('new text');
    expect(t.text).toBe('new text');
  });

  it('draw does nothing if deleted', () => {
    const t = new TextItem(null, 'name', {x: 1, y: 2}, '16px', 'Arial', '#fff', 'hello');
    t.deleted = true;
    const ctx = mockContext();
    t.draw(ctx);
    expect(ctx.beginPath).not.toHaveBeenCalled();
  });

  it('draw does nothing if text is empty', () => {
    const t = new TextItem(null, 'name', {x: 1, y: 2}, '16px', 'Arial', '#fff', '');
    const ctx = mockContext();
    t.draw(ctx);
    expect(ctx.beginPath).not.toHaveBeenCalled();
  });

  it('draws text if not deleted and text is present', () => {
    const t = new TextItem(null, 'name', {x: 1, y: 2}, '16px', 'Arial', '#fff', 'hello');
    const ctx = mockContext();
    t.draw(ctx);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalledWith('hello', t.rectangle.x, t.rectangle.y);
    expect(t.rectangle.width).toBe(42);
  });
}); 