import { FC, ReactNode } from 'react';

// components
import StoryComponent from '../StoryComponent/StoryComponent';
import StoryPropsTable, { TPropsStoryPropsTable } from '../StoryPropsTable/StoryPropsTable';

// hooks
import { useTheme } from '../../../hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './story-api.scss';

// types
import { TStoryBlockCodeProps } from '../StoryBlockCode/StoryBlockCode';

export type TStoryApiProps = TStoryBlockCodeProps &
  TPropsStoryPropsTable & {
    children?: ReactNode;
    description?: Array<string>;
    title: string;
  };

export const StoryApi: FC<TStoryApiProps> = ({ children = null, description = [], title, ...restProps }) => {
  const { tableBodyData } = restProps;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <main className={cx(classNamesWithTheme[className])}>
      {/* TITLE */}
      <h1 className={cx(classNamesWithTheme.title)}>{title}</h1>

      {/* DESCRIPTION */}
      {description.map((description, key) => (
        <p
          className={cx(classNamesWithTheme.description)}
          dangerouslySetInnerHTML={{ __html: description }}
          key={key}
        />
      ))}

      {/* COMPONENT */}
      <StoryComponent className={cx(classNamesWithTheme.storyComponent)} title="Import" {...restProps} />

      {/* ADDITIONAL CONTENT: BLOCK WARNING */}
      {children}

      {/* PROPS */}
      <StoryPropsTable tableBodyData={tableBodyData} />
    </main>
  );
};

export default StoryApi;
