// components
import GridInputs from './GridInputs';

// utils
import { customRender } from 'test';

describe('GridInputs snapshots', () => {
  it('should render GridInputs', () => {
    // before
    const { asFragment } = customRender(<GridInputs columns="1" rows="1" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
