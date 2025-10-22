import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useState } from 'react';

// components
import { AlignmentArea } from '../AlignmentArea';
import { StoryComponent } from 'stories';

// types
import { AlignmentLayout } from 'types';

const description = [];

const title = 'UI Tools/AlignmentArea';

export default {
  component: AlignmentArea,
  title,
} satisfies Meta<typeof AlignmentArea>;

const Template: StoryFn<typeof AlignmentArea> = () => {
  const [value, setValue] = useState(AlignmentLayout.center);

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="AlignmentArea">
      <div style={{ width: '86.5px' }}>
        <AlignmentArea onClick={setValue} value={value} />
      </div>
    </StoryComponent>
  );
};

export const UIToolsAlignmentArea = Template.bind({});
