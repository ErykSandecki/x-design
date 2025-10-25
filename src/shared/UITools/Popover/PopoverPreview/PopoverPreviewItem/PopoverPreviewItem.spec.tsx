// components
import PopoverPreviewItem from './PopoverPreviewItem';
import PopoverRoot from '../../PopoverRoot/PopoverRoot';

// utils
import { customRender } from 'test';

const mockCallBack = jest.fn();

describe('PopoverPreviewItem snapshots', () => {
  it('should render PopoverPreviewItem', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot activeOption="activeOption" previewId="id" selected={false} setSelected={mockCallBack}>
        <PopoverPreviewItem id="id">{(activeOption) => activeOption}</PopoverPreviewItem>
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render when id is different', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot previewId="id" selected={false} setSelected={mockCallBack}>
        <PopoverPreviewItem id="">{(activeOption) => activeOption}</PopoverPreviewItem>
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
