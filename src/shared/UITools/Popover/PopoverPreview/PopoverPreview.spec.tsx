// components
import PopoverPreview from './PopoverPreview';
import PopoverRoot from '../PopoverRoot/PopoverRoot';

// utils
import { customRender } from 'test';

const mockCallBack = jest.fn();

describe('PopoverPreview snapshots', () => {
  it('should render PopoverPreview', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot selected={false} setSelected={mockCallBack}>
        <PopoverPreview />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when active preview', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot previewId="previewId" selected={false} setSelected={mockCallBack}>
        <PopoverPreview />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
