import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Tooltip from '../Tooltip';
import { StoryApi, TStoryBlockCode, TTableBody } from 'stories';

const description = ['API documentation for the React Checkbox component. Learn about the available props'];

const blockCodeData: TStoryBlockCode = {
  imports: [
    {
      items: '{ Tooltip }',
      path: 'shared',
    },
  ],
};

const tableBodyData: Array<TTableBody> = [
  {
    description: 'If true then tooltip will be adjust dependly on cursor position relative to screen',
    name: 'autoPositioning',
    type: 'boolean',
  },
  {
    description: 'Auto positioning relative to horizontal',
    name: 'autoPositioningHorizontal',
    type: 'boolean',
  },
  {
    description: 'Placement for arrow during auto positioning',
    name: 'autoPositioningPlacement',
    type: `'Center'<br/>|&nbsp;'Start'<br/>|&nbsp;'Center'<br/>|&nbsp;'End'<br/>|&nbsp;'string'`,
  },
  {
    description: 'The content of the component',
    name: 'children',
    type: 'node',
  },
  {
    description: 'Override or extend the styles applied to the component',
    name: 'className',
    type: 'string',
  },
  {
    description: 'Content included inside the tooltip',
    name: 'content',
    type: 'string',
  },
  {
    description: 'Custom id for the tooltip container',
    name: 'customId',
    type: 'string',
  },
  {
    defaultValue: 'E2EAttributeicon',
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
    description: 'Determines whether the tooltip is hidden',
    name: 'hide',
    type: 'boolean',
  },
  {
    defaultValue: 'top-center',
    description: 'Tooltip position',
    name: 'position',
    type: `'top-center'<br/>|&nbsp;'top-start'<br/>|&nbsp;'top-center'<br/>|&nbsp;'top-end'<br/>|&nbsp;'bottom-start'<br/>|&nbsp;'bottom-center'<br/>|&nbsp;'bottom-end'<br/>|&nbsp;'left-start'<br/>|&nbsp;'left-center'<br/>|&nbsp;'left-end'<br/>|&nbsp;'right-start'<br/>|&nbsp;'right-center'<br/>|&nbsp;'right-end'<br/>|&nbsp;'string'`,
  },
  {
    defaultValue: 'false',
    description: 'If true, the component is <code>visible</code>',
    name: 'visible',
    type: 'bool',
  },
];

const title = 'UI/Tooltip/Tooltip API';

export default {
  component: Tooltip,
  title,
} satisfies Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = () => (
  <StoryApi
    blocksCodeData={[blockCodeData]}
    description={description}
    tableBodyData={tableBodyData}
    title="Tooltip API"
  />
);

export const TooltipAPI = Template.bind({});
