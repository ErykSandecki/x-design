import { Meta, StoryFn } from '@storybook/react';

// components
import Button from '../Button';
import StoryComponent from '../../../../../stories/components/StoryComponent/StoryComponent';

// others
import { LIB_IMPORT_PATH } from '../../../../../stories/constants';

// types
import { TStoryBlockCode } from '../../../../../stories/components/StoryBlockCode/types';

const description = [
  'All components accept an <code>onClick</code> handler that is applied to the root DOM element.',
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
      attributes: [{ name: 'onClick', value: `{() => alert('clicked')}` }],
      children: 'Click me',
    },
  ],
};

const title = 'Components/General/Button/Examples/Button Handling Clicks';

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

const Template: StoryFn<typeof Button> = ({ ...args }) => (
  <StoryComponent
    blocksCodeData={[blockCodeData]}
    description={description}
    title="Button Handling Clicks"
  >
    <Button {...args} onClick={() => alert('clicked')}>
      Click
    </Button>
  </StoryComponent>
);

export const ButtonHandlingClicks = Template.bind({});

ButtonHandlingClicks.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};

ButtonHandlingClicks.args = {};
