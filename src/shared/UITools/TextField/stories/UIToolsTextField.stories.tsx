import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { StoryComponent } from 'stories';
import { TextField } from '../TextField';

const description = [];

const title = 'UI Tools/TextField';

export default {
  component: TextField,
  title,
} satisfies Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="TextField">
    <TextField />
  </StoryComponent>
);

export const UIToolsTextField = Template.bind({});
