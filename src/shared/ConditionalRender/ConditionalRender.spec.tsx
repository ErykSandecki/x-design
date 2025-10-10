import { render } from '@testing-library/react';

// components
import ConditionalRender from './ConditionalRender';

describe('ConditionalRender snapshots', () => {
  it('should render ConditionalRender', () => {
    // before
    const { asFragment } = render(<ConditionalRender component={<>Component</>} visible />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render not visible', () => {
    // before
    const { asFragment } = render(<ConditionalRender component={<>Component</>} visible={false} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
