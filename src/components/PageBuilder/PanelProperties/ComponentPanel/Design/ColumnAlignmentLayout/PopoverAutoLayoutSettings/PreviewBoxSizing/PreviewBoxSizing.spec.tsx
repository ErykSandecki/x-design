// components
import PreviewBoxSizing from './PreviewBoxSizing';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverAutoLayoutSettings snapshots', () => {
  it('should render PreviewBoxSizing', () => {
    // before
    const { asFragment } = customRender(<PreviewBoxSizing activeOption="included" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when excluded', () => {
    // before
    const { asFragment } = customRender(<PreviewBoxSizing activeOption="excluded" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
