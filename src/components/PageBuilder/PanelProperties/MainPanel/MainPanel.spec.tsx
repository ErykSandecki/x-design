import { Provider } from 'react-redux';

// components
import MainPanel from './MainPanel';

// store
import { configureStore } from 'store/store';

// types
import { Tab } from '../enums';

// utils
import { customRender } from 'test';

describe('MainPanel snapshots', () => {
  it('should render MainPanel', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <MainPanel activeTab={Tab.design} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render proptype section', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <MainPanel activeTab={Tab.prototype} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
