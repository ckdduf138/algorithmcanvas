import { useState, useEffect, useRef } from 'react';
import { useWindowSize } from '../getWindowSize';
import { NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';

interface CirclePosition {
  id: string;
  cx: number;
  cy: number;
  r: number;
}

export const useDragCopy = () => {
  const [draggingCircle, setDraggingCircle] = useState<CirclePosition | null>(null);
  const [draggingNode, setDraggingNode] = useState<NodeGraphData | null>(null);

  const isDragging = useRef(false);
  const draggingNodeRef = useRef<NodeGraphData | null>(null);
  const draggingCircleRef = useRef<CirclePosition | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const handleMouseDown = (circle: CirclePosition) => {
    setDraggingCircle(circle);
    draggingCircleRef.current = circle;
    isDragging.current = true;

    updateHandlers(dragMouseMove);
  };

  const handleMouseDownNode = (nodeData: NodeGraphData) => {
    setDraggingNode(nodeData);
    draggingNodeRef.current = nodeData;
    isDragging.current = true;
  };

  const dragMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;

    if (draggingCircleRef.current) {
      const newCircle = { ...draggingCircleRef.current, cx: newCx, cy: newCy };
      setDraggingCircle(newCircle);
    } else if (draggingNodeRef.current) {
      setDraggingNode({
        ...draggingNodeRef.current,
        node: {
          ...draggingNodeRef.current.node,
          x: newCx,
          y: newCy
        }
      });
    }
  };

  const dragMouseUp = () => {
    setDraggingCircle(null);
    setDraggingNode(null);
    
    draggingCircleRef.current = null;
    draggingNodeRef.current = null;
    isDragging.current = false;
  };

  return {
    draggingCircle,
    draggingNode,
    handleMouseDown,
    dragMouseMove,
    handleMouseDownNode,
    dragMouseUp,
  };
};
