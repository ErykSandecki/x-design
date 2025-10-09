import { renderHook } from '@testing-library/react';

// hooks
import { useRenderContainer } from './useRenderContainer';

// types
import { HTMLContainerId } from '../../types/enums';

// utils
import { sleep } from 'test';

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  isJestRunning: (): any => false,
}));

describe('useRenderContainer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return html container there is no any available container', async () => {
    // mock
    const customId = 'customId';

    // before
    const { result } = renderHook(() => useRenderContainer(customId, HTMLContainerId.tooltip));

    // wait
    await sleep(1500);

    // result
    expect(result.current).toBe(null);
  });

  it('should return html container when custom id is empty', () => {
    // mock
    const customId = '';
    const element = document.createElement('div');

    // mock
    element.setAttribute('id', HTMLContainerId.tooltip);
    document.body.appendChild(element);

    // before
    const { result } = renderHook(() => useRenderContainer(customId, HTMLContainerId.tooltip));

    // result
    expect(result.current.id).toBe(HTMLContainerId.tooltip);
  });

  it('should return html container when custom id is passed', async () => {
    // mock
    const customId = 'customId';
    const element = document.createElement('div');

    // mock
    element.setAttribute('id', customId);
    document.body.appendChild(element);

    // before
    const { result } = renderHook(() => useRenderContainer(customId, HTMLContainerId.tooltip));

    // wait
    await sleep(200);

    // result
    expect(result.current.id).toBe(customId);
  });
});
