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
  '<code>Contained buttons</code> are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.',
];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button }',
      path: LIB_IMPORT_PATH,
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

const title = 'Components/General/Button/Examples/Contained Button';

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
    title="Contained Button"
  >
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
