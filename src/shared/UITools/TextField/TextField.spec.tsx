// components
import TextField from './TextField';

// utils
import { customRender } from 'test';

const id = 'id';

describe('TextField snapshots', () => {
  it('should render TextField', () => {
    // before
    const { asFragment } = customRender(<TextField />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with label', () => {
    // before
    const { asFragment } = customRender(<TextField idContainer={id} label="label" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
