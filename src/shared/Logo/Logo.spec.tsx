import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';

// components
import Logo from './Logo';

// types
import { E2EAttribute } from 'types/e2e';
import { Theme } from 'types/enums';
import { RouteName } from 'core/Routing/constants/routes';

// utils
import { getRouteByName } from 'core/Routing/utils/getRouteByName';
import { getByE2EAttribute } from 'test/testHelpers';

const history = createMemoryHistory({
  initialEntries: [getRouteByName(RouteName.home)],
});

describe('Logo snapshots', () => {
  it('should render in light mode', () => {
    // before
    const { asFragment } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render in dark mode', () => {
    // mock
    React.useContext = () => ({ theme: Theme.dark }) as any;

    // before
    const { asFragment } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Logo behaviors', () => {
  beforeEach(() => {
    history.push(getRouteByName(RouteName.home));
  });

  it('should redirect on Home Page', () => {
    // before
    const { container } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.logo));

    // result
    expect(history.location.pathname).toBe(getRouteByName(RouteName.home));
  });

  it('should not redirect on page when flag is false', () => {
    // before
    const { container } = render(
      <Router history={history}>
        <Logo shouldRedirect={false} />
      </Router>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.logo));

    // result
    expect(history.location.pathname).toBe(getRouteByName(RouteName.home));
  });
});
