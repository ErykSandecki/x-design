import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Typography from '../Typography';

// types
import { ContentGridFlow, StoryComponent, TStoryBlockCode } from 'stories';

const description = ['Use typography to present your design and content as clearly and efficiently as possible.'];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Typography',
  imports: [
    {
      items: '{ Typography, TYPOGRAPHY_COLORS_MODE }',
      path: 'shareed',
    },
  ],
  props: [
    {
      children: 'text',
    },
  ],
};

const title = 'UI/Typography/Basic Typography';

export default {
  component: Typography,
  title,
} satisfies Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = ({ ...args }) => (
  <StoryComponent
    blocksCodeData={[blockCodeData]}
    contentGridFlow={ContentGridFlow.row}
    description={description}
    title="Typography"
  >
    <Typography {...args} />
  </StoryComponent>
);

export const BasicTypography = Template;

BasicTypography.argTypes = {};

BasicTypography.args = {
  children: 'text',
};
