import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import MouseModes from './MouseModes';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('MouseModes snapshots', () => {
  it('should render MouseModes', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <MouseModes mouseMode={MouseMode.default} setMouseMode={mockCallBack} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('MouseModes behaviors', () => {
  it('should change mode', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = customRender(
      <Provider store={store}>
        <MouseModes mouseMode={MouseMode.default} setMouseMode={mockCallBack} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, MouseMode.comment));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.comment);
  });
});
