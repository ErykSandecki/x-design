// components
import Icon from './Icon';

// others
import { className as classNameIcon, classNames } from './classNames';

// types
import { ColorsTheme } from 'types';
import { E2EAttribute } from 'types/e2e';

// utils
import { customRender, getByE2EAttribute } from 'test/testHelpers';
import { getDataTestAttribute } from '../../E2EDataAttributes/utils';

const className = 'className';

describe('Typography props', () => {
  it('should pass clickable', () => {
    //before
    const { container } = customRender(<Icon clickable name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveClass(
      classNames[classNameIcon].modificators.clickable,
    );
  });

  it('should pass classes', () => {
    //before
    const { container } = customRender(<Icon classes={{ className }} name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });

  it('should pass color', () => {
    //before
    const { container } = customRender(<Icon color={ColorsTheme.blue1} name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveClass(
      classNames[classNameIcon].modificators.blue1,
    );
  });

  it('should pass disabled', () => {
    //before
    const { container } = customRender(<Icon disabled name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveClass(
      classNames[classNameIcon].modificators.disabled,
    );
  });

  it('should pass e2eAttribute', () => {
    // before
    const { container } = customRender(<Icon e2eAttribute={E2EAttribute.icon} name="StepBackwardOutlined" />);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.icon)).toHaveAttribute(getDataTestAttribute(E2EAttribute.icon));
  });

  it('should pass e2eValue', () => {
    // mock
    const e2eValue = 'e2eValue';

    // before
    const { container } = customRender(<Icon e2eValue={e2eValue} name="StepBackwardOutlined" />);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.icon)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.icon),
      e2eValue,
    );
  });

  it('should pass height', () => {
    //before
    const { container } = customRender(<Icon height={100} name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveAttribute('height', '100');
  });

  it('should pass name', () => {
    //before
    const { container } = customRender(<Icon name="StepBackwardOutlined" />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveAttribute(
      'name',
      'StepBackwardOutlined',
    );
  });

  it('should pass width', () => {
    //before
    const { container } = customRender(<Icon name="StepBackwardOutlined" width={100} />);

    // result
    expect(container.querySelector(`.${classNames[classNameIcon].name}`)).toHaveAttribute('width', '100');
  });
});

describe('Icon snapshots', () => {
  it('should render Icon', () => {
    // before
    const { asFragment } = customRender(<Icon name="StepBackwardOutlined" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
