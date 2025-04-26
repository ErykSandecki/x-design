import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import ComponentPanel from './ComponentPanel';

// store
import { configureStore } from 'store/store';

// types
import { Tab } from '../../enums';

describe('ComponentPanel snapshots', () => {
  it('should render ComponentPanel', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ComponentPanel activeTab={Tab.design} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render proptype section', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ComponentPanel activeTab={Tab.prototype} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
