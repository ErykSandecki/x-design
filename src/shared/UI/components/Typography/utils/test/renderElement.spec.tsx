// types
import { TypographyVariant } from '../../enums';

// utils
import { renderElement } from '../renderElement';

describe('renderElement', () => {
  it('should render a tag html', () => {
    // before
    const result = renderElement('children', null, { className: 'className', style: {} }, TypographyVariant.h1, {});

    // result
    expect(result.type).toBe('h1');
    expect(result.props.children).toBe('children');
  });

  it('should render a when string passed', () => {
    // before
    const result = renderElement('children', 'a', { className: 'className', style: {} }, TypographyVariant.h1, {});

    // result
    expect(result.type).toBe('a');
    expect(result.props.children).toBe('children');
  });

  it('should render a when a component passed', () => {
    // before
    const result = renderElement(
      'children',
      () => <b>children</b>,
      { className: 'className', style: {} },
      TypographyVariant.h1,
      {},
    );

    // result
    expect(result.type).toBe('b');
    expect(result.props.children).toBe('children');
  });
});
