import cx from 'classnames';
import { FC, useMemo } from 'react';

// components
import { Box } from 'shared';

// others

// styles
import styles from './prompts.scss';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

// utils
import { promptsData } from './utils/promptsData';

const promptsModificators: Record<string, string> = {
  bottom: 'Prompts--bottom',
  left: 'Prompts--left',
  right: 'Prompts--right',
  top: 'Prompts--top',
};

export type TPromptsProps = {
  anchorPos: DropAnchorsPosition;
  displayNextPrompt: boolean;
  displayPrevPrompt: boolean;
  isFlowVertical: boolean;
  isGrid: boolean;
};

const Prompts: FC<TPromptsProps> = ({ anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid }) => {
  const prompts = useMemo(
    () => promptsData(anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid),
    [anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid],
  );

  return prompts.map(({ key, visible }) => (
    <Box
      classes={{
        className: cx(styles.Prompts, {
          [styles[promptsModificators[key]]]: visible,
        }),
      }}
      key={key}
      sx={{ borderRadius: '1px', boxSizing: 'border-box', position: 'absolute' }}
    />
  ));
};

export default Prompts;
