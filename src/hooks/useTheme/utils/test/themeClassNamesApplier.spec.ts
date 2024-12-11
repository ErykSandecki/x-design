// types
import { Theme } from '../../../../types/enums';

// utils
import { themeClassNamesApplier } from '../themeClassNamesApplier';

describe('themeClassNamesApplier', () => {
  it('should return set of classNames for light mode', () => {
    // mock
    const className = 'className';

    const styles = {
      [className]: className,
      [`${className}--${Theme.light}`]: `${className}--${Theme.light}`,
    };

    const themeModificator = {
      name: className,
      [Theme.light]: `${className}--${Theme.light}`,
    };

    // before
    const result = themeClassNamesApplier(styles, Theme.light)(
      className,
      themeModificator,
      themeModificator,
    );

    // result
    expect(result).toBe(
      [
        className,
        className,
        `${className}--${Theme.light}`,
        className,
        `${className}--${Theme.light}`,
      ].join(' '),
    );
  });

  it('should return set of classNames for dark mode', () => {
    // mock
    const className = 'className';

    const styles = {
      [className]: className,
      [`${className}--${Theme.dark}`]: `${className}--${Theme.dark}`,
    };

    const themeModificator = {
      name: className,
      [Theme.dark]: `${className}--${Theme.dark}`,
    };

    // before
    const result = themeClassNamesApplier(styles, Theme.dark)(
      className,
      themeModificator,
      themeModificator,
    );

    // result
    expect(result).toBe(
      [
        className,
        className,
        `${className}--${Theme.dark}`,
        className,
        `${className}--${Theme.dark}`,
      ].join(' '),
    );
  });

  it('should return set of classNames for with condition', () => {
    // mock
    const className = 'className';

    const styles = {
      [className]: className,
      [`${className}--${Theme.dark}`]: `${className}--${Theme.dark}`,
    };

    const themeModificator = {
      name: className,
      [Theme.dark]: `${className}--${Theme.dark}`,
    };

    // before
    const result = themeClassNamesApplier(
      styles,
      Theme.dark,
    )([themeModificator, true]);

    // result
    expect(result).toBe([className, `${className}--${Theme.dark}`].join(' '));
  });

  it('should return set of classNames for with condition', () => {
    // mock
    const className = 'className';

    const styles = {
      [className]: className,
      [`${className}--${Theme.dark}`]: `${className}--${Theme.dark}`,
    };

    const themeModificator = {
      name: className,
      [Theme.dark]: `${className}--${Theme.dark}`,
    };

    // before
    const result = themeClassNamesApplier(
      styles,
      Theme.dark,
    )([themeModificator, false]);

    // result
    expect(result).toBe([''].join(' '));
  });

  it('should return set of classNames for with condition', () => {
    // mock
    const className = 'className';

    const styles = {};

    // before
    const result = themeClassNamesApplier(
      styles,
      Theme.dark,
    )([className, true]);

    // result
    expect(result).toBe([className].join(' '));
  });

  it('should return set of classNames for with condition', () => {
    // mock
    const className = 'className';

    const styles = {};

    // before
    const result = themeClassNamesApplier(
      styles,
      Theme.dark,
    )([className, false]);

    // result
    expect(result).toBe([''].join(' '));
  });
});
