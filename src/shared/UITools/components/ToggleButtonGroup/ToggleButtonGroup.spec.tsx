import { render } from '@testing-library/react';

// components
import ToggleButtonGroup from './ToggleButtonGroup';

// types
import { TToggleButton } from './types';

const toggleButtons: Array<TToggleButton<any>> = [
  { icon: 'AlignHorizontalCenter', value: '1' },
  { icon: 'AlignHorizontalCenter', value: '2' },
  { icon: 'AlignHorizontalCenter', value: '3' },
];

describe('ToggleButtonGroup snapshots', () => {
  it('should render ToggleButtonGroup', () => {
    // before
    const { asFragment } = render(<ToggleButtonGroup e2eValue="test" toggleButtons={toggleButtons} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
