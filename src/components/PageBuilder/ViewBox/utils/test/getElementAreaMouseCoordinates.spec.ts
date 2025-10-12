import { MouseEvent } from 'react';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';

// utils
import { createHtmlElement } from 'utils';
import { getElementAreaMouseCoordinates } from '../getElementAreaMouseCoordinates';

const el1 = createHtmlElement('div', { id: 'test-1' });

describe('getElementAreaMouseCoordinates', () => {
  beforeAll(() => {
    // mock
    el1.style.height = '100px';
    el1.style.width = '100px';
    document.body.appendChild(el1);
  });

  it(`should coordinates when base parent`, () => {
    // before
    const result = getElementAreaMouseCoordinates(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      '-1',
    );

    // result
    expect(result).toStrictEqual({ x: 100, y: 100 });
  });

  it(`should coordinates when some element inside base parent`, () => {
    // before
    const result = getElementAreaMouseCoordinates(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      'test-1',
    );

    // result
    expect(result).toStrictEqual({ x: 100, y: 100 });
  });
});
