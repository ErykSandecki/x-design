import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import TransformArea from './TransformArea';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

describe('TransformArea snapshots', () => {
  it('should render TransformArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <TransformArea
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
