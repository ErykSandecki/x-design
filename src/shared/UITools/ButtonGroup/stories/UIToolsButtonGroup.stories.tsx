import { noop } from 'lodash';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { ButtonGroup } from '../ButtonGroup';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/ButtonGroup';

export default {
  component: ButtonGroup,
  title,
} satisfies Meta<typeof ButtonGroup>;

const Template: StoryFn<typeof ButtonGroup> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="ButtonGroup">
    <ButtonGroup
      buttons={[
        { name: 'AlignHorizontalCenter', onClick: noop },
        { name: 'AlignHorizontalLeft', onClick: noop },
        { name: 'AlignHorizontalRight', onClick: noop },
      ]}
    />
  </StoryComponent>
);

export const UIToolsButtonGroup = Template.bind({});
