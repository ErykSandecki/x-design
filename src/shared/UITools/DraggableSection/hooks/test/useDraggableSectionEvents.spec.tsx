import { noop } from 'lodash';
import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useDraggableSectionEvents } from '../useDraggableSectionEvents';

// utils
import { createHtmlElement } from 'utils';

const elementRef = {
  current: createHtmlElement('div'),
} as RefObject<HTMLDivElement>;

describe('useDraggableSectionEvents', () => {
  it(`should return events and data`, () => {
    // before
    const { result } = renderHook(() => useDraggableSectionEvents('', noop, elementRef));

    // result
    expect(result.current).toStrictEqual({
      draggableItem: -1,
      isDraggable: false,
      isPressing: false,
      onMouseDown: expect.any(Function),
      selected: false,
      setIsDraggable: expect.any(Function),
    });
  });
});
