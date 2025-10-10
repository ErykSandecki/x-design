import { fireEvent } from '@testing-library/react';
import { noop } from 'lodash';

// components
import Panel from './Panel';

// others
import { antColorPickerSliderContainerClassName } from './constants';

// types
import { E2EAttribute } from 'types/e2e';

// utils
import { customRender, getByE2EAttribute } from 'test/testHelpers';

const mockCallBack = jest.fn();

describe('Panel snapshots', () => {
  it('should render Panel', () => {
    // before
    const { asFragment } = customRender(
      <Panel activeSampler={false} onClickColorSampler={mockCallBack} onClickSampler={mockCallBack} setVisible={noop}>
        <div className={antColorPickerSliderContainerClassName}></div>
      </Panel>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with active sampler', () => {
    // before
    const { asFragment } = customRender(
      <Panel activeSampler onClickColorSampler={mockCallBack} onClickSampler={mockCallBack} setVisible={noop}>
        <div className={antColorPickerSliderContainerClassName}></div>
      </Panel>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Panel behaviors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should change visibility after click close icon', () => {
    // before
    const { container } = customRender(
      <Panel
        activeSampler={false}
        onClickColorSampler={mockCallBack}
        onClickSampler={mockCallBack}
        setVisible={mockCallBack}
      >
        children
      </Panel>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'close'));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should prevent key down', () => {
    // before
    const { container } = customRender(
      <div id="test" onKeyDown={mockCallBack}>
        <Panel activeSampler={false} onClickColorSampler={mockCallBack} onClickSampler={mockCallBack} setVisible={noop}>
          children
        </Panel>
        ,
      </div>,
    );

    // action
    fireEvent.keyDown(getByE2EAttribute(container, E2EAttribute.colorPickerPanel), {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
