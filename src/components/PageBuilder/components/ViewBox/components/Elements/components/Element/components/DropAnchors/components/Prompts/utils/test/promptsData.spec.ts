// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

// utils
import { promptsData } from '../promptsData';

describe('promptsData', () => {
  it('should return data for bottom', () => {
    // before
    const result = promptsData(DropAnchorsPosition.bottom, true, false, true, false);

    // result
    expect(result).toStrictEqual([
      { key: 'bottom', visible: true },
      { key: 'left', visible: false },
      { key: 'right', visible: false },
      { key: 'top', visible: false },
    ]);
  });

  it('should return data for left', () => {
    // before
    const result = promptsData(DropAnchorsPosition.left, false, true, false, false);

    // result
    expect(result).toStrictEqual([
      { key: 'bottom', visible: false },
      { key: 'left', visible: true },
      { key: 'right', visible: false },
      { key: 'top', visible: false },
    ]);
  });

  it('should return data for right', () => {
    // before
    const result = promptsData(DropAnchorsPosition.right, true, false, false, false);

    // result
    expect(result).toStrictEqual([
      { key: 'bottom', visible: false },
      { key: 'left', visible: false },
      { key: 'right', visible: true },
      { key: 'top', visible: false },
    ]);
  });

  it('should return data for top', () => {
    // before
    const result = promptsData(DropAnchorsPosition.top, false, true, true, false);

    // result
    expect(result).toStrictEqual([
      { key: 'bottom', visible: false },
      { key: 'left', visible: false },
      { key: 'right', visible: false },
      { key: 'top', visible: true },
    ]);
  });
});
