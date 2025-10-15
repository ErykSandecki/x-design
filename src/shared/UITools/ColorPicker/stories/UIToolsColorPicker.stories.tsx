import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { noop } from 'lodash';
import { useState } from 'react';

// components
import { ColorPicker } from '../ColorPicker';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/ColorPicker';

export default {
  component: ColorPicker,
  title,
} satisfies Meta<typeof ColorPicker>;

const Template: StoryFn<typeof ColorPicker> = () => {
  const [alpha, setAlpha] = useState('100');
  const [color, setColor] = useState('#ffffff');

  return (
    <StoryComponent blocksCodeData={[]} description={description} title="ColorPicker">
      <ColorPicker
        activeSampler={false}
        alpha={alpha}
        color={color}
        onChangeAlpha={setAlpha}
        onChangeColor={(alpha, color) => {
          setAlpha(alpha);
          setColor(color);
        }}
        onClickColorSampler={noop}
        onClickSampler={noop}
      />
    </StoryComponent>
  );
};

export const UIToolsColorPicker = Template.bind({});
