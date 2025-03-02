import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import ZoomBox from './ZoomBox';

// others
import { BASE_3D } from './constants';

const mockCallBack = jest.fn();
const ref = { current: null };

describe('ZoomBox snapshots', () => {
  it('should render Zoombox', () => {
    //before
    const { asFragment } = render(
      <ZoomBox
        coordinates={BASE_3D}
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
});
