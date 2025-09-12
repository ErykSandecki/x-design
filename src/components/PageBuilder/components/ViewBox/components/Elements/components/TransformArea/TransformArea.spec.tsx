import { fireEvent, render } from '@testing-library/react';
import { kebabCase } from 'lodash';
import { Provider } from 'react-redux';

// components
import TransformArea from './TransformArea';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('TransformArea snapshots', () => {
  it('should render TransformArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <TransformArea
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TransformArea behaviors', () => {
  it('should triiger mouse down event', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <TransformArea
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(container, E2EAttribute.anchor, kebabCase(Anchor.east)),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
