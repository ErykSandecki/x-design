import { camelCase } from 'lodash';
import { FC, ReactNode, useEffect } from 'react';

// components
import StoryBlockCode, { TStoryBlockCodeProps as TStoryBlockCodeProps } from '../StoryBlockCode/StoryBlockCode';

// hooks
import { useTheme } from '../../../hooks/useTheme/useTheme';

// others
import { className as classNameStoryComponent, classNames } from './classNames';
import { THEME_COLORS } from 'constant/themeColors';

// styles
import styles from './story-component.scss';

// types
import { ContentAlignItems, ContentDisplay, ContentGridFlow } from './enums';
import { Theme } from '../../../types';

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
  const { classNamesWithTheme, cx, theme } = useTheme(classNames, styles);

  useEffect(() => {
    if (theme === Theme.dark) {
      document.body.style.backgroundColor = THEME_COLORS.dark.neutral4;
      document.body.style.colorScheme = theme;
    }
  }, [theme]);

  return (
    <section
      className={cx(className, classNamesWithTheme[classNameStoryComponent].name, [
        classNamesWithTheme[classNameStoryComponent].modificators.maxWidth,
        applyMaxWidth,
      ])}
    >
      {/*  TITLE */}
      <h2 className={cx(classNamesWithTheme.title)}>{title}</h2>

      {/* DESCRIPTION */}
      {description.map((description, key) => (
        <p
          className={cx(classNamesWithTheme.description)}
          dangerouslySetInnerHTML={{ __html: description }}
          key={key}
        />
      ))}

      {/* COMPONENT SECTION */}
      {children && (
        <section
          className={cx(
            classNamesWithTheme.content.name,
            classNamesWithTheme.content.modificators[contentAlignItems],
            classNamesWithTheme.content.modificators[contentDisplay],
            classNamesWithTheme.content.modificators[camelCase(contentGridFlow)],
          )}
        >
          {children}
        </section>
      )}

      {/* BLOCK CODE */}
      {blocksCodeData.length > 0 && (
        <StoryBlockCode
          blocksCodeData={blocksCodeData}
          className={cx(classNamesWithTheme.storyBlockCode)}
          {...restProps}
        />
      )}
    </section>
  );
};

export default StoryComponent;
