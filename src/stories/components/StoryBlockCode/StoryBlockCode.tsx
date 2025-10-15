import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className as StoryBlockCodeClassName, classNames } from './classNames';

// styles
import styles from './story-block-code.scss';

// types
import { TStoryBlockCode } from './types';

// utils
import { parseComponentToHTMLContext } from './utils/parseComponentToHTMLContext';
import { parseImportToHTMLContext } from './utils/parseImportToHTMLContext';
import { parseVariableToHTMLContext } from './utils/parseVariableToHTMLContext';

export type TStoryBlockCodeProps = {
  blocksCodeData: Array<TStoryBlockCode>;
  className?: string;
};

export const StoryBlockCode: FC<TStoryBlockCodeProps> = ({ blocksCodeData, className = '' }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const imports = blocksCodeData
    .map(({ imports }) => imports)
    .filter(Boolean)
    .flat();

  const propsLength = blocksCodeData
    .map(({ props }) => props)
    .filter(Boolean)
    .flat().length;

  const variables = blocksCodeData
    .map(({ variables }) => variables)
    .filter(Boolean)
    .flat();

  return (
    <div className={cx(className, classNamesWithTheme[StoryBlockCodeClassName])}>
      {/* IMPORTS */}
      {imports.map((importObj, key) => (
        <p
          className={cx(classNamesWithTheme.imports)}
          dangerouslySetInnerHTML={{
            __html: parseImportToHTMLContext(importObj, classNamesWithTheme, cx),
          }}
          key={key}
        />
      ))}

      {/* SEPARATOR */}
      {propsLength > 0 && <div className={cx(classNamesWithTheme.separator)} />}

      {/* VARIABLES */}
      {variables.map((variable, key) => (
        <div
          className={cx(classNamesWithTheme.variables)}
          dangerouslySetInnerHTML={{
            __html: parseVariableToHTMLContext(classNamesWithTheme, cx, variable),
          }}
          key={key}
        />
      ))}

      {/* DECLARATION OF COMPONENTS */}
      {blocksCodeData.map((blockCode) => {
        const { componentName = '', props = [] } = blockCode;

        return props.map((props, key) => (
          <div
            className={cx(classNamesWithTheme.components)}
            dangerouslySetInnerHTML={{
              __html: parseComponentToHTMLContext(props, componentName, classNamesWithTheme, cx),
            }}
            key={key}
          />
        ));
      })}
    </div>
  );
};

export default StoryBlockCode;
