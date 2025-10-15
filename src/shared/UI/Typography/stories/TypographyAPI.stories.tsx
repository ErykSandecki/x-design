import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Typography from '../Typography';
import { StoryApi, TStoryBlockCode, TTableBody } from 'stories';

const description = [
  'API documentation for the React Typography component. Learn about the available props. Typography is based on basic <code>props</code> from <code>HTMLAttributes<HTMLElement></code>',
];

const blockCodeData: TStoryBlockCode = {
  imports: [
    {
      items: '{ Typography }',
      path: 'shared',
    },
  ],
};

const tableBodyData: Array<TTableBody> = [
  {
    defaultValue: 'inherit',
    description: 'Set the text-align on the component.',
    name: 'align',
    type: `CSSProperties['textAlign']`,
  },
  {
    defaultValue: 'false',
    description: 'When is passed the colors pallete is applied to the style <code>object</code> in html element.',
    name: 'applyInlineColors',
    type: 'boolean',
  },
  {
    description: 'The content of the component.',
    name: 'children',
    type: 'ReactElement | Array<ReactElement>',
  },
  {
    description: 'Override or extend the styles applied to the component.',
    name: 'className',
    type: 'string',
  },
  {
    description:
      'The color that you can pass. Also you can use <code>TYPOGRAPHY_COLORS_MODE</code> to provide color dependly on theme',
    name: 'color',
    type: 'TTypographyColor',
  },

  {
    defaultValue: 'E2EAttribute.text',
    description: 'Provide test-id.',
    name: 'e2eAttribute',
    type: 'E2EAttribute',
  },
  {
    description: 'Provide value for test-id.',
    name: 'e2eValue',
    type: 'number | string',
  },
  {
    defaultValue: 'normal',
    description: 'The font style to use.',
    name: 'fontStyle',
    type: `'normal'<br/>|&nbsp;'italic'<br/>|&nbsp;'normal'<br/>|&nbsp;'string'`,
  },
  {
    defaultValue: 'p',
    description: 'The variant to use.',
    name: 'fontType',
    type: `'p'<br/>|&nbsp;'h1'<br/>|&nbsp;'h2'<br/>|&nbsp;'h3'<br/>|&nbsp;'h4'<br/>|&nbsp;'h5'<br/>|&nbsp;'h6'<br/>|&nbsp;'p'<br/>|&nbsp;'small'<br/>|&nbsp;'string'`,
  },
  {
    defaultValue: 'regular',
    description: 'The font weight to use.',
    name: 'fontWeight',
    type: `'regular'<br/>|&nbsp;'black'<br/>|&nbsp;'extraBold'<br/>|&nbsp;'light'<br/>|&nbsp;'medium'<br/>|&nbsp;'regular'<br/>|&nbsp;'semiBold'<br/>|&nbsp;'string'`,
  },
  {
    description: 'Can be passed to sets the HTML or XML markup contained within the element.',
    name: 'innerHtml',
    type: 'string',
  },
  {
    defaultValue: 'false',
    description: 'If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.',
    name: 'noWrap',
    type: 'boolean',
  },
  {
    description: 'The <code>ref</code> is forwarded to the root element.',
    name: 'ref',
    type: 'Ref<HTMLElement>',
  },
  {
    description: 'Override styles by object of styles.',
    name: 'style',
    type: 'object',
  },
  {
    defaultValue: 'false',
    description: 'If true then text will be without margin.',
    name: 'withoutMargin',
    type: `boolean`,
  },
];

const title = 'UI/Typography/Typography API';

export default {
  component: Typography,
  parameters: {
    options: { showPanel: false },
  },
  title,
} satisfies Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = () => (
  <StoryApi
    blocksCodeData={[blockCodeData]}
    description={description}
    tableBodyData={tableBodyData}
    title="Typography API"
  />
);

export const TypographyAPI = Template;
