import { render } from '@testing-library/react';

// components
import Outline from './Outline';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

const overlayContainer = document.createElement('div');

describe('Outline snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(overlayContainer);
  });

  it('should render OverlayContainer', () => {
    // before
    const { asFragment } = render(
      <RefsProvider overlayContainerRefHtml={overlayContainer}>
        <Outline height={100} width={100} x={0} y={0} />
      </RefsProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
