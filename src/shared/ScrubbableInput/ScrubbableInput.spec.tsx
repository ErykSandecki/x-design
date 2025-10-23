import { fireEvent } from '@testing-library/react';

// components
import ScrubbableInput from './ScrubbableInput';

// types
import { E2EAttribute } from 'types/e2e';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('ScrubbableInput snapshots', () => {
  it('should render ScrubbableInput', () => {
    // before
    const { asFragment } = customRender(
      <ScrubbableInput max={100} min={0} onChange={mockCallBack} value={0}>
        <span>child</span>
      </ScrubbableInput>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with icon', () => {
    // before
    const { asFragment, container } = customRender(
      <ScrubbableInput max={100} min={0} onChange={mockCallBack} value={0}>
        <span>child</span>
      </ScrubbableInput>,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.scrubbableInput));

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
