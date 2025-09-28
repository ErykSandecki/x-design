import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { fitLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType } from 'types';

const DesignLayoutButtonIcons = (
  isMixedLayoutType: boolean,
  layoutType: LayoutType,
  onChangeLayoutType: TFunc,
): Array<ReactNode> => {
  const dispatch = useDispatch();
  const isFlexible = layoutType !== LayoutType.default;
  const isSelected = !isMixedLayoutType && isFlexible;

  return [
    <UITools.ButtonIcon key={0} name="FitLayout" onClick={() => dispatch(fitLayout())} selected={false} />,
    <UITools.ButtonIcon key={1} name="AutoLayout" onClick={onChangeLayoutType} selected={isSelected} />,
  ];
};

export default DesignLayoutButtonIcons;
