import type { Meta, StoryObj } from '@storybook/react-webpack5';

// components
import { Button } from './Button';

const meta = {
  argTypes: {},
  args: {},
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};
