import { RefObject, WheelEvent } from 'react';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';
import { DATE_NOW_MOCKED } from 'test';

// utils
import { handleZoom } from '../handleZoom';

const lastWheelTime = { current: 0 };
const mockCallBack = jest.fn();
const ref = {
  current: { getBoundingClientRect: (): any => ({ left: 0, top: 0 }) },
};

describe('handleZoom', () => {
  it('should not trigger event when is no contol pressed', () => {
    // before
    handleZoom(
      BASE_3D,
      {
        clientX: 0,
        clientY: 0,
        deltaY: 0,
      } as WheelEvent,
      lastWheelTime,
      mockCallBack,
      mockCallBack,
      ref as RefObject<HTMLDivElement>,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should zoom out', () => {
    // before
    handleZoom(
      BASE_3D,
      {
        clientX: 0,
        clientY: 0,
        ctrlKey: true,
        deltaY: 1,
      } as WheelEvent,
      { current: DATE_NOW_MOCKED },
      mockCallBack,
      mockCallBack,
      ref as RefObject<HTMLDivElement>,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x: 0,
      y: 0,
      z: 0.965,
    });
  });

  it('should zoom in', () => {
    // before
    handleZoom(
      BASE_3D,
      {
        clientX: 0,
        clientY: 0,
        ctrlKey: true,
        deltaY: -1,
      } as WheelEvent,
      { current: DATE_NOW_MOCKED },
      mockCallBack,
      mockCallBack,
      ref as RefObject<HTMLDivElement>,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x: 0,
      y: 0,
      z: 1.035,
    });
  });

  it('should zoom with change position', () => {
    // before
    handleZoom(
      BASE_3D,
      {
        clientX: 100,
        clientY: 100,
        ctrlKey: true,
        deltaY: 1,
      } as WheelEvent,
      { current: DATE_NOW_MOCKED },
      mockCallBack,
      mockCallBack,
      ref as RefObject<HTMLDivElement>,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x: 3.500000000000003,
      y: 3.500000000000003,
      z: 0.965,
    });
  });
});
