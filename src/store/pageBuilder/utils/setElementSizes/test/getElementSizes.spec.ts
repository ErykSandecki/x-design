// mocks
import { elementMock, sizeMock } from 'test/mocks/reducer/pageBuilderMock';

// others

// utils
import { getElementSizes } from '../getElementSizes';

describe('getElementSizes', () => {
  it(`should get element sizes{height}`, () => {
    // before
    const result = getElementSizes(elementMock, 'height', 200);

    // result
    expect(result).toStrictEqual({ height: { ...sizeMock, value: 200 }, width: { ...sizeMock, value: 100 } });
  });

  it(`should get element sizes{width}`, () => {
    // before
    const result = getElementSizes(elementMock, 'width', 200);

    // result
    expect(result).toStrictEqual({ height: { ...sizeMock, value: 100 }, width: { ...sizeMock, value: 200 } });
  });

  it(`should get element sizes{height} when aspect ratio`, () => {
    // before
    const result = getElementSizes({ ...elementMock, aspectRatio: true }, 'height', 200);

    // result
    expect(result).toStrictEqual({ height: { ...sizeMock, value: 200 }, width: { ...sizeMock, value: 200 } });
  });

  it(`should get element sizes{width} when aspect ratio`, () => {
    // before
    const result = getElementSizes({ ...elementMock, aspectRatio: true }, 'width', 200);

    // result
    expect(result).toStrictEqual({ height: { ...sizeMock, value: 200 }, width: { ...sizeMock, value: 200 } });
  });

  it(`should get element sizes when both values are zero`, () => {
    // before
    const result = getElementSizes(
      {
        ...elementMock,
        aspectRatio: true,
        height: { ...elementMock.height, value: 0 },
        width: { ...elementMock.width, value: 0 },
      },
      'width',
      0,
    );

    // result
    expect(result).toStrictEqual({ height: { ...sizeMock, value: 0 }, width: { ...sizeMock, value: 0 } });
  });
});
