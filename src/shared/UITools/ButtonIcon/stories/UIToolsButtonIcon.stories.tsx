import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { ButtonIcon } from '../ButtonIcon';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/ButtonIcon';

export default {
  component: ButtonIcon,
  title,
} satisfies Meta<typeof ButtonIcon>;

const Template: StoryFn<typeof ButtonIcon> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="ButtonIcon">
    <ButtonIcon name="EyesClosed" />
  </StoryComponent>
);

export const UIToolsButtonIcon = Template.bind({});
