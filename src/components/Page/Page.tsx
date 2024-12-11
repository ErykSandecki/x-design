// components
// import PageEdit from './components/PageEdit/PageEdit';
// import PageLayout from './components/PageLayout/PageLayout';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './styles/page.scss';

// types
import { PageType } from './enums';
import { TPageType, TRestProps } from './types';

type TProps<T extends TPageType[keyof TPageType]> = T extends PageType.edit
  ? { isLoading?: never; onClick: () => void } & TRestProps<T>
  : T extends PageType.layout
    ? { isLoading: boolean; onClick?: never } & TRestProps<T>
    : {
        isLoading?: never;
        onClick?: never;
        withBackground?: never;
      } & TRestProps<T>;

const Page = <T extends TPageType[keyof TPageType]>({
  children,
  isLoading,
  onClick,
  pageType = PageType.blank,
  translationNameSpace = '',
  withBackground = false,
}: TProps<T>) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (pageType === PageType.edit) {
    return (
      <div className={cx(classNamesWithTheme[className])}>
        {/* <PageEdit
          onClick={onClick}
          translationNameSpace={translationNameSpace}
          withBackground={withBackground}
        >
          {children}
        </PageEdit> */}
      </div>
    );
  }

  if (pageType === PageType.layout) {
    return (
      <div className={cx(classNamesWithTheme[className])}>
        {/* <PageLayout
          isLoading={isLoading}
          translationNameSpace={translationNameSpace}
          withBackground={withBackground}
        >
          {children}
        </PageLayout> */}
      </div>
    );
  }

  return <div className={cx(classNamesWithTheme[className])}>{children}</div>;
};

export default Page;
