import { fireEvent } from '@testing-library/react';
import { noop } from 'lodash';

// components
import GridInputs from './GridInputs';

// types
import { E2EAttribute, KeyboardKeys } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('GridInputs snapshots', () => {
  it('should render GridInputs', () => {
    // before
    const { asFragment } = customRender(
      <GridInputs
        columns="1"
        onBlurColumns={noop}
        onBlurRows={noop}
        onChangeColumns={noop}
        onChangeRows={noop}
        rows="1"
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('GridInputs behaviors', () => {
  it('should change columns & rows when enter value on input', () => {
    // before
    const { container } = customRender(
      <GridInputs
        columns="1"
        onBlurColumns={mockCallBack}
        onBlurRows={mockCallBack}
        onChangeColumns={mockCallBack}
        onChangeRows={mockCallBack}
        rows="1"
      />,
    );

    // find
    const inputColumns = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'columns');
    const inputRows = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'rows');

    // action
    fireEvent.click(inputColumns);
    fireEvent.change(inputColumns, { target: { value: '100' } });
    fireEvent.keyDown(inputColumns, { key: KeyboardKeys.enter });
    fireEvent.blur(inputColumns);
    fireEvent.click(inputRows);
    fireEvent.change(inputRows, { target: { value: '100' } });
    fireEvent.keyDown(inputRows, { key: KeyboardKeys.enter });
    fireEvent.blur(inputRows);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0]._reactName).toBe('onBlur');
    expect(mockCallBack.mock.calls[2][0]).toBe('100');
    expect(mockCallBack.mock.calls[3][0]._reactName).toBe('onBlur');
  });

  it('should change columns & rows when triger ScrubbableInput', () => {
    // mock
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
      view: window,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: 200 });

    // before
    const { container } = customRender(
      <GridInputs
        columns="1"
        onBlurColumns={mockCallBack}
        onBlurRows={mockCallBack}
        onChangeColumns={mockCallBack}
        onChangeRows={mockCallBack}
        rows="1"
      />,
    );

    // find
    const scrubbableInputColumns = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'columns');
    const scrubbableInputRows = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'rows');

    // action
    fireEvent.mouseDown(scrubbableInputColumns, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputColumns);
    fireEvent.mouseDown(scrubbableInputRows, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputRows);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[2][0]).toBe('100');
  });
});
