import { render } from '@testing-library/react';

// components
import E2EDataAttribute from './E2EDataAttribute';
import { E2EAttribute } from 'types/e2e';

// types

describe('E2EDataAttribute snapshots', () => {
  it('should render E2EDataAttribute', () => {
    // before
    const { asFragment } = render(
      <E2EDataAttribute type={E2EAttribute.test1}>
        <span>child</span>
      </E2EDataAttribute>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with value', () => {
    // before
    const { asFragment } = render(
      <E2EDataAttribute type={E2EAttribute.test1} value="test-1">
        <span>child</span>
      </E2EDataAttribute>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with multiple types and values', () => {
    // before
    const { asFragment } = render(
      <E2EDataAttribute
        type={[E2EAttribute.test1, E2EAttribute.test2]}
        value={['test-1', 'test-2']}
      >
        <span>child</span>
      </E2EDataAttribute>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render without attribute id', () => {
    // before
    const { asFragment } = render(
      <E2EDataAttribute>
        <span>child</span>
      </E2EDataAttribute>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
