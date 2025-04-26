import { FC } from 'react';

// components
import ColumnHeader from './components/ColumnHeader/ColumnHeader';
import { UITools } from 'shared';

const Design: FC = () => {
  return (
    <>
      <UITools.Section>
        <ColumnHeader />
      </UITools.Section>
    </>
  );
};

export default Design;
