// types
import { TFields } from 'store/reduxHookForm/types';
import { TT } from 'types/generic';

export const lessThanOther =
  (fieldName: string, translatedField: string) =>
  (t: TT, value: number, subscribedFields: TFields): string =>
    subscribedFields[fieldName] === undefined ||
    value < (subscribedFields[fieldName]?.value as number)
      ? ''
      : t('formValidators.lessThanOther', { translatedField });
