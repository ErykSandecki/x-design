import { Meta, StoryFn } from '@storybook/react';

// components
import Button from '../Button';
import StoryComponent from '../../../../../stories/components/StoryComponent/StoryComponent';

// others
import { LIB_IMPORT_PATH } from '../../../../../stories/constants';

// types
import { ButtonColor, ButtonVariant } from '../enums';
import { TStoryBlockCode } from '../../../../../stories/components/StoryBlockCode/types';

const description = [
  '<code>Text buttons</code> are typically used for less-pronounced actions, including those located: in dialogs, in cards. In cards, text buttons help maintain an emphasis on card content.',
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
      attributes: [{ name: 'variant', value: 'ButtonVariant.text' }],
      children: 'Text',
    },
    {
      attributes: [
        { name: 'forcedHover', value: '' },
        { name: 'variant', value: 'ButtonVariant.text' },
      ],
      children: 'Forced Hover',
    },
    {
      attributes: [
        { name: 'disabled', value: '' },
        { name: 'variant', value: 'ButtonVariant.text' },
      ],
      children: 'Disabled',
    },
  ],
};

const title = 'Components/General/Button/Examples/Text Button';

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
    title="Text Button"
  >
    <Button {...args} variant={ButtonVariant.text}>
      Text
    </Button>
    <Button {...args} forcedHover variant={ButtonVariant.text}>
      Forced Hover
    </Button>
    <Button {...args} disabled variant={ButtonVariant.text}>
      Disabled
    </Button>
  </StoryComponent>
);

export const TextButton = Template.bind({});

TextButton.argTypes = {
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

TextButton.args = {
  color: ButtonColor.primary,
};
