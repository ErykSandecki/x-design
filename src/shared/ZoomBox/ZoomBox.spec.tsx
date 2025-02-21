import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import ZoomBox from './ZoomBox';

// others
import { INITIAL_COORDINATES } from './constants';

describe('ZoomBox snapshots', () => {
  it('should render empty', () => {
    //before
    const { asFragment } = render(
      <ZoomBox coordinates={INITIAL_COORDINATES} setCoordinates={noop}>
        children
      </ZoomBox>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
