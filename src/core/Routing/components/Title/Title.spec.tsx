import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

// components
import Title from './Title';

// others
import { APPLICATION_NAME } from 'constant/constants';

// types
import { RouteName } from '../../constants/routes';

// utils
import { getRouteByName } from '../../utils/getRouteByName';
import { sleep } from 'test/testHelpers';

const history = createMemoryHistory({
  initialEntries: [getRouteByName(RouteName.home)],
});

describe('Title snapshots', () => {
  it('should render Title', () => {
    // before
    const { asFragment } = render(
      <HelmetProvider>
        <Router history={history}>
          <Title />
        </Router>
      </HelmetProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with handle error', () => {
    // before
    history.push('*');

    const { asFragment } = render(
      <HelmetProvider>
        <Router history={history}>
          <Title />
        </Router>
      </HelmetProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Title behaviors', () => {
  beforeEach(() => {
    history.push(getRouteByName(RouteName.home));
  });

  it('should set proper title', async () => {
    // before
    render(
      <HelmetProvider>
        <Router history={history}>
          <Title />
        </Router>
      </HelmetProvider>,
    );

    // wait
    await sleep(100);

    // result
    expect(document.title).toBe(`Home - ${APPLICATION_NAME}`);
  });
});
