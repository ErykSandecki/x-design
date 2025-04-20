// import { MouseEvent } from 'react';
// import { renderHook } from '@testing-library/react';

// // hooks
// import { useMouseDownEvent } from '../useMouseDownEvent';

// // others
// import { BASE_3D } from 'shared/ZoomBox/constants';

// // types
// import { MouseButton } from 'types';
// import { MouseMode } from 'components/PageBuilder/enums';

// const mockCallBack = jest.fn();

// describe('useMouseMoveEvent', () => {
//   it(`should trigger event for toolBeltA`, () => {
//     // before
//     const { result } = renderHook(() =>
//       useMouseDownEvent(
//         BASE_3D,
//         MouseMode.toolBeltA,
//         mockCallBack,
//         mockCallBack,
//       ),
//     );

//     // action
//     result.current({ buttons: MouseButton.lmb } as MouseEvent);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });

//   it(`should trigger event for default`, () => {
//     // before
//     const { result } = renderHook(() =>
//       useMouseDownEvent(BASE_3D, MouseMode.default, mockCallBack, mockCallBack),
//     );

//     // action
//     result.current({ buttons: MouseButton.lmb } as MouseEvent);

//     // result
//     expect(mockCallBack.mock.calls.length).toBe(1);
//   });
// });
