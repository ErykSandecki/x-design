import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

// store
import { historyChanged } from 'store/router/actions';
import { redirectToSelector } from 'store/router/selectors';

// types
import { RouterAction } from 'types/router/enums';

export type TUseHandleRouter = void;

export const useHandleRouter = (): TUseHandleRouter => {
  const dispatch = useDispatch();
  const redirectTo = useSelector(redirectToSelector);
  const urlParams = new URLSearchParams(window.location.search);
  const query = Object.fromEntries(urlParams.entries());

  const {
    action,
    location: { pathname, search },
    push,
    replace,
  } = useHistory();

  useEffect(() => {
    dispatch(historyChanged(action, { pathname, query, search }));
  }, [action, pathname, search]);

  useEffect(() => {
    if (redirectTo) {
      const { action, to } = redirectTo;

      switch (action) {
        case RouterAction.push:
          push(to);
          break;
        default:
          replace(to);
          break;
      }
    }
  }, [redirectTo]);
};
