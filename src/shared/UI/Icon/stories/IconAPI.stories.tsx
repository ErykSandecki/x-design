import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Icon from '../Icon';
import { StoryApi, TStoryBlockCode, TTableBody } from 'stories';

const description = [
  'API documentation for the React Icon component. Learn about the available props. Icon is based on basic <code>props</code> from <code>HTMLAttributes<SVGSVGElement></code>',
];

const blockCodeData: TStoryBlockCode = {
  imports: [
    {
      items: '{ Icon }',
      path: 'shared',
    },
  ],
};

const tableBodyData: Array<TTableBody> = [
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the component is clickable',
    name: 'clickable',
    type: 'boolean',
  },
  {
    description: 'The color of the component. It supports those theme colors that make sense for this component',
    name: 'color',
    type: 'ColorsTheme',
  },
  {
    defaultValue: 'false',
    description: 'If <code>true</code>, the component is disabled',
    name: 'disabled',
    type: 'boolean',
  },
  {
    defaultValue: 'E2EAttribute.icon',
    description: 'Provide test-id.',
    name: 'e2eAttribute',
    type: 'E2EAttribute',
  },
  {
    description: 'Provide value for test-id',
    name: 'e2eValue',
    type: 'number | string',
  },
  {
    description: 'Provide the height for component',
    name: 'height',
    type: 'number',
  },
  {
    description: 'Name of the icon from the icon assets',
    name: 'name',
    type: 'string',
  },
  {
    description: 'The <code>ref</code> is forwarded to the root element',
    name: 'ref',
    type: 'Ref<SVGSVGElement>',
  },
  {
    description: 'Provide the with for component',
    name: 'width',
    type: 'number',
  },
];

const title = 'UI/Icon/Icon API';

export default {
  component: Icon,
  parameters: {
    options: { showPanel: false },
  },
  title,
} satisfies Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = () => (
  <StoryApi blocksCodeData={[blockCodeData]} description={description} tableBodyData={tableBodyData} title="Icon API" />
);

export const IconAPI = Template;
