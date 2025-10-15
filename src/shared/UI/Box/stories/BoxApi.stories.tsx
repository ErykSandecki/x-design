import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Box from '../Box';
import { StoryApi, TStoryBlockCode, TTableBody } from 'stories';

const description = [
  'API documentation for the React Box component. Learn about the available props. Box is based on basic <code>props</code> from <code>HTMLAttributes<HTMLElement></code>',
];

const blockCodeData: TStoryBlockCode = {
  imports: [
    {
      items: '{ Box }',
      path: 'shared',
    },
  ],
};

const tableBodyData: Array<TTableBody> = [
  {
    description: 'Additional attributes for the root element, that can be spread on the component',
    name: 'attributes',
    type: 'Object<string>',
  },
  {
    description: 'The content of the component.',
    name: 'children',
    type: 'node',
  },
  {
    description: 'The component used for the root node. Either a string to use a HTML element or a component',
    name: 'component',
    type: 'TBoxHTMLTag',
  },
  {
    description: 'Dependencies for <code>sx</code> prop',
    name: 'depsSx',
    type: 'Array<any>',
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
    description: 'The <code>ref</code> is forwarded to the root element',
    name: 'ref',
    type: 'Ref<HTMLButtonElement>',
  },
];

const title = 'UI/Box/Box API';

export default {
  component: Box,
  parameters: {
    options: { showPanel: false },
  },
  title: title,
} satisfies Meta<typeof Box>;

const Template: StoryFn<typeof Box> = () => (
  <StoryApi blocksCodeData={[blockCodeData]} description={description} tableBodyData={tableBodyData} title="Box API" />
);

export const BoxAPI = Template.bind({});
