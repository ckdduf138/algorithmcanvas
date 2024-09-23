import { useRef, useEffect, useState, useCallback } from 'react';

interface SVGEventHandlers {
  initialMouseMove?: (e: MouseEvent) => void;  // 처음에 기본적으로 사용할 MouseMove
  initialMouseUp?: (e: MouseEvent) => void;    // 처음에 기본적으로 사용할 MouseUp
}

export const useSVGEvents = ({ initialMouseMove, initialMouseUp }: SVGEventHandlers) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [mouseMoveHandler, setMouseMoveHandler] = useState<(e: MouseEvent) => void>(initialMouseMove || (() => {}));
  const [mouseUpHandler, setMouseUpHandler] = useState<(e: MouseEvent) => void>(initialMouseUp || (() => {}));

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (mouseMoveHandler) {
      mouseMoveHandler(e);
    }
  }, [mouseMoveHandler]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (mouseUpHandler) {
      mouseUpHandler(e);
    }
  }, [mouseUpHandler]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]); // 수정된 부분

  const updateHandlers = (newMouseMoveHandler?: (e: MouseEvent) => void, newMouseUpHandler?: (e: MouseEvent) => void) => {
    setMouseMoveHandler(() => newMouseMoveHandler);
    setMouseUpHandler(() => newMouseUpHandler);
  };

  return {
    svgRef,
    handleMouseMove,
    handleMouseUp,
    updateHandlers,
  };
};
