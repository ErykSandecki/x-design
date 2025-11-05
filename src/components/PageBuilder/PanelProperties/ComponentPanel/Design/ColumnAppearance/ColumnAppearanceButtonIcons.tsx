import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { BorderRadiusMode } from '../enums';

const ColumnAppearanceButtonIcons = (
  isBorderRaiusModeMerged: boolean,
  setBorderRadiusMode: TFunc<[BorderRadiusMode]>,
  t: TT,
): Array<ReactNode> => [
  <UITools.ButtonIcon
    e2eValue="corners-mode"
    key={0}
    name="Corners"
    onClick={() => setBorderRadiusMode(isBorderRaiusModeMerged ? BorderRadiusMode.individual : BorderRadiusMode.merged)}
    selected={!isBorderRaiusModeMerged}
    tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.individual.corners`) }}
  />,
];

export default ColumnAppearanceButtonIcons;
