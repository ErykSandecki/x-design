// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { handleTrySelectElement } from '../handleTrySelectElement';

const mockCallBack = jest.fn();

describe('handleTrySelectElement', () => {
  it(`should try add element`, () => {
    // before
    handleTrySelectElement(
      mockCallBack,
      { shiftKey: false } as MouseEvent,
      false,
      true,
      true,
      selectedElementMock,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      [selectedElementMock.id]: selectedElementMock,
    });
  });

  it(`should not try add element`, () => {
    // before
    handleTrySelectElement(
      mockCallBack,
      { shiftKey: true } as MouseEvent,
      false,
      true,
      true,
      selectedElementMock,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
