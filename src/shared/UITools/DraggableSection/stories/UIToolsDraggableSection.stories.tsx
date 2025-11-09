import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { noop } from 'lodash';
import { useState } from 'react';

// components
import TextField from '../../../UITools/TextField/TextField';
import { DraggableSection } from '../DraggableSection';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/DraggableSection';

export default {
  component: DraggableSection,
  title,
} satisfies Meta<typeof DraggableSection>;

const Template: StoryFn<typeof DraggableSection> = () => {
  const [components, setComponents] = useState([
    { element: <TextField key={0} onChange={noop} value="value-0" />, visible: true },
    { element: <TextField key={1} onChange={noop} value="value-1" />, visible: true },
    { element: <TextField key={2} onChange={noop} value="value-2" />, visible: true },
  ]);

  const onDragEnd = (draggableItem: number, index: number): void => {
    setComponents((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(draggableItem, 1);

      updated.splice(index, 0, moved);

      return updated;
    });
  };

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="DraggableSection">
      <DraggableSection components={components} onClickRemove={noop} onClickVisible={noop} onDragEnd={onDragEnd} />
    </StoryComponent>
  );
};

export const UIToolsDraggableSection = Template.bind({});
