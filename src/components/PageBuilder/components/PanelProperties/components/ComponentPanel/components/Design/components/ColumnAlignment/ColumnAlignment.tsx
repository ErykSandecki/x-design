import { FC } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// hooks
import { useClickHorizontalAlignmentEvent } from './hooks/useClickHorizontalAlignmentEvent';
import { useClickVerticalAlignmentEvent } from './hooks/useClickVerticalAlignmentEvent';

// others
import { translationNameSpace } from './constants';

// store
import {
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

const ColumnAlignment: FC = () => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const disabled = element.parentId === '-1' || element.position === 'relative';
  const onClickHorizontalAlignment = useClickHorizontalAlignmentEvent();
  const onClickVerticalAlignment = useClickVerticalAlignmentEvent();
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn labels={[t(`${translationNameSpace}.label`)]}>
      <UITools.ButtonGroup
        buttons={[
          {
            disabled,
            name: 'AlignHorizontalLeft',
            onClick: () => onClickHorizontalAlignment(AlignmentHorizontal.left),
          },
          {
            disabled,
            name: 'AlignHorizontalCenter',
            onClick: () =>
              onClickHorizontalAlignment(AlignmentHorizontal.center),
          },
          {
            disabled,
            name: 'AlignHorizontalRight',
            onClick: () =>
              onClickHorizontalAlignment(AlignmentHorizontal.right),
          },
        ]}
      />
      <UITools.ButtonGroup
        buttons={[
          {
            disabled,
            name: 'AlignVerticalTop',
            onClick: () => onClickVerticalAlignment(AlignmentVertical.top),
          },
          {
            disabled,
            name: 'AlignVerticalCenter',
            onClick: () => onClickVerticalAlignment(AlignmentVertical.center),
          },
          {
            disabled,
            name: 'AlignVerticalBottom',
            onClick: () => onClickVerticalAlignment(AlignmentVertical.bottom),
          },
        ]}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnAlignment;
