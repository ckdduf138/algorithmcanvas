import { useState, useRef, useCallback } from 'react';
import { useWindowSize } from '../getWindowSize';
import { CirclePosition, Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';
import { generateUUID } from '../../utils/common';

export const useDragCopy = (
  setNodeGraphData: React.Dispatch<React.SetStateAction<NodeGraphData>>, setSeletedNode: React.Dispatch<React.SetStateAction<Node | null>>
) => {
  const [draggingCircle, setDraggingCircle] = useState<CirclePosition | null>(null);
  const [draggingNode, setDraggingNode] = useState<Node | null>(null);

  const isDragging = useRef(false);
  const draggingNodeRef = useRef<Node | null>(null);
  const draggingCircleRef = useRef<CirclePosition | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const handleMouseDown = (circle: CirclePosition) => {
    updateHandlers(dragMouseMove, handleDrop);
    
    setDraggingCircle(circle);
    draggingCircleRef.current = circle;
    isDragging.current = true;
  };

  const handleMouseDownNode = (nodeData: Node) => {
    updateHandlers(dragMouseMove, dragMouseUp);

    setDraggingNode(nodeData);
    draggingNodeRef.current = nodeData;
    isDragging.current = true;
  };

  const dragMouseMove = (e: PointerEvent) => {
    if (!isDragging.current) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight + window.scrollY;

    if (draggingCircleRef.current) {
      draggingCircleRef.current.cx = newCx;
      draggingCircleRef.current.cy = newCy;
      
      const newCircle = { ...draggingCircleRef.current, cx: newCx, cy: newCy };
      setDraggingCircle(newCircle);
    } else if (draggingNodeRef.current) {
      setDraggingNode({
        ...draggingNodeRef.current,
        x: newCx,
        y: newCy
      });
    }
  };

  const dragMouseUp = useCallback(() => {
    setDraggingCircle(null);
    setDraggingNode(null);

    draggingCircleRef.current = null;
    draggingNodeRef.current = null;
    isDragging.current = false;

    updateHandlers(() => {}, () => {});
  },[updateHandlers]);

  const handleDrop = useCallback(() => {
    if (!draggingCircleRef.current) return;

    setNodeGraphData((prevData) => ({
      ...prevData,
      nodes: prevData.nodes.map((node) => ({
        ...node,
        focus: 'inactive',
      })),
    }));

    const newNode: Node = {
      id: generateUUID(),
      x: draggingCircleRef.current.cx,
      y: draggingCircleRef.current.cy,
      radius: draggingCircleRef.current.radius,
      text: 'node',
      focus: 'selected',
    };

    setNodeGraphData((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newNode],
    }));

    setSeletedNode(newNode);

    dragMouseUp();
  }, [setNodeGraphData, dragMouseUp, setSeletedNode]);

  return {
    draggingCircle,
    draggingNode,
    handleMouseDown,
    dragMouseMove,
    handleMouseDownNode,
    dragMouseUp,
  };
};
