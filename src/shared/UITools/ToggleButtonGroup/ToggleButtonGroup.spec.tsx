// components
import ToggleButtonGroup from './ToggleButtonGroup';

// types
import { TToggleButton } from './types';

// utils
import { customRender } from 'test';

const toggleButtons: Array<TToggleButton<any>> = [
  { icon: 'AlignHorizontalCenter', value: '1' },
  { icon: 'AlignHorizontalCenter', value: '2' },
  { icon: 'AlignHorizontalCenter', value: '3' },
];

describe('ToggleButtonGroup snapshots', () => {
  it('should render ToggleButtonGroup', () => {
    // before
    const { asFragment } = customRender(<ToggleButtonGroup e2eValue="test" toggleButtons={toggleButtons} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
