import { mapValues } from 'lodash';

// types
import { ContentAlignItems, ContentDisplay, ContentGridFlow } from './enums';

export const className = 'StoryComponent';

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      maxWidth: `${className}--max-width`,
    },
  },
  title: `${className}__title`,
  description: `${className}__description`,
  content: {
    name: `${className}__content`,
    modificators: {
      ...mapValues(ContentAlignItems, (contentAlignItems) => `${className}__content--${contentAlignItems}`),
      ...mapValues(ContentDisplay, (contentDisplay) => `${className}__content--${contentDisplay}`),
      ...mapValues(ContentGridFlow, (contentGridFlow) => `${className}__content--${contentGridFlow}`),
    },
  },
  storyBlockCode: `${className}__story-block-code`,
};
