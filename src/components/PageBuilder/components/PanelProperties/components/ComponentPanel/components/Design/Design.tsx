import { FC } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignment from './components/ColumnAlignment/ColumnAlignment';
import ColumnHeader from './components/ColumnHeader/ColumnHeader';
import ColumnPosition from './components/ColumnPosition/ColumnPosition';
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { changePosition } from 'store/pageBuilder/actions';
import {
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

const Design: FC = () => {
  const dispatch = useDispatch();
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const { t } = useTranslation();
  const { position } = useSelector(
    elementAllDataSelectorCreator(firstElement.id),
  );

  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={
          firstElement.parentId !== '-1'
            ? [
                <UITools.ButtonIcon
                  key={0}
                  name="PositionSwitcher"
                  onClick={() => dispatch(changePosition())}
                  selected={position === 'absolute'}
                />,
              ]
            : []
        }
        label={t(`${translationNameSpace}.section.2.label`)}
      >
        <ColumnAlignment />
        <ColumnPosition />
      </UITools.Section>
    </>
  );
};

export default Design;
