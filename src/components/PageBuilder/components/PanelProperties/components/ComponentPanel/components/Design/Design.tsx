import { FC } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnAlignment from './components/ColumnAlignment/ColumnAlignment';
import ColumnHeader from './components/ColumnHeader/ColumnHeader';
import ColumnPosition from './components/ColumnPosition/ColumnPosition';
import ColumnRotation from './components/ColumnRotation/ColumnRotation';
import { UITools } from 'shared';

// hooks
import { useDesignData } from './hooks/useDesignData';

// others
import { translationNameSpace } from './constants';

// store
import { changePosition } from 'store/pageBuilder/actions';
import { selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { LayoutType } from 'types';

const Design: FC = () => {
  const dispatch = useDispatch();
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const { t } = useTranslation();
  const {
    areParentsTheSame,
    isMixedLayoutType,
    layoutType,
    onChangeLayoutType,
    position,
  } = useDesignData();

  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={
          firstElement.parentId !== '-1' && areParentsTheSame
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
        <ColumnRotation />
      </UITools.Section>
      <UITools.Section
        buttonsIcon={[
          <UITools.ButtonIcon
            key={0}
            name="AutoLayout"
            onClick={onChangeLayoutType}
            selected={
              isMixedLayoutType ? false : layoutType !== LayoutType.default
            }
          />,
        ]}
        label={t(`${translationNameSpace}.section.3.label`)}
      >
        <></>
      </UITools.Section>
    </>
  );
};

export default Design;
