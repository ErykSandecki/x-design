import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import Design from './Design';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('Design snapshots', () => {
  it('should render Design', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Design behaviors', () => {
  it('should change background visibility', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.icon, 'EyesOpened'),
    );

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1']
        .background.visible,
    ).toBe(false);
  });

  it('should change alpha', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // find
    const input = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'alpha',
    );

    // action
    fireEvent.change(input, {
      target: { value: '50' },
    });
    fireEvent.blur(input);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1']
        .background.alpha,
    ).toBe('50');
  });

  it('should change color', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // find
    const input = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'color',
    );

    // action
    fireEvent.change(input, {
      target: { value: 'ffffff' },
    });
    fireEvent.blur(input);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1']
        .background.value,
    ).toBe('#ffffff');
  });

  it('should change format', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.color));

    // find
    const dropdown = await screen.findByRole('combobox');

    // action
    await fireEvent.mouseDown(dropdown);

    // find
    const rgbOption = await screen.findByText('RGB');

    // action
    fireEvent.click(rgbOption);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1']
        .background.format,
    ).toBe('rgb');
  });
});
