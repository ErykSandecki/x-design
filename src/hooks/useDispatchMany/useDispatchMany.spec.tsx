// hooks
import { useDispatchMany } from './useDispatchMany';

// types
import { TAction } from 'types/redux';

const mockDispatch = jest.fn();

const mockAction = (): TAction => ({
  payload: 'some payload',
  type: 'MOCK_TYPE',
});

const mockAction2 = (): TAction => ({
  payload: 'some payload 2',
  type: 'MOCK_TYPE2',
});

const mockAction3 = (): TAction => ({
  payload: 'some payload 3',
  type: 'MOCK_TYPE3',
});

jest.mock('react', () => ({
  useCallback: (args: any): any => args,
}));

jest.mock('react-redux', () => ({
  useDispatch: (): any => mockDispatch,
}));

describe('useDispatchMany', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  [
    [mockAction()],
    [mockAction(), mockAction2()],
    [mockAction(), mockAction2(), mockAction3()],
  ].forEach((actions) => {
    it(`call dispatch with actions count: ${actions.length}`, () => {
      // before
      const expectedToBeCalledTimes = actions.length;
      const dispatchMany = useDispatchMany();

      // action
      dispatchMany(...actions);

      // result
      expect(mockDispatch).toHaveBeenCalledTimes(expectedToBeCalledTimes);
    });

    it(`call dispatch with expected ${actions.length} given actions`, () => {
      // before
      const expectedActionsCalls = actions.map((action) => [action]);
      const dispatchMany = useDispatchMany();

      // action
      dispatchMany(...actions);

      // result
      expect(mockDispatch.mock.calls).toEqual(expectedActionsCalls);
    });
  });
});
