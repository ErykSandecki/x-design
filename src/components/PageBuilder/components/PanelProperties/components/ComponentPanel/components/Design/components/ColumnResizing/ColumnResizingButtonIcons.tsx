import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { toggleAspectRatio } from 'store/pageBuilder/actions';

const ColumnResizingButtonIcons = (aspectRatio: boolean, visibleAspectRatioButton: boolean): Array<ReactNode> => {
  const dispatch = useDispatch();

  return visibleAspectRatioButton
    ? [
        <UITools.ButtonIcon
          e2eValue="aspect-ratio"
          key={0}
          name="AspectRatio"
          onClick={() => dispatch(toggleAspectRatio())}
          selected={aspectRatio}
        />,
      ]
    : [];
};

export default ColumnResizingButtonIcons;
