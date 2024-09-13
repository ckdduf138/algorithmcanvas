import { useState } from 'react';
import { useWindowSize } from '../getWindowSize';

interface CirclePosition {
  id: number;
  cx: number;
  cy: number;
  r: number;
}

export const useDragCopy = () => {
  const [draggingCircle, setDraggingCircle] = useState<CirclePosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { height } = useWindowSize();

  const headerHeight = height * 0.1;


  const handleMouseDown = (circle: CirclePosition) => {
    setDraggingCircle(circle);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (!isDragging || !draggingCircle) return;
    const newCircle = { ...draggingCircle, cx: e.clientX, cy: e.clientY - headerHeight};
    setDraggingCircle(newCircle);
  };

  const handleMouseUp = (onDrop: (circle: CirclePosition) => void) => {
    if (draggingCircle) {
      onDrop(draggingCircle);
    }
    setDraggingCircle(null);
    setIsDragging(false);
  };

  return {
    draggingCircle,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
