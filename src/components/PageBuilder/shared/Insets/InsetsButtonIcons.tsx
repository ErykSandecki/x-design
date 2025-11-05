import { ReactNode } from 'react';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// types
import { InsetMode } from './enums';
import { TInsetsName } from 'types';

const InsetsButtonIcons = (
  insetsName: TInsetsName,
  isInsetModeMerged: boolean,
  setInsetMode: TFunc<[InsetMode]>,
  showButtons: boolean,
  t: TT,
): Array<ReactNode> =>
  showButtons
    ? [
        <UITools.ButtonIcon
          e2eValue="insets-mode"
          key={0}
          name="IndividualInsets"
          onClick={() => setInsetMode(isInsetModeMerged ? InsetMode.individual : InsetMode.merged)}
          tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.individual.${insetsName}`) }}
          selected={false}
        />,
      ]
    : [];

export default InsetsButtonIcons;
