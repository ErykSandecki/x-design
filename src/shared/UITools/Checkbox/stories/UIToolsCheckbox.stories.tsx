import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useState } from 'react';

// components
import { Checkbox } from '../Checkbox';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/Checkbox';

export default {
  component: Checkbox,
  title,
} satisfies Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="Checkbox">
      <Checkbox label="label" onChange={setChecked as any} value={checked} />
    </StoryComponent>
  );
};

export const UIToolsCheckbox = Template.bind({});
