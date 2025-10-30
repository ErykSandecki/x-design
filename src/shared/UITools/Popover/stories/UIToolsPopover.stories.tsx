import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useRef } from 'react';

// components
import { Button } from '../../../UI/Button/Button';
import { Popover } from '../Popover';
import { Small } from '../../../UI/Typography';
import { StoryComponent } from 'stories';

// hooks
import { useOutsideClick } from 'hooks';

const description = [];

const title = 'UI Tools/Popover';

export default {
  component: Popover,
  title,
} satisfies Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = () => {
  const ref = useRef(null);
  const { selected, setSelected } = useOutsideClick([], ref);

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="Chip">
      <Button onClick={() => setSelected(!selected)} ref={ref}>
        Open
      </Button>
      <Popover refItem={ref} selected={selected}>
        <Small> Popover Menu</Small>
      </Popover>
    </StoryComponent>
  );
};

export const UIToolsPopover = Template.bind({});
