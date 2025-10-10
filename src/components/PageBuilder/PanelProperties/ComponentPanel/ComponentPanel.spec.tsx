import { Provider } from 'react-redux';

// components
import ComponentPanel from './ComponentPanel';

// mocks
import {
  childrenMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { Tab } from '../enums';

// utils
import { customRender } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
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
            children: [childrenMock],
          },
          [elementMock.id]: {
            ...elementMock,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('ComponentPanel snapshots', () => {
  it('should render ComponentPanel', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ComponentPanel activeTab={Tab.design} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render proptype section', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ComponentPanel activeTab={Tab.prototype} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
