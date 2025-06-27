import { Storage } from '../src/storage';

describe('Storage', () => {
  let storageMock;
  beforeEach(() => {
    storageMock = {};
    global.localStorage = {
      getItem: jest.fn((key) => storageMock[key] || null),
      setItem: jest.fn((key, value) => { storageMock[key] = value; })
    };
  });

  it('get returns all data if no key is provided', async () => {
    storageMock['test'] = JSON.stringify({ a: 1, b: 2 });
    const s = new Storage('test');
    const data = await s.get();
    expect(data).toEqual({ a: 1, b: 2 });
  });

  it('get returns value for a key', async () => {
    storageMock['test'] = JSON.stringify({ a: 1, b: 2 });
    const s = new Storage('test');
    const value = await s.get('a');
    expect(value).toBe(1);
  });

  it('get returns defaultValue if key is missing', async () => {
    storageMock['test'] = JSON.stringify({ a: 1 });
    const s = new Storage('test');
    const value = await s.get('b', 42);
    expect(value).toBe(42);
  });

  it('set updates the value for a key', async () => {
    storageMock['test'] = JSON.stringify({ a: 1 });
    const s = new Storage('test');
    await s.set('b', 2);
    const data = JSON.parse(storageMock['test']);
    expect(data.b).toBe(2);
  });
}); 