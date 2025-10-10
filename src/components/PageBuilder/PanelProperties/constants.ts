// others
import { translationNameSpace as parentNameSpace } from '../constants';

// types
import { TTab } from '../../../shared/UITools/Tabs/types';

export const translationNameSpace = `${parentNameSpace}.panelProperties`;

export const TABS: Array<TTab> = [
  {
    labelTranslationKey: `${translationNameSpace}.tabs.1`,
    name: 'design',
  },
  {
    labelTranslationKey: `${translationNameSpace}.tabs.2`,
    name: 'prototype`,',
  },
];
