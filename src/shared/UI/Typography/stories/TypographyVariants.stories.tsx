import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Typography from '../Typography';
import { H1, H2, H3, H4, H5, H6, P, Small } from '../';

// types
import { ContentGridFlow, StoryComponent, TStoryBlockCode } from 'stories';

const blockCodeData: TStoryBlockCode = {
  componentName: '',
  imports: [
    {
      items: '{ H1, H2, H3, H4, H5, H6, P, Small, Typography }',
      path: 'shared',
    },
  ],
  props: [
    {
      children: [
        { componentName: 'H1', props: [{ children: 'h1. Heading' }] },
        { componentName: 'H2', props: [{ children: 'h2. Heading' }] },
        { componentName: 'H3', props: [{ children: 'h3. Heading' }] },
        { componentName: 'H4', props: [{ children: 'h4. Heading' }] },
        { componentName: 'H5', props: [{ children: 'h5. Heading' }] },
        { componentName: 'H6', props: [{ children: 'h6. Heading' }] },
        { componentName: 'Text', props: [{ children: 'Text' }] },
        { componentName: 'Small', props: [{ children: 'Small Text' }] },
      ],
    },
  ],
};

const title = 'UI/Typography/Examples/Typography Variants';

export default {
  component: Typography,
  title,
} satisfies Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = () => {
  return (
    <StoryComponent blocksCodeData={[blockCodeData]} contentGridFlow={ContentGridFlow.row} title="Typography Variants">
      <H1>h1. Heading</H1>
      <H2>h2. Heading</H2>
      <H3>h3. Heading</H3>
      <H4>h4. Heading</H4>
      <H5>h5. Heading</H5>
      <H6>h6. Heading</H6>
      <P>P. Standard Text</P>
      <Small>Small. Small Text</Small>
    </StoryComponent>
  );
};

export const TypographyVariants = Template;

TypographyVariants.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
};

TypographyVariants.args = {};
