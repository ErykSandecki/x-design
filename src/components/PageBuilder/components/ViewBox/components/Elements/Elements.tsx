import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import Frame from './components/Frame/Frame';

// store
import { staticDataSelector } from 'store/pageBuilder/selectors';

// types
import { ElementType } from 'types';

const Elements: FC = () => {
  const staticData = useSelector(staticDataSelector);

  return staticData.map(({ id, type }) => {
    switch (type) {
      case ElementType.frame:
        return <Frame id={id} />;
      default:
        return <></>;
    }
  });
};

export default memo(Elements);
