import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import PanelProperties from './PanelProperties';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, MouseButton } from 'types';

// utils
import { getByE2EAttribute } from 'test';

describe('PanelProperties snapshots', () => {
  it('should render PanelProperties', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <PanelProperties />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with changed width', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment, container } = render(
      <Provider store={store}>
        <PanelProperties />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.resize), {
      buttons: MouseButton.lmb,
    });
    fireEvent.mouseMove(document, { clientX: 500 });

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
