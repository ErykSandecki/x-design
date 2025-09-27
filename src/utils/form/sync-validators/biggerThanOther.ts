// types
import { TFields } from 'store/reduxHookForm/types';

export const biggerThanOther =
  (fieldName: string, translatedField: string) =>
  (t: TT, value: number, subscribedFields: TFields): string =>
    subscribedFields[fieldName] === undefined || value > (subscribedFields[fieldName]?.value as number)
      ? ''
      : t('formValidators.biggerThanOther', { translatedField });
