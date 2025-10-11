// mocks
import { elementMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { calculateCoordinatesLayoutFreeForm } from '../calculateCoordinatesLayoutFreeForm';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

describe('calculateCoordinatesLayoutFreeForm', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', '-1');
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', elementMock.id);
    el2.style.height = '100px';
    el2.style.left = '100px';
    el2.style.top = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it('should return coordinates', () => {
    // before
    const result = calculateCoordinatesLayoutFreeForm(currentPage, elementMock.id, '-1');

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });
});
