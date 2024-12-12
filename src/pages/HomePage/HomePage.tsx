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
import HTMLEditor from 'components/HTMLEditor/HTMLEditor';

const HomePage: FC = () => (
  <Page pageType={PageType.blank} translationNameSpace={translationNameSpace}>
    <div className={styles[classNames[className]]}>
      <HTMLEditor />
    </div>
  </Page>
);

export default HomePage;
