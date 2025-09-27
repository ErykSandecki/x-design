import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnBackground from './ColumnBackground';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, TColor } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  rgbToHex: (): any => '#ffffff',
}));

describe('ColumnBackground snapshots', () => {
  it('should render ColumnBackground', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnBackground behaviors', () => {
  it('should change background visibility', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'eyes-opened'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1'].background.visible).toBe(false);
  });

  it('should change alpha', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // find
    const input = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'alpha');

    // action
    fireEvent.change(input, {
      target: { value: '50' },
    });
    fireEvent.blur(input);

    // result
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1'].background.properties as TColor).alpha,
    ).toBe('50');
  });

  it('should change color', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // find
    const input = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'color');

    // action
    fireEvent.change(input, {
      target: { value: 'ffffff' },
    });
    fireEvent.blur(input);

    // result
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1'].background.properties as TColor).color,
    ).toBe('#ffffff');
  });

  it('should change format', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
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
      (store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1'].background.properties as TColor).format,
    ).toBe('rgb');
  });

  it('should active color sampler', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.color));

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'sampler'));

    // result
    expect(store.getState()[PAGE_BUILDER].events.colorSampler).toBe(true);
  });

  it('should get color from sampler', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnBackground />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.color));

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'sampler'));

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.button, 'color-sampler'));

    // result
    expect(store.getState()[PAGE_BUILDER].events.colorSampler).toBe(false);
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements.allData['-1'].background.properties as TColor).color,
    ).toBe('#ffffff');
  });
});
