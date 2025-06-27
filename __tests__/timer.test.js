import { Timer } from '../src/timer';

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('constructs with expected properties', () => {
    const t = new Timer();
    expect(t.startTime).toBeNull();
    expect(t.currentTime).toBeNull();
    expect(t.timeElapsed).toBe(0);
    expect(t.timer).toBeNull();
  });

  it('start sets startTime and begins interval', () => {
    const t = new Timer();
    t.start();
    expect(t.startTime).toBeInstanceOf(Date);
    expect(t.timeElapsed).toBe(0);
    expect(t.timer).not.toBeNull();
  });

  it('stop clears timer and resets times', () => {
    const t = new Timer();
    t.start();
    t.stop();
    expect(t.startTime).toBeNull();
    expect(t.currentTime).toBeNull();
  });

  it('increments timeElapsed as time passes', () => {
    const t = new Timer();
    t.start();
    jest.advanceTimersByTime(1000);
    expect(t.timeElapsed).toBeGreaterThanOrEqual(1);
    t.stop();
  });
}); 