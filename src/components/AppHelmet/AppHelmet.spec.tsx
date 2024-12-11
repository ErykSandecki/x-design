import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';

// components
import AppHelmet from './AppHelmet';

// utils
import { sleep } from 'test/testHelpers';

const getFavicon = (): null | string => {
  const nodeList = document.getElementsByTagName('link');

  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].getAttribute('rel') === 'icon') {
      return nodeList[i].getAttribute('href');
    }
  }

  return '';
};

describe('AppHelmet behaviors', () => {
  it('should return favicon', async () => {
    // before
    render(
      <HelmetProvider>
        <AppHelmet />
      </HelmetProvider>,
    );

    // wait
    await sleep(100);

    // result
    expect(getFavicon()).toBe('/favicon.ico');
  });
});
