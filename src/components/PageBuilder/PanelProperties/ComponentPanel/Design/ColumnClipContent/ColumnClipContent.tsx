import { FC } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { changeClipContent } from 'store/pageBuilder/actions';
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// utils
import { isMixed } from 'components/PageBuilder/utils/isMixed';

const ColumnClipContent: FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const isMixedClipContent = isMixed(elements, firstElement, 'clipContent', selectedElements);
  const { clipContent } = useSelector(elementDataSelectorCreator(firstElement.id));
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn withMargin>
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
