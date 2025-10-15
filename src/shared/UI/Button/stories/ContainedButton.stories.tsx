import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';
import { StoryComponent, TStoryBlockCode } from 'stories';

// types
import { ButtonColor, ButtonVariant } from '../enums';

const description = [
  '<code>Contained buttons</code> are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.',
];

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
      children: 'Contained',
    },
    {
      attributes: [{ name: 'forcedHover', value: '' }],
      children: 'Forced Hover',
    },
    {
      attributes: [{ name: 'disabled', value: '' }],
      children: 'Disabled',
    },
  ],
};

const title = 'UI/Button/Examples/Contained Button';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryComponent blocksCodeData={[blockCodeData]} description={description} title="Contained Button">
    <Button {...args}>Contained</Button>
    <Button {...args} forcedHover>
      Forced Hover
    </Button>
    <Button {...args} disabled>
      Disabled
    </Button>
  </StoryComponent>
);

export const ContainedButton = Template.bind({});

ContainedButton.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  disabled: {
    table: {
      disable: true,
    },
  },
  forcedHover: {
    table: {
      disable: true,
    },
  },
  variant: {
    table: {
      disable: true,
    },
  },
};

ContainedButton.args = {
  color: ButtonColor.primary,
  variant: ButtonVariant.contained,
};
