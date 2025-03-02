import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import ViewBox from './ViewBox';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_3D } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();

describe('ViewBox snapshots', () => {
  it('should render ViewBox', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ViewBox
          coordinates={BASE_3D}
          mouseMode={MouseMode.default}
          setCoordinates={mockCallBack}
          setMouseMode={mockCallBack}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
