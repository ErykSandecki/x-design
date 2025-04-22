import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

// components
import Toolbar from './Toolbar';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('Toolbar snapshots', () => {
  it('should render Toolbar', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Toolbar mouseMode={MouseMode.default} setMouseMode={mockCallBack} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Toolbar behaviors', () => {
  it('should stop propagation on mouse down', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <div onMouseDown={mockCallBack}>
          <Toolbar mouseMode={MouseMode.default} setMouseMode={mockCallBack} />
        </div>
      </Provider>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(container, E2EAttribute.icon, MouseMode.comment),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
