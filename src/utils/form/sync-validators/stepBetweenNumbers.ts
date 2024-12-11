// types
import { TFields } from 'store/reduxHookForm/types';
import { TT } from 'types/generic';

export const stepBetweenNumbers =
  (fieldFromName: string, fieldToName: string) =>
  (t: TT, value: number, subscribedFields: TFields): string => {
    const valueFrom = subscribedFields[fieldFromName]?.value as number;
    const valueTo = subscribedFields[fieldToName]?.value as number;
    const maxValue = (valueFrom - valueTo) * -1;

    return value <= maxValue ? '' : t('formValidators.stepBetweenNumbers');
  };
