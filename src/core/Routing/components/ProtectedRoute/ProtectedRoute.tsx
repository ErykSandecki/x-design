import { FunctionComponent, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// others
import { guardNameSpace } from '../../constants';

// store
// import { notificationStore } from 'store';

// types
// import { NotificationType } from 'components';
import { TProtectedRouteProps } from '../../types';

const ProtectedRoute: FunctionComponent<TProtectedRouteProps> = ({
  guards = [],
  children,
  ...props
}) => {
  // const { addNotification } = notificationStore.actions;
  const dispatch = useDispatch();
  const failedGuard = guards.find(({ guardCheck }) => !guardCheck());
  const wrapperProps = {
    ...props,
    path: `/${props.path}`,
  };

  useEffect(() => {
    if (failedGuard) {
      const { translationKey } = failedGuard;

      // if (translationKey) {
      //   dispatch(
      //     addNotification({
      //       messageTranslationKey: `${guardNameSpace}.${translationKey}.description`,
      //       notificationType: NotificationType.warning,
      //       titleTranslationKey: `${guardNameSpace}.${translationKey}.title`,
      //     }),
      //   );
      // }
    }
  }, [failedGuard]);

  if (failedGuard) {
    return failedGuard.renderFallback(props);
  }

  return <Route {...wrapperProps}>{children}</Route>;
};

export default ProtectedRoute;
