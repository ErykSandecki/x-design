// utils
import { toggleElementScrollById } from '../toggleElementScrollById';

describe('toggleElementScrollById', () => {
  it('should set property for element', () => {
    // mock
    const element = document.createElement('div');
    const id = 'id';

    element.setAttribute('id', id);
    document.body.appendChild(element);

    // before
    toggleElementScrollById(id, 'hidden');

    // result
    expect(element.style.overflow).toBe('hidden');
  });

  it('should not set property for element', () => {
    // mock
    const element = document.createElement('div');
    const id = 'id';

    element.setAttribute('id', id);
    document.body.appendChild(element);

    // before
    toggleElementScrollById('', 'hidden');

    // result
    expect(element.style.overflow).toBe('');
  });
});
