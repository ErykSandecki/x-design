import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import MoveableElement from './MoveableElement';

// mocks
import {
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    elements: {
      dynamicData: {
        [elementDynamicDataMock.id]: elementDynamicDataMock,
      },
      staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
    },
  },
};

describe('MoveableElement snapshots', () => {
  it('should render MoveableElement', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <MoveableElement
          classes={{ className: 'className' }}
          id={elementDynamicDataMock.id}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
          type={ElementType.frame}
        >
          {() => <></>}
        </MoveableElement>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
