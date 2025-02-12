import { History } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { values } from 'lodash';

// types
import { TE2EDataAttributeProps } from 'shared/E2EDataAttributes/E2EDataAttribute';
import { TObject } from 'types/generic';
import { TStore } from '../store/types';

// utils
import { getDataTestAttribute } from 'shared/E2EDataAttributes/utils';

export const getByE2EAttribute = (
  container: Element | HTMLElement,
  e2eAttribute: string,
  e2eValue?: TE2EDataAttributeProps['value'],
): HTMLElement =>
  e2eValue
    ? container.querySelector(
        `[${getDataTestAttribute(e2eAttribute)}="${e2eValue}"]`,
      )!
    : container.querySelector(`[${getDataTestAttribute(e2eAttribute)}]`)!;

export const getProviderWrapper =
  (store: TStore, history?: History) =>
  ({ children }) =>
    history ? (
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          {children}
        </Router>
      </Provider>
    ) : (
      <Provider store={store}>{children}</Provider>
    );

export const mockAll = (pathName: string): TObject<jest.Mock<any, any>> => {
  const obj = jest.requireActual(pathName);
  const { mapValues } = jest.requireActual('lodash');

  return mapValues(obj, () => jest.fn());
};

export const sleep = async (time = 0): Promise<NodeJS.Timeout> =>
  await new Promise((resolve) => setTimeout(resolve, time));

export const matchClassName = (
  htmlElement: HTMLElement,
  targetClassName: string,
): boolean =>
  values(htmlElement.classList).some((className) =>
    className.includes(targetClassName),
  );
