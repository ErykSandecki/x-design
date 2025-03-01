import { useEffect } from 'react';

export type TUseWheelEvent = void;

export const useWheelEvent = (): TUseWheelEvent => {
  const handleWheel = (event: WheelEvent): void => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);
};
