import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { StoryComponent } from 'stories';
import { ToggleButtonGroup } from '../ToggleButtonGroup';

const description = [];

const title = 'UI Tools/ToggleButtonGroup';

export default {
  component: ToggleButtonGroup,
  title,
} satisfies Meta<typeof ToggleButtonGroup>;

const Template: StoryFn<typeof ToggleButtonGroup> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="ToggleButtonGroup">
    <ToggleButtonGroup
      e2eValue="e2eValue"
      toggleButtons={[
        { icon: 'AlignHorizontalCenter', value: '0' },
        { icon: 'AlignHorizontalLeft', value: '1' },
        { icon: 'AlignHorizontalRight', value: '2' },
      ]}
    />
  </StoryComponent>
);

export const UIToolsToggleButtonGroup = Template.bind({});
