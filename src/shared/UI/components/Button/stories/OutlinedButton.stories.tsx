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
  `<code>Outlined buttons</code> are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.`,
  `Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.`,
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
      attributes: [{ name: 'variant', value: 'ButtonVariant.outlined' }],
      children: 'Outlined',
    },
    {
      attributes: [
        { name: 'forcedHover', value: '' },
        { name: 'variant', value: 'ButtonVariant.outlined' },
      ],
      children: 'Forced Hover',
    },
    {
      attributes: [
        { name: 'disabled', value: '' },
        { name: 'variant', value: 'ButtonVariant.outlined' },
      ],
      children: 'Disabled',
    },
  ],
};

const title = 'Components/General/Button/Examples/Outlined Button';

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
    title="Outlined Button"
  >
    <Button {...args}>Outlined</Button>
    <Button {...args} forcedHover>
      Forced Hover
    </Button>
    <Button {...args} disabled>
      Disabled
    </Button>
  </StoryComponent>
);

export const OutlinedButton = Template.bind({});

OutlinedButton.argTypes = {
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

OutlinedButton.args = {
  color: ButtonColor.primary,
  variant: ButtonVariant.outlined,
};
