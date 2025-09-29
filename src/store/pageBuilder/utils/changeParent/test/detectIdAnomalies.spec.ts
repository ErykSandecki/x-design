// mocks
import { childrenMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { TSelectedElements } from '../../../types';

// utils
import { detectIdAnomalies } from '../detectIdAnomalies';

describe('detectIdAnomalies', () => {
  it('should return return some anomalies', () => {
    // before
    const result = detectIdAnomalies([childrenMock], [{ id: 'test-2' }] as TSelectedElements);

    // result
    expect(result).toBe(true);
  });

  it('should return not return any anomalies', () => {
    // before
    const result = detectIdAnomalies([childrenMock], [{ id: 'test-1' }] as TSelectedElements);

    // result
    expect(result).toBe(false);
  });
});
