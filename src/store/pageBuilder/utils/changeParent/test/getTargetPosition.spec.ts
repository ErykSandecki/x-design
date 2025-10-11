// mocks
import { elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { LayoutType } from 'types';

// utils
import { getTargetPosition } from '../getTargetPosition';

describe('getTargetPosition', () => {
  it('should return absolute when base parent', () => {
    // before
    const result = getTargetPosition({ ...elementMock, id: '-1' }, '-1');

    // result
    expect(result).toBe('absolute');
  });

  it('should return absolute when parent has grid layout', () => {
    // before
    const result = getTargetPosition(elementMock, elementMock.id);

    // result
    expect(result).toBe('absolute');
  });

  it('should return relative', () => {
    // before
    const result = getTargetPosition(
      { ...elementMock, layout: { ...layoutMock, type: LayoutType.grid } },
      elementMock.id,
    );

    // result
    expect(result).toBe('relative');
  });
});
