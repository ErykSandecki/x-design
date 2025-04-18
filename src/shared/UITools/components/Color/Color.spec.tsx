import { render } from '@testing-library/react';

// components
import Color from './Color';

describe('FieldGroup snapshots', () => {
  it('should render FieldGroup', () => {
    // before
    const { asFragment } = render(<Color>children</Color>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
