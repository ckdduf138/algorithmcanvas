import { useRef, useEffect, useState } from 'react';

interface SVGEventHandlers {
  initialMouseMove?: (e: MouseEvent) => void;  // 처음에 기본적으로 사용할 MouseMove
  initialMouseUp?: (e: MouseEvent) => void;    // 처음에 기본적으로 사용할 MouseUp
}

export const useSVGEvents = ({ initialMouseMove, initialMouseUp}: SVGEventHandlers ) => {
  const svgRef = useRef<SVGSVGElement | null>(null); 

  const [mouseMoveHandler, setMouseMoveHandler] = useState<(e: MouseEvent) => void>(initialMouseMove || (() => {}));
  const [mouseUpHandler, setMouseUpHandler] = useState<(e: MouseEvent) => void>(initialMouseUp || (() => {}));

  // MouseMove 이벤트 핸들러 (window 범위로 글로벌 관리)
  const handleMouseMove = (e: MouseEvent) => {
    if (mouseMoveHandler) {
      mouseMoveHandler(e);  // 동적으로 설정된 mouseMoveHandler를 호출
    }
  };

  // MouseUp 이벤트 핸들러 (window 범위로 글로벌 관리)
  const handleMouseUp = (e: MouseEvent) => {
    if(mouseUpHandler) {
      mouseUpHandler(e);  // 동적으로 설정된 mouseUpHandler를 호출
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseMoveHandler, mouseUpHandler]);

  // 핸들러 변경 함수 제공
  const updateHandlers = (newMouseMoveHandler?: (e: MouseEvent) => void, newMouseUpHandler?: (e: MouseEvent) => void) => {
    setMouseMoveHandler(() => newMouseMoveHandler);  // () => newMouseMoveHandler로 래핑
    setMouseUpHandler(() => newMouseUpHandler);      // () => newMouseUpHandler로 래핑
  };

  return {
    svgRef,
    handleMouseMove,
    handleMouseUp,
    updateHandlers,
  };
};
