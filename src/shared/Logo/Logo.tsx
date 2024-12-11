import { FC, useContext } from 'react';
import { useHistory } from 'react-router';

// assets
import { ReactComponent as Light } from 'assets/images/logo--light.svg';
import { ReactComponent as Dark } from 'assets/images/logo-dark.svg';

// components
import E2EDataAttribute from 'shared/E2EDataAttributes/E2EDataAttribute';

// core
import { Context } from 'core/ContextProvider/ContextProvider';

// types
import { E2EAttribute } from '../../types/e2e';
import { RouteName } from 'core/Routing/constants/routes';

// utils
import { getRouteByName } from 'core/Routing/utils/getRouteByName';
import { Theme } from 'types/enums';

type TProps = {
  className?: string;
  shouldRedirect?: boolean;
};

const Logo: FC<TProps> = ({ className = '', shouldRedirect = true }) => {
  const { push } = useHistory();
  const { theme } = useContext(Context);

  const onClickHandler = (): void => {
    if (shouldRedirect) {
      push(getRouteByName(RouteName.home));
    }
  };

  return (
    <E2EDataAttribute type={E2EAttribute.logo}>
      {theme === Theme.dark ? (
        <Dark className={className} onClick={onClickHandler} />
      ) : (
        <Light className={className} onClick={onClickHandler} />
      )}
    </E2EDataAttribute>
  );
};

export default Logo;
