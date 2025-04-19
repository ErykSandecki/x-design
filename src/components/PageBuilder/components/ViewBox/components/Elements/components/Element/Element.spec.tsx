import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Element from './Element';

// mocks
import {
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements,
          dynamicData: {
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
        },
      },
    },
  },
};

describe('Element snapshots', () => {
  it('should render Element', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Element
          classes={{ className: 'className' }}
          id={selectedElementMock.id}
          mouseMode={MouseMode.default}
          parentId={selectedElementMock.parentId}
          type={ElementType.frame}
        >
          {() => <></>}
        </Element>
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
        <Element
          classes={{ className: 'className' }}
          id={selectedElementMock.id}
          mouseMode={MouseMode.default}
          parentId={selectedElementMock.parentId}
          type={ElementType.frame}
        >
          {() => <></>}
        </Element>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element when width & height is auto', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
            elements: {
              dynamicData: {
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  height: 'auto',
                  width: 'auto',
                },
              },
              staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Element
          classes={{ className: 'className' }}
          id={selectedElementMock.id}
          mouseMode={MouseMode.default}
          parentId={selectedElementMock.parentId}
          type={ElementType.frame}
        >
          {() => <></>}
        </Element>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
