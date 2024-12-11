import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import Field from '../Field/Field';
import Form from './Form';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

// utils
import { required } from 'utils/form/syncValidators';

const stateMock = {
  ...reduxHookFormStateMock,
};

const Button = () => {
  return <button type="submit">Click</button>;
};

const TextField = () => {
  return <input type="text" />;
};

describe('Form snapshots', () => {
  it('should render Form', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment, getByText } = render(
      <Provider store={store}>
        <Form onSubmit={() => {}} formName="testForm">
          <Field Component={TextField} name="testField" />
          <Button />
        </Form>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with passed e2evalue', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment, getByText } = render(
      <Provider store={store}>
        <Form e2eValue="e2eValue" onSubmit={() => {}} formName="testForm">
          <Field Component={TextField} name="testField" />
          <Button />
        </Form>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Form when is not valid', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment, getByText } = render(
      <Provider store={store}>
        <Form onSubmit={() => {}} formName="testForm">
          <Field
            Component={TextField}
            name="testField"
            parse={(value: string) => value}
            syncValidators={[required]}
          />
          <Button />
        </Form>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with init form', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {},
    });

    // before
    const { asFragment, getByText } = render(
      <Provider store={store}>
        <Form onSubmit={() => {}} formName="testForm">
          <Field
            Component={TextField}
            name="testField"
            parse={(value: string) => value}
            syncValidators={[required]}
          />
          <Button />
        </Form>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Form with not parsed value', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM],
        testForm: {
          ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields,
            testField: {
              ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields
                .testField,
              parse: undefined,
            },
          },
        },
      },
    });

    // before
    const { asFragment, getByText } = render(
      <Provider store={store}>
        <Form onSubmit={() => {}} formName="testForm">
          <Field
            Component={TextField}
            name="testField"
            parse={(value: string) => value}
          />
          <Button />
        </Form>
      </Provider>,
    );

    // action
    fireEvent.click(getByText('Click'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
