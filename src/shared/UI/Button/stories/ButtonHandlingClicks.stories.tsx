import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';
import { StoryComponent, TStoryBlockCode } from 'stories';

const description = ['All components accept an <code>onClick</code> handler that is applied to the root DOM element.'];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button }',
      path: 'shared',
    },
  ],
  props: [
    {
      attributes: [{ name: 'onClick', value: `{() => alert('clicked')}` }],
      children: 'Click me',
    },
  ],
};

const title = 'UI/Button/Examples/Button Handling Clicks';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ ...args }) => (
  <StoryComponent blocksCodeData={[blockCodeData]} description={description} title="Button Handling Clicks">
    <Button {...args} onClick={() => alert('clicked')}>
      Click
    </Button>
  </StoryComponent>
);

export const ButtonHandlingClicks = Template.bind({});

ButtonHandlingClicks.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};

ButtonHandlingClicks.args = {};
