import { fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnFill from './ColumnFill';

// mocks
import {
  backgroundMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, TColor } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id, 'test-2'],
          },
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  rgbToHex: (): any => '#ffffff',
}));

describe('ColumnFill snapshots', () => {
  it('should render ColumnFill', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnFill behaviors', () => {
  it('should change background visibility', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.icon, 'eyes-opened'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].visible).toBe(false);
  });

  it('should change alpha', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);
    const input = getByE2EAttribute(sectionItem, E2EAttribute.textFieldInput, 'alpha');

    // action
    fireEvent.change(input, {
      target: { value: '50' },
    });
    fireEvent.blur(input);

    // result
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].properties as TColor).alpha,
    ).toBe('50');
  });

  it('should change color', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);
    const input = getByE2EAttribute(sectionItem, E2EAttribute.textFieldInput, 'color');

    // action
    fireEvent.change(input, {
      target: { value: 'ffffff' },
    });
    fireEvent.blur(input);

    // result
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].properties as TColor).color,
    ).toBe('#ffffff');
  });

  it('should change format', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.color));

    // find
    const dropdown = await screen.findByRole('combobox');

    // action
    await fireEvent.mouseDown(dropdown);

    // find
    const rgbOption = await screen.findByText('RGB');

    // action
    fireEvent.click(rgbOption);

    // result
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].properties as TColor).format,
    ).toBe('rgb');
  });

  it('should active color sampler', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.color));

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.buttonIcon, 'sampler'));

    // result
    expect(store.getState()[PAGE_BUILDER].events.colorSampler).toBe(true);
  });

  it('should get color from sampler', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.color));

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.buttonIcon, 'sampler'));

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.button, 'color-sampler'));

    // result
    expect(store.getState()[PAGE_BUILDER].events.colorSampler).toBe(false);
    expect(
      (store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].properties as TColor).color,
    ).toBe('#ffffff');
  });

  it('should remove fill', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.buttonIcon, 'remove'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background).toStrictEqual([]);
  });

  it('should toggle visible', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 0);

    // action
    fireEvent.click(getByE2EAttribute(sectionItem, E2EAttribute.buttonIcon, 'toggle-visibility'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background[0].visible).toBe(false);
  });

  it('should change order fills', () => {
    // mock
    const store = configureStore({
      ...pageBuilderStateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id, 'test-2'],
              },
              [elementMock.id]: {
                ...elementMock,
                background: [
                  backgroundMock[0],
                  { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, alpha: 0 } },
                ],
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFill />
      </Provider>,
    );

    // find
    const sectionItem = getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 1);

    // action
    fireEvent.mouseDown(sectionItem);
    fireEvent.mouseMove(sectionItem);
    fireEvent.mouseUp(window, { target: { getAttribute: () => '0' } });

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].background).toStrictEqual([
      { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, alpha: 0 } },
      backgroundMock[0],
    ]);
  });
});
