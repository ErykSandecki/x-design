import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { Chip } from '../Chip';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/Chip';

export default {
  component: Chip,
  title,
} satisfies Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="Chip">
    <Chip>
      <p style={{ fontSize: '11px', margin: 0 }}>chip</p>
    </Chip>
  </StoryComponent>
);

export const UIToolsChip = Template.bind({});
