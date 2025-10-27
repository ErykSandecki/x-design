import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import GridArea from './GridArea';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

describe('GridArea snapshots', () => {
  it('should render GridArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <GridArea columns={1} rows={1} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when exceed 10x10', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <GridArea columns={100} rows={100} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wner popover selected', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <GridArea columns={1} rows={1} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.gridArea));

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
