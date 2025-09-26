import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

// core
import { ContextProvider } from './ContextProvider';

// mocks
import { Sample1, Sample2 } from './mock/Sample';

// store
import { configureStore } from '../../store/store';

// types
import { Theme } from 'types/enums/theme';

const mockCallBack = jest.fn();
const stateMock = {};

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as object),
  useDispatch: () => (): any => {},
}));

describe('ContextProvider behaviors', () => {
  it('should have light mode', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ContextProvider>
          <Sample1 />
        </ContextProvider>
      </Provider>,
    );

    // result
    expect(container).toHaveTextContent(Theme.light);
  });

  it('should have dark mode after click', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container, getByText } = render(
      <Provider store={store}>
        <ContextProvider>
          <Sample1 />
        </ContextProvider>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    await waitFor(() => {
      expect(container.firstChild?.firstChild).toHaveTextContent(Theme.dark);
    });
  });

  it('should dipatch action to init theme', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { getByText } = render(
      <Provider store={store}>
        <ContextProvider actionOnChangeTheme={mockCallBack}>
          <Sample1 />
        </ContextProvider>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should have scroll lock false', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ContextProvider>
          <Sample2 />
        </ContextProvider>
      </Provider>,
    );

    // result
    expect(container).toHaveTextContent('false');
  });

  it('should enable scroll lock', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container, getByText } = render(
      <Provider store={store}>
        <ContextProvider>
          <Sample2 />
        </ContextProvider>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    await waitFor(() => {
      expect(container).toHaveTextContent('true');
    });
  });
});
