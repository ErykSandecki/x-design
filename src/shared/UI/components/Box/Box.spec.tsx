import { render } from '@testing-library/react';

// components
import Box from './Box';

// types
import { E2EAttribute } from 'types/e2e';

// utils
import { getByE2EAttribute } from 'test/testHelpers';
import { getDataTestAttribute } from '../../../E2EDataAttributes/utils';

const className = 'className';

describe('Typography props', () => {
  it('should pass children', () => {
    // mock
    const children = 'children';

    //before
    const { container } = render(<Box>{children}</Box>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.box)).toHaveTextContent(
      children,
    );
  });

  it('should pass classes', () => {
    //before
    const { container } = render(<Box classes={{ className }}>children</Box>);

    // result
    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });

  it('should pass component', () => {
    // before
    const { container } = render(
      <Box classes={{ className }} component="a">
        children
      </Box>,
    );

    // result
    expect(container.querySelector(`.${className}`).tagName).toBe('A');
  });

  it('should pass e2eAttribute', () => {
    // before
    const { container } = render(
      <Box e2eAttribute={E2EAttribute.box}>children</Box>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.box)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.box),
    );
  });

  it('should pass e2eValue', () => {
    // mock
    const e2eValue = 'e2eValue';

    // before
    const { container } = render(<Box e2eValue={e2eValue}>children</Box>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.box)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.box),
      e2eValue,
    );
  });
});

describe('Box snapshots', () => {
  it('should render with some text', () => {
    // before
    const { asFragment } = render(<Box>Text</Box>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
