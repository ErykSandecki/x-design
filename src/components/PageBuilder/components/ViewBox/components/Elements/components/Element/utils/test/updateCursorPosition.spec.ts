import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateCursorPosition } from '../updateCursorPosition';

const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;

describe('updateCursorPosition', () => {
  it(`should update cursor position`, () => {
    // before
    updateCursorPosition(ref, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });

  it('should get positio from DOM', () => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', '-1');
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', 'test-1');
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    // before
    updateCursorPosition(ref, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });
});
