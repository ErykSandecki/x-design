import { FC, useMemo } from 'react';

// components
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './prompts.scss';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

// utils
import { promptsData } from './utils/promptsData';

export type TPromptsProps = {
  anchorPos: DropAnchorsPosition;
  displayNextPrompt: boolean;
  displayPrevPrompt: boolean;
  isFlowVertical: boolean;
  isGrid: boolean;
};

const Prompts: FC<TPromptsProps> = ({ anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const prompts = useMemo(
    () => promptsData(anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid),
    [anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid],
  );

  return prompts.map(({ key, visible }) => (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [classNamesWithTheme[className].modificators[key], visible]),
      }}
      key={key}
      sx={{ borderRadius: '1px', boxSizing: 'border-box', position: 'absolute' }}
    />
  ));
};

export default Prompts;
