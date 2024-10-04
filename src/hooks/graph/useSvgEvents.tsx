import { useEffect, useState, useCallback } from 'react';

interface SVGEventHandlers {
  initialMouseMove?: (e: PointerEvent) => void;
  initialMouseUp?: (e: PointerEvent) => void;
}

export const useSVGEvents = ({ initialMouseMove, initialMouseUp }: SVGEventHandlers) => {
  const [mouseMoveHandler, setMouseMoveHandler] = useState<(e: PointerEvent) => void>(initialMouseMove || (() => {}));
  const [mouseUpHandler, setMouseUpHandler] = useState<(e: PointerEvent) => void>(initialMouseUp || (() => {}));

  const handleMouseMove = useCallback((e: PointerEvent) => {
    if (mouseMoveHandler) {
      mouseMoveHandler(e);
    }
  }, [mouseMoveHandler]);

  const handleMouseUp = useCallback((e: PointerEvent) => {
    if (mouseUpHandler) {
      mouseUpHandler(e);
    }
  }, [mouseUpHandler]);

  useEffect(() => {
    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('pointerup', handleMouseUp);
    window.addEventListener('pointercancel', handleMouseUp);

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('pointerup', handleMouseUp);
      window.removeEventListener('pointercancel', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const updateHandlers = (newMouseMoveHandler?: (e: PointerEvent) => void, newMouseUpHandler?: (e: PointerEvent) => void) => {
    setMouseMoveHandler(() => newMouseMoveHandler);
    setMouseUpHandler(() => newMouseUpHandler);
  };

  return {
    handleMouseMove,
    handleMouseUp,
    updateHandlers,
  };
};
