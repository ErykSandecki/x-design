import { Provider } from 'react-redux';
import { RefObject } from 'react';
import { render } from '@testing-library/react';

// components
import EventsArea from './EventsArea';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'types';

// utils
import { createHtmlElement } from 'utils';

const elementRef = {
  current: createHtmlElement('div'),
} as RefObject<HTMLDivElement>;
const overlayContainer = document.createElement('div');

describe('EventsArea snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(overlayContainer);
  });

  it('should render EventsArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <EventsArea
            absoluteCoordinates={BASE_2D}
            counterAngle={0}
            elementRef={elementRef}
            height={100}
            id="1"
            mouseMode={MouseMode.default}
            relativeCoordinates={BASE_2D}
            rotate={0}
            width={100}
          />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
