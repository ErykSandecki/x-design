import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementSizes } from '../useElementSizes';

// mocks
import {
  elementMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// utils
import { createHtmlElement } from 'utils';
import { getProviderWrapper } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

describe('useElementEvents', () => {
  beforeAll(() => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should return sizes from html`, () => {
    // mock
    const store = configureStore({
      ...pageBuilderStateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                height: {
                  ...elementMock.height,
                  max: { ...valueExtendMock, value: 100 },
                  min: { ...valueExtendMock, value: 100 },
                },
                padding: {
                  b: { value: 10 },
                  l: { value: 10 },
                  r: { value: 10 },
                  t: { value: 10 },
                },
                width: {
                  ...elementMock.width,
                  max: { ...valueExtendMock, value: 100 },
                  min: { ...valueExtendMock, value: 100 },
                },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useElementSizes(selectedElementMock.id), {
      wrapper: ({ children }) => {
        const Wrapper = getProviderWrapper(store);

        return (
          <Wrapper>
            <RefsProvider>{children}</RefsProvider>
          </Wrapper>
        );
      },
    });

    // result
    expect(result.current).toStrictEqual({
      cssHeight: '100px',
      cssWidth: '100px',
      height: 20,
      maxHeight: '100px',
      maxWidth: '100px',
      minHeight: '100px',
      minWidth: '100px',
      width: 20,
    });
  });

  it(`should return sizes from html when included`, () => {
    // mock
    const store = configureStore({
      ...pageBuilderStateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                height: {
                  ...elementMock.height,
                  max: { ...valueExtendMock, value: 100 },
                  min: { ...valueExtendMock, value: 100 },
                },
                layout: {
                  ...layoutMock,
                  boxSizing: 'included',
                },
                padding: {
                  b: { value: 10 },
                  l: { value: 10 },
                  r: { value: 10 },
                  t: { value: 10 },
                },
                width: {
                  ...elementMock.width,
                  max: { ...valueExtendMock, value: 100 },
                  min: { ...valueExtendMock, value: 100 },
                },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useElementSizes(selectedElementMock.id), {
      wrapper: ({ children }) => {
        const Wrapper = getProviderWrapper(store);

        return (
          <Wrapper>
            <RefsProvider>{children}</RefsProvider>
          </Wrapper>
        );
      },
    });

    // result
    expect(result.current).toStrictEqual({
      cssHeight: '100px',
      cssWidth: '100px',
      height: 0,
      maxHeight: '100px',
      maxWidth: '100px',
      minHeight: '100px',
      minWidth: '100px',
      width: 0,
    });
  });

  it(`should return sizes from store`, () => {
    // mock
    const store = configureStore({
      ...pageBuilderStateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                height: { value: 'auto' },
                width: { value: 'auto' },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useElementSizes(selectedElementMock.id), {
      wrapper: ({ children }) => {
        const Wrapper = getProviderWrapper(store);

        return (
          <Wrapper>
            <RefsProvider
              itemsRefs={{
                [elementMock.id]: createHtmlElement('div'),
              }}
            >
              {children}
            </RefsProvider>
          </Wrapper>
        );
      },
    });

    // result
    expect(result.current).toStrictEqual({
      cssHeight: 'auto',
      cssWidth: 'auto',
      height: 100,
      maxHeight: '',
      maxWidth: '',
      minHeight: '',
      minWidth: '',
      width: 100,
    });
  });
});
