import { render } from '@testing-library/react';

// components
import Prompts from './Prompts';

// core
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

describe('Prompts snapshots', () => {
  it('should render Prompts', () => {
    // before
    const { asFragment } = render(
      <Prompts
        anchorPos={DropAnchorsPosition.bottom}
        displayNextPrompt
        displayPrevPrompt={false}
        isFlowVertical
        isGrid={false}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with another variant', () => {
    // before
    const { asFragment } = render(
      <Prompts
        anchorPos={DropAnchorsPosition.bottom}
        displayNextPrompt={false}
        displayPrevPrompt
        isFlowVertical={false}
        isGrid
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
