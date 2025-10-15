import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';

// types
import { ButtonColor, ButtonVariant } from '../enums';
import { ContentGridFlow, StoryComponent, TStoryBlockCode } from 'stories';
import { InputSize } from 'shared';

// utils
import { enumToArray } from 'utils';

const description = ['For larger or smaller buttons, use the <code>size</code> prop.'];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, ButtonVariant }',
      path: 'shared',
    },
  ],
  props: [
    ...enumToArray<InputSize>(InputSize).map((size) => ({
      attributes: [
        { name: 'size', value: `InputSize.${size}` },
        { name: 'variant', value: 'Variant.text' },
      ],
      children: size,
    })),
    ...enumToArray<InputSize>(InputSize).map((size) => ({
      attributes: [{ name: 'size', value: `InputSize.${size}` }],
      children: size,
    })),
    ...enumToArray<InputSize>(InputSize).map((size) => ({
      attributes: [
        { name: 'size', value: `InputSize.${size}` },
        { name: 'variant', value: 'Variant.outlined' },
      ],
      children: size,
    })),
  ],
};

const title = 'UI/Button/Examples/Button Sizes';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryComponent
    blocksCodeData={[blockCodeData]}
    contentGridFlow={ContentGridFlow.maxThreeColumns}
    description={description}
    title="Button Size"
  >
    {enumToArray<ButtonVariant>(ButtonVariant).map((variant) =>
      enumToArray<InputSize>(InputSize).map((size) => (
        <Button {...args} key={`${variant}-${size}`} size={size} variant={variant}>
          {size}
        </Button>
      )),
    )}
  </StoryComponent>
);

export const ButtonSizes = Template.bind({});

ButtonSizes.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  size: {
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

ButtonSizes.args = {
  color: ButtonColor.primary,
};
