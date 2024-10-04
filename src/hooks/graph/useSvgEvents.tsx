import { useEffect, useState, useCallback } from 'react';
import useDeviceCheck from '../useDeviceCheck';

interface SVGEventHandlers {
  initialMouseMove?: (e: PointerEvent | TouchEvent) => void;
  initialMouseUp?: (e: PointerEvent | TouchEvent) => void;
}

export const useSVGEvents = ({ initialMouseMove, initialMouseUp }: SVGEventHandlers) => {
  const [mouseMoveHandler, setMouseMoveHandler] = useState<(e: PointerEvent | TouchEvent) => void>(initialMouseMove || (() => {}));
  const [mouseUpHandler, setMouseUpHandler] = useState<(e: PointerEvent | TouchEvent) => void>(initialMouseUp || (() => {}));

  const deviceType = useDeviceCheck();

  const handleMouseMove = useCallback((e: PointerEvent | TouchEvent) => {
    if (mouseMoveHandler) {
      mouseMoveHandler(e);
    }
  }, [mouseMoveHandler]);

  const handleMouseUp = useCallback((e: PointerEvent | TouchEvent) => {
    if (mouseUpHandler) {
      mouseUpHandler(e);
    }
  }, [mouseUpHandler]);

  useEffect(() => {

    if (deviceType === 'desktop') {
      window.addEventListener('pointermove', handleMouseMove);
      window.addEventListener('pointerup', handleMouseUp);
      window.addEventListener('pointercancel', handleMouseUp);
    }
    else {
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchcancel', handleMouseUp);
    }

    return () => {
      if (deviceType === 'desktop') {
        window.removeEventListener('pointermove', handleMouseMove);
        window.removeEventListener('pointerup', handleMouseUp);
        window.removeEventListener('pointercancel', handleMouseUp);
      }
      else {
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
        window.removeEventListener('touchcancel', handleMouseUp);
      }
    };
  }, [handleMouseMove, handleMouseUp, deviceType]);

  const updateHandlers = (newMouseMoveHandler?: (e: PointerEvent | TouchEvent) => void, newMouseUpHandler?: (e: PointerEvent | TouchEvent) => void) => {
    setMouseMoveHandler(() => newMouseMoveHandler);
    setMouseUpHandler(() => newMouseUpHandler);
  };

  return {
    handleMouseMove,
    handleMouseUp,
    updateHandlers,
  };
};
