import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Button from '../Button';
import { StoryApi, TStoryBlockCode, TTableBody } from 'stories';

const description = [
  'API documentation for the React Button component. Learn about the available props. Button is based on basic <code>props</code> from <code>ButtonHTMLAttributes<HTMLElement></code>',
  'If the Button receives properties from the ButtonGroup, they are included.',
];

const blockCodeData: TStoryBlockCode = {
  imports: [
    {
      items: '{ Button }',
      path: 'shared',
    },
  ],
};

const tableBodyData: Array<TTableBody> = [
  {
    description: 'The content of the component.',
    name: 'children',
    type: 'node',
  },
  {
    description: 'Override or extend the styles applied to the component.',
    name: 'className',
    type: 'string',
  },
  {
    defaultValue: `'primary'`,
    description: `The color of the component. It doesn't supports those theme colors that make sense for this component.`,
    name: 'color',
    type: `'primary'<br/>|&nbsp;'primary'<br/>|&nbsp;'secondary'<br/>|&nbsp;'success'<br/>|&nbsp;'warning'<br/>|&nbsp;'error'<br/>|&nbsp;'string'`,
  },
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the component is disabled.',
    name: 'disabled',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the ripple effect is disabled.',
    name: 'disabledRippleEffect',
    type: 'boolean',
  },
  {
    description: 'Provide test-id',
    name: 'e2eAttribute',
    type: 'E2EAttribute',
  },
  {
    description: 'Provide value for test-id',
    name: 'e2eValue',
    type: 'number | string',
  },
  {
    description: 'Element placed after the children.',
    name: 'endIcon',
    type: 'node',
  },
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the hover will be active without user friction.',
    name: 'forcedHover',
    type: 'boolean',
  },
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the button will take up the full width of its container.',
    name: 'fullWidth',
    type: 'boolean',
  },
  {
    description: '<code>Function</code> to call action after the click button.',
    name: 'onClick',
    type: `ButtonHTMLAttributes<HTMLElement>['onClick']`,
  },
  {
    description: 'The <code>ref</code> is forwarded to the root element.',
    name: 'ref',
    type: 'Ref<HTMLButtonElement>',
  },
  {
    defaultValue: `'medium'`,
    description: 'The size of the component. <code>small</code> is equivalent to the dense button styling.',
    name: 'size',
    type: `'small'<br/>|&nbsp;'small'<br/>|&nbsp;'medium'<br/>|&nbsp;'large'<br/>|&nbsp;'string'`,
  },
  {
    description: 'Element placed before the children.',
    name: 'startIcon',
    type: 'node',
  },
  {
    description: 'Override styles by object of styles.',
    name: 'style',
    type: 'object',
  },
  {
    description: 'Type of button.',
    name: 'type',
    type: `'button'<br/>|&nbsp;'button'<br/>|&nbsp;'reset'<br/>|&nbsp;'submit'<br/>|&nbsp;'string'`,
  },
  {
    defaultValue: 'text',
    description: 'The variant to use.',
    name: 'variant',
    type: `text'<br/>|&nbsp;'text'<br/>|&nbsp;'contained'<br/>|&nbsp;'outlined'<br/>|&nbsp;'string'`,
  },
];

const title = 'UI/Button/Button API';

export default {
  component: Button,
  parameters: {
    options: { showPanel: false },
  },
  title: title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = () => (
  <StoryApi
    blocksCodeData={[blockCodeData]}
    description={description}
    tableBodyData={tableBodyData}
    title="Button API"
  />
);

export const ButtonAPI = Template.bind({});
