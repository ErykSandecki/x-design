// mocks
import { backgroundMock, elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isMixedBackgroundSelector } from '../../selectors';

describe('isMixedBackgroundSelector', () => {
  it('should not be mixed', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: elementMock,
          ['test-2']: { ...elementMock, id: 'test-2' },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(false);
  });

  it('should be mixed when list is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: elementMock,
          ['test-2']: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]], id: 'test-2' },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should be mixed when alpha is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]] },
          ['test-2']: {
            ...elementMock,
            background: [
              backgroundMock[0],
              {
                ...backgroundMock[0],
                properties: {
                  ...backgroundMock[0].properties,
                  alpha: 0,
                },
              },
            ],
            id: 'test-2',
          },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should be mixed when color is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]] },
          ['test-2']: {
            ...elementMock,
            background: [
              backgroundMock[0],
              {
                ...backgroundMock[0],
                properties: {
                  ...backgroundMock[0].properties,
                  color: '#000000',
                },
              },
            ],
            id: 'test-2',
          },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should be mixed when format is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]] },
          ['test-2']: {
            ...elementMock,
            background: [
              backgroundMock[0],
              {
                ...backgroundMock[0],
                properties: {
                  ...backgroundMock[0].properties,
                  format: 'rgb',
                },
              },
            ],
            id: 'test-2',
          },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should be mixed when mode is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]] },
          ['test-2']: {
            ...elementMock,
            background: [
              backgroundMock[0],
              {
                ...backgroundMock[0],
                properties: {
                  ...backgroundMock[0].properties,
                  mode: 'variable',
                },
              },
            ],
            id: 'test-2',
          },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });

  it('should be mixed when visible is different', () => {
    // before
    const selectorFunction = (isMixedBackgroundSelector as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: { ...elementMock, background: [backgroundMock[0], backgroundMock[0]] },
          ['test-2']: {
            ...elementMock,
            background: [
              backgroundMock[0],
              {
                ...backgroundMock[0],
                visible: false,
              },
            ],
            id: 'test-2',
          },
        },
        selectedElementMock.id,
        [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      ),
    ).toBe(true);
  });
});
