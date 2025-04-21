import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import ElementArea from './ElementArea';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';

// store
import { configureStore } from 'store/store';

const overlayContainer = document.createElement('div');

describe('ElementArea snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(overlayContainer);
  });

  it('should render ElementArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <ElementArea elementArea={{ ...BASE_RECT, x2: 100, y2: 100 }} />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with label when x2 i y2 is less than rest cords', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <ElementArea elementArea={{ ...BASE_RECT, x2: -100, y2: -100 }} />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render ElementArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <ElementArea elementArea={null} />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
