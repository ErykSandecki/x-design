import cx from 'classnames';
import { camelCase } from 'lodash';
import { FC, ReactNode, useEffect } from 'react';

// components
import StoryBlockCode, { TStoryBlockCodeProps as TStoryBlockCodeProps } from '../StoryBlockCode/StoryBlockCode';

// hooks
import { useTheme } from 'hooks';

// others
import { colors } from 'constant/colors';

// styles
import styles from './story-component.scss';

// types
import { ContentAlignItems, ContentDisplay, ContentGridFlow } from './enums';

const contentModificators: Record<string, string> = {
  block: 'StoryComponent__content--block',
  bottom: 'StoryComponent__content--bottom',
  center: 'StoryComponent__content--center',
  column: 'StoryComponent__content--column',
  flex: 'StoryComponent__content--flex',
  grid: 'StoryComponent__content--grid',
  maxEightColumns: 'StoryComponent__content--max-eight-columns',
  maxFiveColumns: 'StoryComponent__content--max-five-columns',
  maxFourColumns: 'StoryComponent__content--max-four-columns',
  maxSixColumns: 'StoryComponent__content--max-six-columns',
  maxThreeColumns: 'StoryComponent__content--max-three-columns',
  maxTwoColumns: 'StoryComponent__content--max-two-columns',
  row: 'StoryComponent__content--row',
  top: 'StoryComponent__content--top',
};

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
            styles[contentModificators[contentAlignItems]],
            styles[contentModificators[contentDisplay]],
            styles[contentModificators[camelCase(contentGridFlow)]],
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
