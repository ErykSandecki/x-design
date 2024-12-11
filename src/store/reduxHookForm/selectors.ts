import {
  compose as composeFp,
  get as getFp,
  getOr as getOrFp,
  isArray as isArrayFp,
  pick as pickFp,
  values as valuesFp,
} from 'lodash/fp';
import { createSelector, Selector } from 'reselect';

// store
import { REDUCER_KEY } from './actionsType';

// types
import { TField, TFields, TForm, TReduxHookFormState } from './types';
import { TFieldValue } from 'core/ReduxHookForm/types';
import { TMainState } from 'types/reducers';

export const reduxHookFormStateSelector: Selector<
  TMainState,
  TReduxHookFormState
> = getFp(REDUCER_KEY);

export const formSelectorCreator = (
  formName: string,
): Selector<TMainState, TForm> =>
  createSelector(
    reduxHookFormStateSelector,
    getOrFp({} as TForm, `${formName}`),
  );

export const formsSelectorCreator = (
  formNames: Array<string>,
): Selector<TMainState, Array<TForm>> =>
  createSelector(
    reduxHookFormStateSelector,
    composeFp(valuesFp, pickFp(formNames)),
  );

export const formAttributesSelectorCreator = (
  attributes: string | Array<string>,
  formName: string,
): Selector<TMainState, Partial<TForm> | TForm[keyof TForm]> =>
  createSelector(
    formSelectorCreator(formName),
    isArrayFp(attributes) ? pickFp(attributes) : getFp(attributes),
  );

export const fieldsSelectorCreator = (
  formName: string,
  fieldsNames?: Array<string>,
): Selector<TMainState, TFields | undefined> =>
  createSelector(
    formSelectorCreator(formName),
    fieldsNames
      ? composeFp(pickFp(fieldsNames), getFp('fields'))
      : getFp(`fields`),
  );

export const fieldSelectorCreator = <V extends TFieldValue>(
  formName: string,
  name: string,
): Selector<TMainState, TField<V>> =>
  createSelector(
    fieldsSelectorCreator(formName),
    getOrFp({} as TField<V>, name),
  );

export const fieldAttributesSelectorCreator = (
  attributes: string | Array<string>,
  formName: string,
  name: string,
): Selector<TMainState, Partial<TField>> | undefined =>
  createSelector(
    fieldSelectorCreator(formName, name),
    isArrayFp(attributes) ? pickFp(attributes) : getFp(attributes),
  );
