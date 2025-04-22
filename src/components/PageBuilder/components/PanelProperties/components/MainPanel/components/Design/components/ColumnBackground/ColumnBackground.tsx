import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { changeBackground } from 'store/pageBuilder/actions';
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TColor } from 'types';

const ColumnBackground: FC = () => {
  const dispatch = useDispatch();
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const { alpha, color, format } = background.properties as TColor;
  const visible = background.visible;

  return (
    <UITools.SectionColumn
      buttonIcon={
        <UITools.ButtonIcon
          name={visible ? 'EyesOpened' : 'EyesClosed'}
          onClick={() =>
            dispatch(changeBackground({ visible: !visible }, '-1'))
          }
        />
      }
    >
      <UITools.ColorPicker
        alpha={alpha}
        color={color}
        format={format}
        onChangeAlpha={(alpha) =>
          dispatch(
            changeBackground({ properties: { alpha, color, format } }, '-1'),
          )
        }
        onChangeColor={(alpha, color) =>
          dispatch(
            changeBackground({ properties: { alpha, color, format } }, '-1'),
          )
        }
        onFormatChange={(format) =>
          dispatch(
            changeBackground({ properties: { alpha, color, format } }, '-1'),
          )
        }
        placement="leftBottom"
      />
    </UITools.SectionColumn>
  );
};

export default ColumnBackground;
