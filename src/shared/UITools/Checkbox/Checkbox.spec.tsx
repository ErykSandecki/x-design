import { fireEvent } from '@testing-library/react';

// components
import Checkbox from './Checkbox';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('Checkbox snapshots', () => {
  it('should render Checkbox', () => {
    // before
    const { asFragment } = customRender(
      <Checkbox e2eValue="chip" label="label" onChange={mockCallBack} value={false} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when checked', () => {
    // before
    const { asFragment } = customRender(<Checkbox e2eValue="chip" label="label" onChange={mockCallBack} value />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Checkbox behaviors', () => {
  it('should toggle value', () => {
    // before
    const { container } = customRender(
      <Checkbox e2eValue="chip" label="label" onChange={mockCallBack} value={false} />,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.checkboxInput));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(true);
  });
});
