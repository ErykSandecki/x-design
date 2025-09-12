// types
import { TElement } from 'types';
import {
  TElementDynamicData,
  TElementsData,
  TElementStaticData,
} from '../../types';

export const reducedData = (
  data: Array<{
    allData: TElement;
    dynamicData: TElementDynamicData;
    staticData: TElementStaticData;
  }>,
): TElementsData =>
  data.reduce(
    (obj, data) => ({
      ...obj,
      allData: { ...obj.allData, [data.allData.id]: data.allData },
      dynamicData: {
        ...obj.dynamicData,
        [data.dynamicData.id]: data.dynamicData,
      },
      staticData: {
        ...obj.staticData,
        [data.staticData.id]: data.staticData,
      },
    }),
    {
      allData: {},
      dynamicData: {},
      staticData: {},
    },
  );
