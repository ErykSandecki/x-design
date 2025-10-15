import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { FieldGroup } from '../FieldGroup';
import { StoryComponent } from 'stories';
import TextField from '../../TextField/TextField';

const description = [];

const title = 'UI Tools/FieldGroup';

export default {
  component: FieldGroup,
  title,
} satisfies Meta<typeof FieldGroup>;

const Template: StoryFn<typeof FieldGroup> = () => (
  <StoryComponent blocksCodeData={[]} description={description} title="FieldGroup">
    <FieldGroup>
      <TextField value={100} />
      <TextField value="#ffffff" />
      <TextField value="name" />
      <TextField value="surname" />
    </FieldGroup>
  </StoryComponent>
);

export const UIToolsFieldGroup = Template.bind({});
