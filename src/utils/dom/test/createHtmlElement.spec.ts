// utils
import { createHtmlElement } from '../createHtmlElement';

describe('createHtmlElement', () => {
  it('Should create div element', () => {
    // before
    const result = createHtmlElement('div');

    // result
    expect(result.tagName).toBe('DIV');
  });

  it('Should create div element with attributes', () => {
    // before
    const result = createHtmlElement('div', { id: 'id' });

    // result
    expect(result.getAttribute('id')).toBe('id');
  });
});
