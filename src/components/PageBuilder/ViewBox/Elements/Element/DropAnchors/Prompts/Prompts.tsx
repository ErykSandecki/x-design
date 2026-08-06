import cx from 'classnames';
import { FC, useMemo } from 'react';

// others
import { PROMPTS_MODIFICATORS } from './constants';

// styles
import styles from './prompts.module.scss';

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
  const prompts = useMemo(
    () => promptsData(anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid),
    [anchorPos, displayNextPrompt, displayPrevPrompt, isFlowVertical, isGrid],
  );

  return prompts.map(({ key, visible }) => (
    <div
      className={cx(styles.Prompts, {
        [styles[PROMPTS_MODIFICATORS[key]]]: visible,
      })}
      key={key}
    />
  ));
};

export default Prompts;
