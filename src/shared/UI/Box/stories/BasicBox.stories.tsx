import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { Box } from '../Box';
import { StoryComponent, TStoryBlockCode } from 'stories';

const description = [
  'The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.',
];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Box',
  imports: [
    {
      items: '{ Box }',
      path: 'shared',
    },
  ],
  props: [
    {
      children: 'This Box renders as an HTML section element',
    },
  ],
};

const title = 'UI/Box/Basic Box';

export default {
  component: Box,
  title,
} satisfies Meta<typeof Box>;

const Template: StoryFn<typeof Box> = () => (
  <StoryComponent blocksCodeData={[blockCodeData]} description={description} title="Basic Box">
    <Box>This Box renders as an HTML section element</Box>
  </StoryComponent>
);

export const BasicBox = Template.bind({});
