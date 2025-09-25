import { noop } from 'lodash';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { Unit } from 'types';

// utils
import { applyTypeSize } from '../applyTypeSize';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const clonedElements = {
  ...currentPage.elements,
  allData: {
    ...currentPage.elements.allData,
    [elementAllDataMock.id]: elementAllDataMock,
  },
  dynamicData: {
    ...currentPage.elements.dynamicData,
    [elementDynamicDataMock.id]: elementDynamicDataMock,
  },
  staticData: {
    ...currentPage.elements.staticData,
    [elementStaticDataMock.id]: elementStaticDataMock,
  },
};

describe('applyTypeSize', () => {
  beforeAll(() => {
    // mock
    document.getElementById = () => ({ querySelector: noop }) as any;
    window.getComputedStyle = () =>
      ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should apply auto`, () => {
    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'auto');

    // result
    expect(clonedElements.allData['1'].height.unit).toBe(undefined);
    expect(clonedElements.allData['1'].height.value).toBe('auto');
    expect(clonedElements.dynamicData['1'].height.unit).toBe(undefined);
    expect(clonedElements.dynamicData['1'].height.value).toBe('auto');
  });

  it(`should apply fixed`, () => {
    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'fixed');

    // result
    expect(clonedElements.allData['1'].height.unit).toBe(undefined);
    expect(clonedElements.allData['1'].height.value).toBe(100);
    expect(clonedElements.dynamicData['1'].height.unit).toBe(undefined);
    expect(clonedElements.dynamicData['1'].height.value).toBe(100);
  });

  it(`should apply max and remove`, () => {
    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'max');

    // result
    expect(clonedElements.allData['1'].height.max).toBe(100);
    expect(clonedElements.dynamicData['1'].height.max).toBe(100);

    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'max');

    // result
    expect(clonedElements.allData['1'].height.max).toBe(undefined);
    expect(clonedElements.dynamicData['1'].height.max).toBe(undefined);
  });

  it(`should apply min and remove`, () => {
    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'min');

    // result
    expect(clonedElements.allData['1'].height.min).toBe(100);
    expect(clonedElements.dynamicData['1'].height.min).toBe(100);

    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'min');

    // result
    expect(clonedElements.allData['1'].height.min).toBe(undefined);
    expect(clonedElements.dynamicData['1'].height.min).toBe(undefined);
  });

  it(`should apply unit`, () => {
    // before
    applyTypeSize(clonedElements, '1', 100, 'height', 'unit');

    // result
    expect(clonedElements.allData['1'].height.unit).toBe(Unit.percentage);
    expect(clonedElements.allData['1'].height.value).toBe(100);
    expect(clonedElements.dynamicData['1'].height.unit).toBe(Unit.percentage);
    expect(clonedElements.dynamicData['1'].height.value).toBe(100);
  });
});
