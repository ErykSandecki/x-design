import { fireEvent } from '@testing-library/react';

// components
import Select from './Select';
import SelectItem from './SelectItem/SelectItem';

// types
import { E2EAttribute, HTMLContainerId } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';
import { createHtmlElement } from 'utils';

const dropdownContainer = createHtmlElement('div', { id: HTMLContainerId.dropdown });
const mockCallBack = jest.fn();

describe('Select snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(dropdownContainer);
  });

  it('should render Select', () => {
    // before
    const { asFragment } = customRender(
      <Select onChange={mockCallBack} value="0">
        <SelectItem value="0">0</SelectItem>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
      </Select>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when mixed', () => {
    // before
    const { asFragment } = customRender(
      <Select isMixed onChange={mockCallBack} value="0">
        <SelectItem value="0">0</SelectItem>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
      </Select>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with no options', () => {
    // before
    const { asFragment } = customRender(<Select onChange={mockCallBack} value="0" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with one option', () => {
    // before
    const { asFragment } = customRender(
      <Select onChange={mockCallBack} value="0">
        <SelectItem value="0">0</SelectItem>
      </Select>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Select behaviors', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(dropdownContainer);
  });

  it('should change value', () => {
    // before
    const { container } = customRender(
      <Select onChange={mockCallBack} value="0">
        <SelectItem value="0">0</SelectItem>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
      </Select>,
    );

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select);
    const selectOptions = getByE2EAttribute(select, E2EAttribute.selectOptions);
    const selectItem = getByE2EAttribute(selectOptions, E2EAttribute.selectItem, 2);

    // action
    fireEvent.click(select);
    fireEvent.click(selectItem);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('2');
  });
});
