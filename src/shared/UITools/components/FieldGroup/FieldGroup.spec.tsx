import { render } from '@testing-library/react';

// components
import FieldGroup from './FieldGroup';

describe('FieldGroup snapshots', () => {
  it('should render FieldGroup', () => {
    // before
    const { asFragment } = render(<FieldGroup>children</FieldGroup>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
