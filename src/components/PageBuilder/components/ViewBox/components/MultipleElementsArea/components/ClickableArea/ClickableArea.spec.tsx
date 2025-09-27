import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ClickableArea from './ClickableArea';

// mocks
import 'test/mocks/sagas/allSagas';

// others
import { BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { E2EAttribute, MouseButton } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('ClickableArea snapshots', () => {
  it('should render ClickableArea', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ClickableArea elementsCordinates={[{ coordinates: BASE_RECT, id: '1' }]} outlineCoordinates={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render when isMultipleMoving', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          isMultipleMoving: true,
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ClickableArea elementsCordinates={[{ coordinates: BASE_RECT, id: '1' }]} outlineCoordinates={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ClickableArea behaviors', () => {
  it('should click outline area', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ClickableArea elementsCordinates={[{ coordinates: BASE_RECT, id: '1' }]} outlineCoordinates={BASE_RECT} />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.outline).firstChild, {
      buttons: MouseButton.lmb,
    });

    // result
    expect(store.getState()[PAGE_BUILDER].events).toStrictEqual({
      ...eventsMock,
      isMultipleMoving: true,
    });
  });

  it('should click rect', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ClickableArea elementsCordinates={[{ coordinates: BASE_RECT, id: '1' }]} outlineCoordinates={BASE_RECT} />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.rect, '1').firstChild, {
      buttons: MouseButton.lmb,
    });

    // result
    expect(store.getState()[PAGE_BUILDER].events).toStrictEqual({
      ...eventsMock,
      isMultipleMoving: true,
    });
  });
});
