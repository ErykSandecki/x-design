// import { noop } from 'lodash';
// import { Provider } from 'react-redux';
// import { fireEvent, render } from '@testing-library/react';

// // components
// import MoveableElement from './MoveableElement';

// // mocks
// import { strategyEditorStateMock } from 'test/mocks/reducer/strategyEditorMock';

// // store
// import { configureStore } from 'store/store';

// // types
// import { MouseMode } from 'components/Editor/enums';

// const mockCallBack = jest.fn();

// const stateMock = {
//   ...strategyEditorStateMock,
// };

// jest.mock('lodash', () => ({
//   ...(jest.requireActual('lodash') as Object),
//   throttle: (callback: any) => (value: any) => callback(value),
// }));

// describe('MoveableElement snapshots', () => {
//   it('should render MoveableElement', () => {
//     // mock
//     const store = configureStore(stateMock);

//     // before
//     const { asFragment } = render(
//       <Provider store={store}>
//         <MoveableElement
//           handleMouseDown={noop}
//           handleMouseMove={noop}
//           handleMouseUp={noop}
//           mouseMode={MouseMode.default}
//         >
//           MoveableElement
//         </MoveableElement>
//       </Provider>,
//     );

//     // result
//     expect(asFragment()).toMatchSnapshot();
//   });
// });

// describe('MoveableElement behaviors', () => {
//   it('should call mousedown ', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement
//           handleMouseDown={mockCallBack}
//           mouseMode={MouseMode.default}
//         >
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });

//   it('should not call mousedown when mouse button is wrong', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement
//           handleMouseDown={mockCallBack}
//           mouseMode={MouseMode.default}
//         >
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 1 });

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(0);
//   });

//   it('should not call mousedown when is not passsed', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement mouseMode={MouseMode.default}>
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(0);
//   });

//   it('should call mouseup', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement
//           handleMouseUp={mockCallBack}
//           mouseMode={MouseMode.default}
//         >
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });
//     fireEvent.mouseUp(document);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });

//   it('should not call mouseup when is not passsed', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement mouseMode={MouseMode.default}>
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });
//     fireEvent.mouseUp(document);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(0);
//   });

//   it('should call mousemove', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement
//           handleMouseMove={mockCallBack}
//           mouseMode={MouseMode.default}
//         >
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });
//     fireEvent.mouseMove(document);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });

//   it('should not call mousemove when is not passsed', () => {
//     // mock
//     const store = configureStore(stateMock);
//     const id = 'id';

//     // before
//     const { container } = render(
//       <Provider store={store}>
//         <MoveableElement mouseMode={MouseMode.default}>
//           <div id={id}></div>
//         </MoveableElement>
//       </Provider>,
//     );

//     // action
//     fireEvent.mouseDown(container.querySelector(`#${id}`)!, { button: 0 });
//     fireEvent.mouseMove(document);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(0);
//   });
// });
