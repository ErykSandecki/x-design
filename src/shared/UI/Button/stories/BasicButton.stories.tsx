import { capitalize } from 'lodash';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import { Button } from '../Button';
import { StoryComponent, TStoryBlockCode } from 'stories';

// types
import { ButtonVariant } from '../enums';

// utils
import { enumToArray } from 'utils';

const description = ['The <code>Button</code> comes with three variants: text, contained, and outlined.'];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Button',
  imports: [
    {
      items: '{ Button, ButtonVariant }',
      path: 'shared',
    },
  ],
  props: [
    {
      attributes: [{ name: 'variant', value: 'Variant.text' }],
      children: capitalize(ButtonVariant.text),
    },
    {
      children: capitalize(ButtonVariant.contained),
    },
    {
      attributes: [{ name: 'variant', value: 'Variant.outlined' }],
      children: capitalize(ButtonVariant.outlined),
    },
  ],
};

const title = 'UI/Button/Basic Button';

export default {
  component: Button,
  title,
} satisfies Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryComponent blocksCodeData={[blockCodeData]} description={description} title="Basic Button">
    {enumToArray<ButtonVariant>(ButtonVariant).map((variant) => (
      <Button {...args} key={variant} variant={ButtonVariant[variant]}>
        {capitalize(variant)}
      </Button>
    ))}
  </StoryComponent>
);

export const BasicButton = Template.bind({});
