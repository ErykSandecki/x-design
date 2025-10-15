import { keys } from 'lodash';
import type { Meta, StoryFn } from '@storybook/react-webpack5';

// components
import Icon, { TIconProps } from '../Icon';
import { Icons } from 'assets/svg';

// types
import { ContentGridFlow, StoryComponent, TStoryBlockCode } from 'stories';
import { E2EAttribute } from 'types';

const description = ['Use Icon to present to emphasize the importance of a given action or section.'];

const icons = keys(Icons);

const blockCodeData: TStoryBlockCode = {
  componentName: '',
  imports: [
    {
      items: '{ Icon, Icons, IconName }',
      path: 'shared',
    },
  ],
  props: [
    {
      children: icons.map((name) => {
        return {
          componentName: 'Icon',
          props: [
            {
              attributes: [
                {
                  name: 'name',
                  value: name,
                },
              ],
            },
          ],
        };
      }),
    },
  ],
};

const title = 'UI/Icon/Basic Icon';

export default {
  component: Icon,
  title,
} satisfies Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = ({ ...args }) => {
  return (
    <StoryComponent
      blocksCodeData={[blockCodeData]}
      contentGridFlow={ContentGridFlow.maxEightColumns}
      description={description}
      title="Icon"
    >
      {icons.map((iconName) => (
        <Icon {...args} name={iconName as TIconProps['name']} key={iconName} />
      ))}
    </StoryComponent>
  );
};

export const BasicIcon = Template;

BasicIcon.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
};

BasicIcon.args = {
  clickable: false,
  disabled: false,
  e2eAttribute: E2EAttribute.icon,
  e2eValue: '',
};
