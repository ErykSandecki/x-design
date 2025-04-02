import { capitalize } from 'lodash';
import { Meta, StoryFn } from '@storybook/react';

// components
import Button from '../Button';
import StoryComponent from '../../../../../stories/components/StoryComponent/StoryComponent';

// others
import { LIB_IMPORT_PATH } from '../../../../../stories/constants';

// types
import { ButtonColor, ButtonVariant } from '../enums';
import { TStoryBlockCode } from '../../../../../stories/components/StoryBlockCode/types';

// utils
import { enumToArray } from '../../../../../utils/transform/enumToArray';

const description = [
  'The <code>Button</code> comes with three variants: text, contained, and outlined.',
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
    {
      attributes: [{ name: 'variant', value: 'Variant.text' }],
      children: capitalize(ButtonVariant.text),
    },
    {
      children: capitalize(ButtonVariant.contained),
    },
    {
      attributes: [{ name: 'variant', value: 'Variant.outlined' }],
      children: capitalize(ButtonVariant.outlined),
    },
  ],
};

const title = 'Components/General/Button/Basic Button';

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
    description={description}
    title="Basic Button"
  >
    {enumToArray<ButtonVariant>(ButtonVariant).map((variant) => (
      <Button {...args} key={variant} variant={ButtonVariant[variant]}>
        {capitalize(variant)}
      </Button>
    ))}
  </StoryComponent>
);

export const BasicButton = Template.bind({});

BasicButton.argTypes = {
  children: {
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

BasicButton.args = {
  color: ButtonColor.primary,
};
