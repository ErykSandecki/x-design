import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Element from './Element';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import { elementMock, eventsMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

const element = document.createElement('div');
const overlayContainer = document.createElement('div');

const sharedRefs = {
  [elementMock.id]: element,
};

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements,
          [elementMock.id]: elementMock,
        },
      },
    },
  },
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('Element snapshots', () => {
  beforeAll(() => {
    element.style.height = '100px';
    element.style.width = '100px';
    document.body.appendChild(overlayContainer);
  });

  it('should render Element', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Element
            classes={{ className: 'className' }}
            id={selectedElementMock.id}
            index={0}
            mouseMode={MouseMode.default}
            parentId={selectedElementMock.parentId}
            type={ElementType.frame}
          >
            {() => <></>}
          </Element>
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element when is selected', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Element
            classes={{ className: 'className' }}
            id={selectedElementMock.id}
            index={0}
            mouseMode={MouseMode.default}
            parentId={selectedElementMock.parentId}
            type={ElementType.frame}
          >
            {() => <></>}
          </Element>
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element when width & height is auto', () => {
    // mock
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              [elementMock.id]: {
                ...elementMock,
                height: { value: 'auto' },
                width: { value: 'auto' },
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Element
            classes={{ className: 'className' }}
            id={selectedElementMock.id}
            index={0}
            mouseMode={MouseMode.default}
            parentId={selectedElementMock.parentId}
            type={ElementType.frame}
          >
            {() => <></>}
          </Element>
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element when is selected & is multiple moving', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          isMultipleMoving: true,
        },
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Element
            classes={{ className: 'className' }}
            id={selectedElementMock.id}
            index={0}
            mouseMode={MouseMode.default}
            parentId={selectedElementMock.parentId}
            type={ElementType.frame}
          >
            {() => <></>}
          </Element>
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
