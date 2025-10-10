import { render } from '@testing-library/react';

// components
import KeyboardKeysGroup from './KeyboardKeysGroup';

// types
import { KeyboardKeys } from 'types';

describe('KeyboardKeysGroup snapshots', () => {
  it('should render with one key', () => {
    // before
    const { asFragment } = render(<KeyboardKeysGroup keyboardShortcutsGroup={[{ secondaryKey: KeyboardKeys.a }]} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with title', () => {
    // before
    const { asFragment } = render(
      <KeyboardKeysGroup keyboardShortcutsGroup={[{ secondaryKey: KeyboardKeys.a }]} title="title" />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with couple keys', () => {
    // before
    const { asFragment } = render(
      <KeyboardKeysGroup
        keyboardShortcutsGroup={[{ primaryKeys: ['alt', 'meta', 'shift'], secondaryKey: KeyboardKeys.a }]}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with couple keys and optional', () => {
    // before
    const { asFragment } = render(
      <KeyboardKeysGroup
        keyboardShortcutsGroup={[
          { primaryKeys: ['alt', 'meta', 'shift'], secondaryKey: KeyboardKeys.a },
          { primaryKeys: ['alt', 'meta', 'shift'], secondaryKey: KeyboardKeys.a },
        ]}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
