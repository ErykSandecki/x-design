import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { changeClipContent } from 'store/pageBuilder/actions';
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';

const ColumnClipContent: FC = () => {
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedClipContent = useSelector(isMixedSelectorCreator('clipContent'));
  const clipContent = useSelector(elementAttributeSelectorCreator('clipContent', firstElementId));
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn withTopMargin withBottomMargin>
      <UITools.Checkbox
        e2eValue="clip-content"
        label={t(`${translationNameSpace}.label`)}
        isMixed={isMixedClipContent}
        onChange={() => dispatch(changeClipContent(!clipContent))}
        value={clipContent}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnClipContent;
