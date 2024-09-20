import { useRef, useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';

interface EdgePosition {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const useEditEdge = () => {
  const [draggingEdge, setDraggingEdge] = useState<Node | null>(null);

  const isDragging = useRef(false);
  const draggingEdgeRef = useRef<Node | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const edgeMouseDown = (sourceNode: Node, targetNode: Node) => {
    setDraggingEdge(sourceNode);
    isDragging.current = true;

    updateHandlers(edgeMouseMove);
  };

  const edgeMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;

    if (draggingEdgeRef.current) {
      const newCircle = { ...draggingEdgeRef.current, cx: newCx, cy: newCy };
      setDraggingEdge(newCircle);
    } else if (draggingEdgeRef.current) {
    }
  };

  const edgeMouseUp = () => {
    setDraggingEdge(null);
    
    draggingEdgeRef.current = null;
    isDragging.current = false;
  };

  return {
    draggingEdge,
    edgeMouseDown,
    edgeMouseMove,
    edgeMouseUp,
  };
};
