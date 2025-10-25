import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools, usePopoverRoot } from 'shared';

// others
import { POPOVER_AUTO_LAYOUT_SETTINGS_ID } from '../constants';
import { PREVIEW_BOX_SIZING_ID, translationNameSpace } from './constants';

// store
import { changeLayoutBoxSizing } from 'store/pageBuilder/actions';

// types
import { TElement, TLayout } from 'types';

export type TPopoverAutoLayoutBoxSizingProps = {
  isMixedBoxSizing: boolean;
  layout: TElement['layout'];
};

const PopoverAutoLayoutBoxSizing: FC<TPopoverAutoLayoutBoxSizingProps> = ({ isMixedBoxSizing, layout }) => {
  const dispatch = useDispatch();
  const { setActiveOption, setPreviewIdHandler } = usePopoverRoot();
  const { t } = useTranslation();

  return (
    <UITools.Select
      e2eValue="box-sizing"
      idContainer={POPOVER_AUTO_LAYOUT_SETTINGS_ID}
      isMixed={isMixedBoxSizing}
      label={t(`${translationNameSpace}.label.boxSizing`)}
      onChange={(value) => dispatch(changeLayoutBoxSizing(value as TLayout['boxSizing']))}
      onMouseEnterSelect={() => setPreviewIdHandler(layout.boxSizing, PREVIEW_BOX_SIZING_ID)}
      onMouseLeaveSelect={() => setPreviewIdHandler('', '')}
      onMouseEnterOptions={setActiveOption}
      style={{ width: '112px' }}
      translationNameSpace={`${translationNameSpace}.options`}
      value={layout.boxSizing}
    >
      <UITools.SelectItem value="included">{t(`${translationNameSpace}.options.included`)}</UITools.SelectItem>
      <UITools.SelectItem value="excluded">{t(`${translationNameSpace}.options.excluded`)}</UITools.SelectItem>
    </UITools.Select>
  );
};

export default PopoverAutoLayoutBoxSizing;
