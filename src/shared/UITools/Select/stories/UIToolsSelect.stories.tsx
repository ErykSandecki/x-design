import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useState } from 'react';

// components
import Select from '../Select';
import SelectItem from '../SelectItem/SelectItem';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/Select';

export default {
  component: Select,
  title,
} satisfies Meta<typeof Select>;

const Template: StoryFn<typeof Select> = () => {
  const [value, setValue] = useState('');

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="Select">
      <Select label="label" onChange={setValue} value={value}>
        <SelectItem value="option-1">1</SelectItem>
        <SelectItem value="option-2">2</SelectItem>
        <SelectItem value="option-3">3</SelectItem>
      </Select>
    </StoryComponent>
  );
};

export const UIToolsSelect = Template.bind({});
