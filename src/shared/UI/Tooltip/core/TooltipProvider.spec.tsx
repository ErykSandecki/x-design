import { FC } from 'react';
import { fireEvent, render } from '@testing-library/react';

// core
import { TooltipProvider, useTooltip } from './TooltipProvider';

// utils
import { sleep } from 'test';

const Component: FC = () => {
  const { active, onMouseEnter, onMouseLeave } = useTooltip();

  return (
    <div id="test" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {active ? 'active' : 'disabled'}
    </div>
  );
};

describe('TooltipProvider snapshots', () => {
  it('should render TooltipProvider', () => {
    // before
    const { asFragment } = render(
      <TooltipProvider>
        <Component />
      </TooltipProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when active', async () => {
    // before
    const { asFragment } = render(
      <TooltipProvider timeoutEnter={0} timeoutLeave={0}>
        <Component />
      </TooltipProvider>,
    );

    // action
    fireEvent.mouseEnter(document.getElementById('test'));

    // wait
    await sleep(100);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when toggle active', async () => {
    // before
    const { asFragment } = render(
      <TooltipProvider timeoutEnter={0} timeoutLeave={0}>
        <Component />
      </TooltipProvider>,
    );

    // action
    fireEvent.mouseEnter(document.getElementById('test'));

    // wait
    await sleep(100);

    // action
    fireEvent.mouseLeave(document.getElementById('test'));

    // wait
    await sleep(100);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
