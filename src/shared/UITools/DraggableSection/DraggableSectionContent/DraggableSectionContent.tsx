import cx from 'classnames';
import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

// components
import ButtonIcon from '../../ButtonIcon/ButtonIcon';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// styles
import styles from './draggable-section-content.module.scss';

// utils
import { stopPropagation } from 'utils';

export type TDraggableSectionContentProps = {
  element: ReactElement;
  index: number;
  onClickRemove: TFunc<[number]>;
  onClickVisible: TFunc<[number]>;
  visible: boolean;
};

export const DraggableSectionContent: FC<TDraggableSectionContentProps> = ({
  element,
  index,
  onClickRemove,
  onClickVisible,
  visible,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div onMouseDown={stopPropagation} style={{ width: '100%' }}>
        {element}
      </div>
      <div className={cx(styles.DraggableSectionContent)}>
        <ButtonIcon
          disabledSelection
          e2eValue="toggle-visibility"
          iconSize={14}
          name={visible ? 'EyesOpened' : 'EyesClosed'}
          onClick={() => onClickVisible(index)}
          onMouseDown={stopPropagation}
          tooltip={{
            autoPositioning: true,
            content: visible
              ? t(`${TOOLTIP_TRANSLATION_KEY}.appearance.hide`)
              : t(`${TOOLTIP_TRANSLATION_KEY}.appearance.show`),
          }}
        />
        <ButtonIcon
          disabledSelection
          e2eValue="remove"
          iconSize={14}
          name="Minus"
          onClick={() => onClickRemove(index)}
          onMouseDown={stopPropagation}
          tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.remove`) }}
        />
      </div>
    </>
  );
};

export default DraggableSectionContent;
