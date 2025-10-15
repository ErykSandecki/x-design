import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';
import { StoryComponent, TStoryBlockCode } from 'stories';

// types
import { ButtonColor, ButtonVariant } from '../enums';

const description = [
  'Sometimes you might want to have icons for certain buttons to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.',
];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, Icons }',
      path: 'shared',
    },
  ],
  props: [
    {
      attributes: [
        {
          name: 'startIcon',
          value: '{ name: "Check" }',
        },
      ],
      children: 'Button',
    },
    {
      attributes: [
        {
          name: 'endIcon',
          value: '{ name: "Check" }',
        },
      ],
      children: 'Button',
    },
  ],
};

const title = 'UI/Button/Examples/Button With Icon';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  const icon = 'Check';

  return (
    <StoryComponent blocksCodeData={[blockCodeData]} description={description} title="Button With Icon">
      <Button {...args} startIcon={icon} variant={ButtonVariant.contained}>
        Button
      </Button>
      <Button {...args} endIcon={icon} startIcon={icon} variant={ButtonVariant.contained}>
        Button
      </Button>
      <Button {...args} endIcon={icon} variant={ButtonVariant.outlined}>
        Button
      </Button>
    </StoryComponent>
  );
};

export const ButtonWithIcon = Template.bind({});

ButtonWithIcon.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  endIcon: {
    table: {
      disable: true,
    },
  },
  startIcon: {
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

ButtonWithIcon.args = {
  color: ButtonColor.primary,
};
