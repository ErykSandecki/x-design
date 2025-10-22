import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import AlignmentArea from './AlignmentArea';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { AlignmentLayout, E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('AlignmentArea snapshots', () => {
  it('should render AlignmentArea', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <AlignmentArea onClick={mockCallBack} value={AlignmentLayout.bottomCenter} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('AlignmentArea behaviors', () => {
  it('should trigger change alignment', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = customRender(
      <Provider store={store}>
        <AlignmentArea onClick={mockCallBack} value={AlignmentLayout.bottomCenter} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.alignmentAreaOption, AlignmentLayout.bottomLeft));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(AlignmentLayout.bottomLeft);
  });
});
