import { SquareGameObject } from '../src/squareGameObject';
import { GameObject } from '../src/gameObject';

describe('SquareGameObject', () => {
  it('can be constructed and is an instance of GameObject', () => {
    const sq = new SquareGameObject();
    expect(sq).toBeInstanceOf(GameObject);
    expect(sq).toBeInstanceOf(SquareGameObject);
  });
}); 