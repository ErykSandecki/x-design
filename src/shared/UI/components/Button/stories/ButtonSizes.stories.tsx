import { Meta, StoryFn } from '@storybook/react';

// components
import Button from '../Button';
import StoryComponent from '../../../../../stories/components/StoryComponent/StoryComponent';

// others
import { LIB_IMPORT_PATH } from '../../../../../stories/constants';

// types
import { ButtonColor, ButtonVariant } from '../enums';
import { ContentGridFlow } from '../../../../../stories/components/StoryComponent/enums';
import { InputSize } from '../../../enums';
import { TStoryBlockCode } from '../../../../../stories/components/StoryBlockCode/types';

// utils
import { enumToArray } from '../../../../../utils/transform/enumToArray';

const description = [
  'For larger or smaller buttons, use the <code>size</code> prop.',
];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, ButtonVariant }',
      path: LIB_IMPORT_PATH,
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

const title = 'Components/General/Button/Examples/Button Sizes';

export default {
  component: Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ktOFYcPoVgYOeB3knUlHvE/Desings?type=design&node-id=544-161&mode=design&t=g1VHDi2srZ6cK35T-0',
    },
  },
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
        <Button
          {...args}
          key={`${variant}-${size}`}
          size={size}
          variant={variant}
        >
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
