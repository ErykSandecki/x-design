import { createMemoryHistory } from 'history';
import { noop } from 'lodash';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

// components
import Page from './Page';

// types
import { PageType } from './enums';
import { RouteName } from 'core/Routing/constants/routes';

// utils
import { getRouteByName } from 'core/Routing/utils/getRouteByName';

const history = createMemoryHistory({
  initialEntries: [getRouteByName(RouteName.home)],
});

describe('Page snapshots', () => {
  it('should render blank page', () => {
    // before
    const { asFragment } = render(<Page>children</Page>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render page edit', () => {
    // before
    const { asFragment } = render(
      <Router history={history}>
        <Page onClick={noop} pageType={PageType.edit}>
          children
        </Page>
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render page edit with background', () => {
    // before
    const { asFragment } = render(
      <Router history={history}>
        <Page onClick={noop} pageType={PageType.edit} withBackground>
          children
        </Page>
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render page layout', () => {
    // before
    const { asFragment } = render(
      <Router history={history}>
        <Page isLoading={false} pageType={PageType.layout}>
          children
        </Page>
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render page layout with background', () => {
    // before
    const { asFragment } = render(
      <Router history={history}>
        <Page isLoading={false} pageType={PageType.layout} withBackground>
          children
        </Page>
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
