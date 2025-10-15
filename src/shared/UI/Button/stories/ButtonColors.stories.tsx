import { capitalize } from 'lodash';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';
import { StoryComponent, TStoryBlockCode } from 'stories';

// types
import { ButtonColor, ButtonVariant } from '../enums';

// utils
import { enumToArray } from 'utils';

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, ButtonColor }',
      path: 'shared',
    },
  ],
  props: [
    ...enumToArray<ButtonColor>(ButtonColor).map((color) => ({
      attributes: [{ name: 'color', value: `ButtonColor.${color}` }],
      children: capitalize(ButtonColor.secondary),
    })),
  ],
};

const title = 'UI/Button/Examples/Button Colors';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryComponent blocksCodeData={[blockCodeData]} title="Button Colors">
    {enumToArray<ButtonColor>(ButtonColor).map((color) => (
      <Button {...args} color={color} key={color}>
        {color}
      </Button>
    ))}
  </StoryComponent>
);

export const ButtonColors = Template.bind({});

ButtonColors.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  color: {
    table: {
      disable: true,
    },
  },
};

ButtonColors.args = {
  variant: ButtonVariant.text,
};
