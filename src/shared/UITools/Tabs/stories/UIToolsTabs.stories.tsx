import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useState } from 'react';

// components
import { StoryComponent } from 'stories';
import { Tabs } from '../Tabs';

const description = [];

const title = 'UI Tools/Tabs';

export default {
  component: Tabs,
  title,
} satisfies Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = () => {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="Tabs">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { labelTranslationKey: 'tab.1', name: 'Tab1' },
          { labelTranslationKey: 'tab.2', name: 'Tab2' },
          { labelTranslationKey: 'tab.3', name: 'Tab3' },
        ]}
      />
    </StoryComponent>
  );
};

export const UIToolsTabs = Template.bind({});
