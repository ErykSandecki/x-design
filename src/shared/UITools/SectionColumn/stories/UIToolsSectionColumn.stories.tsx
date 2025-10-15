import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { SectionColumn } from '../SectionColumn';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/SectionColumn';

export default {
  component: SectionColumn,
  title,
} satisfies Meta<typeof SectionColumn>;

const Template: StoryFn<typeof SectionColumn> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="SectionColumn">
    <SectionColumn>
      <p style={{ fontSize: '11px', margin: 0 }}>SectionColumn</p>
    </SectionColumn>
  </StoryComponent>
);

export const UIToolsSectionColumn = Template.bind({});
