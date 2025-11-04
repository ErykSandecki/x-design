import { Dispatch } from 'redux';
import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

const ColumnResizingButtonIcons = (
  aspectRatio: boolean,
  dispatch: Dispatch,
  t: TT,
  visibleAspectRatioButton: boolean,
): Array<ReactNode> =>
  visibleAspectRatioButton
    ? [
        <UITools.ButtonIcon
          e2eValue="aspect-ratio"
          key={0}
          name="AspectRatio"
          onClick={() => dispatch(changeProperties({ aspectRatio: !aspectRatio }))}
          tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.lookAspectRatio`) }}
          selected={aspectRatio}
        />,
      ]
    : [];

export default ColumnResizingButtonIcons;
