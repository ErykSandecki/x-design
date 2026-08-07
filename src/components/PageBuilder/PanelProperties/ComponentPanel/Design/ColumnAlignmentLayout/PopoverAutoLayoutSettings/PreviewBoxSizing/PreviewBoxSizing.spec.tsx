// components
import PreviewBoxSizing from './PreviewBoxSizing';

// utils
import { customRender } from 'test';

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: vi.fn(),
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
