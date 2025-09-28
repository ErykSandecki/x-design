// utils
import { mappingFlex } from '../mappingFlex';

describe('mappingFlex', () => {
  it('should return flex styles', () => {
    // before
    const result = mappingFlex({
      alignContent: 'baseline',
      alignItems: 'baseline',
      alignSelf: 'auto',
      flex: 0,
      flexDirection: 'column',
      flexGrow: 'inherit',
      flexShrink: 'inherit',
      flexWrap: 'inherit',
      justifyContent: 'center',
      order: 'inherit',
    });

    // result
    expect(result).toBe(
      `align-content: baseline;\nalign-items: baseline;\nalign-self: auto;\nflex: 0;\nflex-direction: column;\nflex-grow: inherit;\nflex-shrink: inherit;\nflex-wrap: inherit;\njustify-content: center;\norder: inherit;`,
    );
  });

  it('should return empty data', () => {
    // before
    const result = mappingFlex({});

    // result
    expect(result).toBe('');
  });
});
