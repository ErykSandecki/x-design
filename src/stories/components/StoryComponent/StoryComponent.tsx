import cx from 'classnames';
import { camelCase } from 'lodash';
import { FC, ReactNode, useEffect } from 'react';

// components
import StoryBlockCode, { TStoryBlockCodeProps as TStoryBlockCodeProps } from '../StoryBlockCode/StoryBlockCode';

// hooks
import { useTheme } from 'hooks';

// others
import { colors } from 'constant/colors';
import { CONTENT_MODIFICATORS } from './constants';

// styles
import styles from './story-component.module.scss';

// types
import { ContentAlignItems, ContentDisplay, ContentGridFlow } from './enums';

export type TStoryComponentProps = TStoryBlockCodeProps & {
  applyMaxWidth?: boolean;
  children?: ReactNode;
  className?: string;
  contentAlignItems?: ContentAlignItems;
  contentDisplay?: ContentDisplay;
  contentGridFlow?: ContentGridFlow;
  description?: Array<string>;
  flex?: boolean;
  title: string;
};

export const StoryComponent: FC<TStoryComponentProps> = ({
  applyMaxWidth = true,
  blocksCodeData,
  children,
  className = '',
  contentAlignItems = ContentAlignItems.center,
  contentDisplay = ContentDisplay.grid,
  contentGridFlow = ContentGridFlow.column,
  description = [],
  title,
  ...restProps
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = colors.neutral4;
    document.body.style.colorScheme = theme;
  }, [theme]);

  return (
    <section
      className={cx(className, styles['StoryComponent'], {
        [styles['StoryComponent--max-width']]: applyMaxWidth,
      })}
    >
      {/*  TITLE */}
      <h2 className={cx(styles['StoryComponent__title'])}>{title}</h2>

      {/* DESCRIPTION */}
      {description.map((description, key) => (
        <p
          className={cx(styles['StoryComponent__description'])}
          dangerouslySetInnerHTML={{ __html: description }}
          key={key}
        />
      ))}

      {/* COMPONENT SECTION */}
      {children && (
        <section
          className={cx(
            styles['StoryComponent__content'],
            styles[CONTENT_MODIFICATORS[contentAlignItems]],
            styles[CONTENT_MODIFICATORS[contentDisplay]],
            styles[CONTENT_MODIFICATORS[camelCase(contentGridFlow)]],
          )}
        >
          {children}
        </section>
      )}

      {/* BLOCK CODE */}
      {blocksCodeData.length > 0 && (
        <StoryBlockCode
          blocksCodeData={blocksCodeData}
          className={cx(styles['StoryComponent__story-block-code'])}
          {...restProps}
        />
      )}
    </section>
  );
};

export default StoryComponent;
