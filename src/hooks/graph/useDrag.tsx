import { useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { NodeGraphData } from '../../utils/graphData';

interface CirclePosition {
  id: string;
  cx: number;
  cy: number;
  r: number;
}

export const useDragCopy = () => {
  const [draggingCircle, setDraggingCircle] = useState<CirclePosition | null>(null);
  const [draggingNode, setDraggingNode] = useState<NodeGraphData>();

  const [isDragging, setIsDragging] = useState(false);

  const { height } = useWindowSize();

  const headerHeight = height * 0.1;

  const handleMouseDown = (circle: CirclePosition) => {
    setDraggingCircle(circle);
    setIsDragging(true);
  };

  const handleMouseDownNode = (nodeData: NodeGraphData) => {
    setDraggingNode(nodeData);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    if (isDragging === false) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;

    if(draggingCircle) {
      const newCircle = { ...draggingCircle, cx: newCx, cy: newCy};
      setDraggingCircle(newCircle);
    }
    else if (draggingNode) {
      setDraggingNode({
        ...draggingNode,
        node: {
          ...draggingNode.node,
          x: newCx,
          y: newCy
        }
      });
    }
  }

  const handleMouseUp = (onDrop: (circle: CirclePosition) => void) => {
    if (draggingCircle) {
      onDrop(draggingCircle);
    }
    setDraggingCircle(null);
    setIsDragging(false);
  };

  return {
    draggingCircle,
    draggingNode,
    handleMouseDown,
    handleMouseDownNode,
    handleMouseMove,
    handleMouseUp,
  };
};
