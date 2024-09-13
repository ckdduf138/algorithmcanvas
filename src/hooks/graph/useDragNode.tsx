import { useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
};

const useDragNode = (initialNode: Node, headerHeight = 50) => {
  const [dragging, setDragging] = useState(false);
  const [nodePosition, setNodePosition] = useState<Node>(initialNode);

  const handleMouseDown = useCallback(() => {
    console.log('handleMouseDown');

    setDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGCircleElement>) => {
      if (dragging) {
        const newX = e.clientX;
        const newY = e.clientY - headerHeight;

        console.log('handleMouseMove');

        setNodePosition((prevPosition) => ({
          ...prevPosition,
          x: newX,
          y: newY,
        }));
      }
    },
    [dragging, headerHeight]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return {
    nodePosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useDragNode;
