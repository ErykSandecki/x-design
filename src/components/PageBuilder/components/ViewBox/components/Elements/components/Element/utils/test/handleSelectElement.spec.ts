import { MouseEvent } from 'react';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { SELECT_ELEMENTS } from 'store/pageBuilder/actionsType';

// utils
import { handleSelectElement } from '../handleSelectElement';

const mockCallBack = jest.fn();

describe('handleSelectElement', () => {
  it(`should add element to selection`, () => {
    // before
    handleSelectElement(
      mockCallBack,
      { shiftKey: true } as MouseEvent,
      false,
      false,
      selectedElementMock,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual(
      selectedElementMock,
    );
  });

  it(`should remove element from selection`, () => {
    // before
    handleSelectElement(
      mockCallBack,
      { shiftKey: true } as MouseEvent,
      false,
      true,
      selectedElementMock,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toBe(selectedElementMock.id);
  });

  it(`should add element & ovverwrite selection`, () => {
    // before
    handleSelectElement(
      mockCallBack,
      { shiftKey: false } as MouseEvent,
      false,
      false,
      selectedElementMock,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].type).toBe(SELECT_ELEMENTS);
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      [selectedElementMock.id]: selectedElementMock,
    });
  });
});
