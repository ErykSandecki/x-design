import { render } from '@testing-library/react';

// components
import KeyboardKeysGroup from './KeyboardKeysGroup';

describe('KeyboardKeysGroup snapshots', () => {
  it('should render with one key', () => {
    // before
    const { asFragment } = render(<KeyboardKeysGroup keyboardShortcutsGroup={[['A']]} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with title', () => {
    // before
    const { asFragment } = render(<KeyboardKeysGroup keyboardShortcutsGroup={[['A']]} title="title" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with icon', () => {
    // before
    const { asFragment } = render(<KeyboardKeysGroup keyboardShortcutsGroup={[[{ name: 'AlignHorizontalCenter' }]]} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with couple keys', () => {
    // before
    const { asFragment } = render(<KeyboardKeysGroup keyboardShortcutsGroup={[['A', 'B', 'C']]} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with couple keys and optional', () => {
    // before
    const { asFragment } = render(
      <KeyboardKeysGroup
        keyboardShortcutsGroup={[
          ['A', 'B', 'C'],
          ['D', 'E', 'F'],
        ]}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
