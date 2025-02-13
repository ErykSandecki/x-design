// types
import { TClassNameWithModificator } from 'types/classNames';
import { Theme } from 'types/enums/theme';

export type TThemeModificator =
  | {
      readonly [Theme.dark]: string;
      readonly [Theme.light]?: undefined;
      readonly name: string;
    }
  | {
      readonly [Theme.dark]?: undefined;
      readonly [Theme.light]: string;
      readonly name: string;
    };

export type TThemeClassNames<T> = {
  readonly [K in keyof T]: T[K] extends TClassNameWithModificator
    ? {
        readonly name: TThemeModificator;
        readonly modificators: {
          readonly [key in keyof T[K]['modificators']]: TThemeModificator;
        };
      }
    : TThemeModificator;
};

export type TThemeModificatorConditional = [
  TThemeModificator | string,
  boolean,
];

export type TThemeClassNamesApplierArgs = Array<
  TThemeModificator | TThemeModificatorConditional | string
>;

export type TThemeClassNamesApplier = (
  ...args: TThemeClassNamesApplierArgs
) => string;
