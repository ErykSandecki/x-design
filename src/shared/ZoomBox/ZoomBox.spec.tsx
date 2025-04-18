import { fireEvent, render } from '@testing-library/react';
import { noop } from 'lodash';

// components
import ZoomBox from './ZoomBox';

// others
import { BASE_3D } from './constants';

// types
import { E2EAttribute, MouseButton } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();
const ref = { current: null };

describe('ZoomBox snapshots', () => {
  it('should render Zoombox', () => {
    //before
    const { asFragment } = render(
      <ZoomBox
        alpha="100"
        backgroundColor="#ffffff"
        backgroundVissible
        coordinates={BASE_3D}
        mouseMode={MouseMode.default}
        onMouseDown={mockCallBack}
        onMouseMove={mockCallBack}
        onMouseUp={mockCallBack}
        setCoordinates={noop}
        zoomBoxRef={ref}
      >
        children
      </ZoomBox>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when mouse mode is move & cursor state is pressing', () => {
    //before
    const { asFragment, container } = render(
      <ZoomBox
        alpha="100"
        backgroundColor="#ffffff"
        backgroundVissible
        coordinates={BASE_3D}
        mouseMode={MouseMode.move}
        onMouseDown={mockCallBack}
        onMouseMove={mockCallBack}
        onMouseUp={mockCallBack}
        setCoordinates={noop}
        zoomBoxRef={ref}
      >
        children
      </ZoomBox>,
    );

    // action
    fireEvent.mouseDown(
      getByE2EAttribute(container, E2EAttribute.box, 'zoom-box'),
      {
        buttons: MouseButton.lmb,
      },
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
