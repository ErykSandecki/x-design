// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { TTab } from 'shared/UITools/components/Tabs/types';

export const translationNameSpace = `${parentNameSpace}.panel`;

export const TABS: Array<TTab> = [
  {
    labelTranslationKey: `${translationNameSpace}.tabs.1`,
    name: 'custom',
  },
];
