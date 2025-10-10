import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import Tabs from './Tabs';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';
import { TTab } from './types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();
const tabs: Array<TTab> = [
  {
    labelTranslationKey: 'label',
    name: 'name',
  },
];

describe('Tabs snapshots', () => {
  it('should render Tabs', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Tabs activeTab="name" setActiveTab={mockCallBack} tabs={tabs} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Tabs behaviors', () => {
  it('should change tab', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = render(
      <Provider store={store}>
        <Tabs activeTab="name" setActiveTab={mockCallBack} tabs={tabs} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.tab, 'name'));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('name');
  });
});
