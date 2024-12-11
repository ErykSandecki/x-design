import { Provider } from 'react-redux';
import { InputHTMLAttributes, RefObject } from 'react';
import { render } from '@testing-library/react';

// components
import Field from './Field';

// core
import { FormContext } from '../Form/Form';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

const stateMock = {
  ...reduxHookFormStateMock,
};

const Checkbox = () => {
  return <input type="checkbox" />;
};

const TextField = () => {
  return <input type="text" />;
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as Object),
  defer: (callback: any) => callback(),
}));

describe('Field snapshots', () => {
  it('should render as component', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field Component={TextField} name="testField" />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when ref is passed', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field
            Component={TextField}
            name="testField"
            ref={{} as RefObject<any>}
          />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with passed default value', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field
            Component={TextField}
            defaultValue="defaultValue"
            formatOnInit={(value: string) => value}
            name="testField"
          />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with passed function to format value on init', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field
            Component={TextField}
            formatOnInit={(value: string) => value}
            name="testField"
          />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when name is not defined & redux hook form empty', () => {
    // mock
    const store = configureStore({ [REDUX_HOOK_FORM]: {} });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field Component={TextField} name="testField" />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as number type', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field<{ type: InputHTMLAttributes<any>['type'] }, number>
            Component={TextField}
            defaultValue={0}
            name="testField"
            type="datetime-local"
          />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render as boolean type', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <FormContext.Provider value="formName">
          <Field Component={Checkbox} defaultValue={false} name="testField" />
        </FormContext.Provider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
