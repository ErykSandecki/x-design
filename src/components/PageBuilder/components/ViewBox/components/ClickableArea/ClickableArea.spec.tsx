// import { Provider } from 'react-redux';
// import { render } from '@testing-library/react';

// // components
// import ClickableArea from './ClickableArea';

// // mocks
// import 'test/mocks/sagas/allSagas';

// // others
// import { BASE_RECT } from 'shared';
// import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// // store
// import { configureStore } from 'store/store';
// import {
//   eventsMock,
//   pageBuilderStateMock,
// } from 'test/mocks/reducer/pageBuilderMock';

// const stateMock = {
//   ...pageBuilderStateMock,
// };

// describe('ClickableArea snapshots', () => {
//   it('should render ClickableArea', () => {
//     // mock
//     const store = configureStore(stateMock);

//     // before
//     const { asFragment } = render(
//       <Provider store={store}>
//         <ClickableArea rectCoordinates={BASE_RECT} />
//       </Provider>,
//     );

//     // result
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it('should not render when isMultipleMoving', () => {
//     // mock
//     const store = configureStore({
//       ...stateMock,
//       [PAGE_BUILDER]: {
//         ...stateMock[PAGE_BUILDER],
//         events: {
//           ...eventsMock,
//           isMultipleMoving: true,
//         },
//       },
//     });

//     // before
//     const { asFragment } = render(
//       <Provider store={store}>
//         <ClickableArea rectCoordinates={BASE_RECT} />
//       </Provider>,
//     );

//     // result
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
