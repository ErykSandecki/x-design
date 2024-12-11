import { FC, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

// others
import { APPLICATION_NAME } from 'constant/constants';

// utils
import { getTitlesTranslationKeys } from './utils';

const Title: FC = () => {
  const titlesTranslationKeys = useMemo(() => getTitlesTranslationKeys(), []);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (pathname in titlesTranslationKeys) {
    return (
      <Helmet>
        <title>
          {t(
            titlesTranslationKeys[
              pathname as keyof typeof titlesTranslationKeys
            ],
          )}
          {` - ${APPLICATION_NAME}`}
        </title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>404 - {APPLICATION_NAME}</title>
    </Helmet>
  );
};

export default Title;
