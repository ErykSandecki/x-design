import { Meta, StoryFn } from '@storybook/react';

// components
import Button from '../Button';
import Icons from '../../Icon/components';
import StoryComponent from '../../../../../stories/components/StoryComponent/StoryComponent';

// others
import { LIB_IMPORT_PATH } from '../../../../../stories/constants';

// types
import { ButtonColor, ButtonVariant } from '../enums';
import { IconName } from '../../Icon/icons';
import { TStoryBlockCode } from '../../../../../stories/components/StoryBlockCode/types';

const description = [
  'Sometimes you might want to have icons for certain buttons to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.',
];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, Icons }',
      path: LIB_IMPORT_PATH,
    },
  ],
  props: [
    {
      attributes: [
        {
          name: 'startIcon',
          value: '{ applyFill: true, iconComponent: Icons.IconUpOutlined }',
        },
      ],
      children: 'Button',
    },
    {
      attributes: [
        {
          name: 'endIcon',
          value: '{ applyFill: true, iconComponent: Icons.IconUpOutlined }',
        },
      ],
      children: 'Button',
    },
  ],
};

const title = 'Components/General/Button/Examples/Button With Icon';

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

const Template: StoryFn<typeof Button> = (args) => {
  const icon = {
    applyFill: true,
    iconComponent: Icons.IconUpOutlined,
    iconName: IconName.upOutlined,
  };

  return (
    <StoryComponent
      blocksCodeData={[blockCodeData]}
      description={description}
      title="Button With Icon"
    >
      <Button {...args} startIcon={icon} variant={ButtonVariant.contained}>
        Button
      </Button>
      <Button
        {...args}
        endIcon={icon}
        startIcon={icon}
        variant={ButtonVariant.contained}
      >
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
