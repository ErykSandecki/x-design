// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { getDefaultCoordinates } from '../getDefaultCoordinates';

const parentId = selectedElementMock.id;
const childrenId = '2';

describe('getDefaultCoordinates', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', parentId);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', childrenId);
    el2.style.height = '10px';
    el2.style.width = '10px';

    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should get coordinates`, () => {
    // before
    const result = getDefaultCoordinates(
      {
        horizontal: AlignmentHorizontal.center,
        vertical: AlignmentVertical.center,
      },
      childrenId,
      parentId,
    );

    // result
    expect(result).toStrictEqual({ x: 45, y: 45 });
  });

  it(`should get coordinates`, () => {
    // before
    const result = getDefaultCoordinates(
      {
        horizontal: AlignmentHorizontal.left,
        vertical: AlignmentVertical.top,
      },
      childrenId,
      parentId,
    );

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });

  it(`should get coordinates`, () => {
    // before
    const result = getDefaultCoordinates(
      {
        horizontal: AlignmentHorizontal.right,
        vertical: AlignmentVertical.bottom,
      },
      childrenId,
      parentId,
    );

    // result
    expect(result).toStrictEqual({ x: 90, y: 90 });
  });
});
