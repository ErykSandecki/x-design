import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { Section } from '../Section';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/Section';

export default {
  component: Section,
  title,
} satisfies Meta<typeof Section>;

const Template: StoryFn<typeof Section> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="Section">
    <Section>
      <p style={{ fontSize: '11px', margin: 0 }}>Section</p>
    </Section>
  </StoryComponent>
);

export const UIToolsSection = Template.bind({});
