import { render } from '@testing-library/react';

// components
import OverlayContainer from './OverlayContainer';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

const overlayContainer = document.createElement('div');

describe('OverlayContainer snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(overlayContainer);
  });

  it('should render OverlayContainer', () => {
    // before
    const { asFragment } = render(
      <RefsProvider overlayContainerRefHtml={overlayContainer}>
        <OverlayContainer />
      </RefsProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
