import { FC } from 'react';

// components
import Page from 'components/Page/Page';

// others
import { className, classNames } from './classNames';
import { translationNameSpace } from './constants';

// styles
import styles from './home-page.scss';

// types
import { PageType } from 'components/Page/enums';

const HomePage: FC = () => (
  <Page
    isLoading={false}
    pageType={PageType.layout}
    translationNameSpace={translationNameSpace}
    withBackground
  >
    <div className={styles[classNames[className]]}></div>
  </Page>
);

export default HomePage;
