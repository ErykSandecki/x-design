import { fireEvent, render } from '@testing-library/react';

// components
import Tooltip from './Tooltip';

// types
import { HTMLContainerId } from 'types';
import { TooltipPosition } from './enums';

// utils
import { createHtmlElement, enumToArray } from 'utils';
import { sleep } from 'test';

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  isJestRunning: (): any => false,
}));

const className = 'className';
const children = <div>?</div>;
const content = 'content';
const container = createHtmlElement('div', { id: HTMLContainerId.tooltip });

describe('Tooltip props', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(container);
  });

  it('should pass className', () => {
    // before
    const { container } = render(
      <Tooltip className={className} content={content}>
        {children}
      </Tooltip>,
    );

    // result
    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });
});

describe('Tooltip snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(container);
  });

  it('should change position after mouse wheel', () => {
    // before
    const { asFragment } = render(<Tooltip content={content}>{children}</Tooltip>);

    // action
    fireEvent.wheel(window);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with passed container id', () => {
    // before
    const { asFragment } = render(
      <Tooltip customId="containerForTeleportId" content={content}>
        {children}
      </Tooltip>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with diffrent positions', () => {
    enumToArray<TooltipPosition>(TooltipPosition).forEach((position) => {
      // before
      const { asFragment } = render(
        <Tooltip content={content} position={TooltipPosition[position]}>
          {children}
        </Tooltip>,
      );

      // action
      fireEvent.wheel(window);

      // result
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should set tooltip position vertical automatically after enter', async () => {
    // before
    const { asFragment, getByText } = render(
      <Tooltip autoPositioning content={content}>
        {children}
      </Tooltip>,
    );

    // action
    fireEvent.mouseEnter(getByText('?'), { clientX: 1024, clientY: 1024 });

    // wait
    await sleep(1100);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set tooltip position horizontal automatically after enter', () => {
    // before
    const { asFragment } = render(
      <Tooltip autoPositioning autoPositioningHorizontal content={content}>
        {children}
      </Tooltip>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should adjust correct placement', async () => {
    // before
    const { asFragment, getByText } = render(
      <Tooltip autoPositioning autoPositioningHorizontal autoPositioningCarrotPlacement="Start" content={content}>
        {children}
      </Tooltip>,
    );

    // action
    fireEvent.mouseEnter(getByText('?'), { clientX: 1024, clientY: 1024 });

    // wait
    await sleep(1100);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be visible after enter mouse & invisible after leave', async () => {
    // before
    const { asFragment, getByText } = render(<Tooltip content={content}>{children}</Tooltip>);

    // action
    fireEvent.mouseEnter(getByText('?'), { clientX: 1024, clientY: 1024 });

    // wait
    await sleep(1100);

    // action
    fireEvent.mouseLeave(getByText('?'), { clientX: 1024, clientY: 1024 });

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
