import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import ResizeArea from './ResizeArea';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

describe('Corners snapshots', () => {
  it('should render Corners', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ResizeArea
          height={100}
          id={selectedElementMock.id}
          moseMode={MouseMode.default}
          width={100}
          x={100}
          y={100}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
