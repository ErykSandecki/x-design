import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { Color } from '../Color';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/Color';

export default {
  component: Color,
  title,
} satisfies Meta<typeof Color>;

const Template: StoryFn<typeof Color> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="Color">
    <Color alpha="1" color="#9c3636ff" />
  </StoryComponent>
);

export const UIToolsColor = Template.bind({});
