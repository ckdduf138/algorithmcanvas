import { useState, useRef, useCallback } from 'react';
import { useWindowSize } from '../getWindowSize';
import { CirclePosition, Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';
import { generateUUID } from '../../utils/common';

export const useDragCopy = (setNodeGraphData: React.Dispatch<React.SetStateAction<NodeGraphData>>) => {
  const [draggingCircle, setDraggingCircle] = useState<CirclePosition | null>(null);
  const [draggingNode, setDraggingNode] = useState<Node | null>(null);

  const isDragging = useRef(false);
  const draggingNodeRef = useRef<Node | null>(null);
  const draggingCircleRef = useRef<CirclePosition | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const handleMouseDown = (circle: CirclePosition) => {
    console.log('handleMouseDown');
    updateHandlers(dragMouseMove, handleDrop);
    
    setDraggingCircle(circle);
    draggingCircleRef.current = circle;
    isDragging.current = true;
  };

  const handleMouseDownNode = (nodeData: Node) => {
    console.log('handleMouseDownNode');
    updateHandlers(dragMouseMove, dragMouseUp);

    setDraggingNode(nodeData);
    draggingNodeRef.current = nodeData;
    isDragging.current = true;
  };

  const dragMouseMove = (e: PointerEvent | TouchEvent) => {
    console.log('dragMouseMove');

    if (!isDragging.current) return;

    let new_x: number = 0;
    let new_y: number = 0;
    
    if (e instanceof PointerEvent) {
      new_x = e.clientX;
      new_y = e.clientY;
    } else if (e instanceof TouchEvent && e.touches.length > 0) {
      new_x = e.touches[0].clientX;
      new_y = e.touches[0].clientY;
    }

    const newCx = new_x;
    const newCy = new_y - headerHeight;

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
    console.log('dragMouseUp');

    setDraggingCircle(null);
    setDraggingNode(null);

    draggingCircleRef.current = null;
    draggingNodeRef.current = null;
    isDragging.current = false;

    updateHandlers(() => {}, () => {});
  },[updateHandlers]);

  const handleDrop = useCallback(() => {
    console.log('handleDrop');
    if (!draggingCircleRef.current) return;

    const newNode: Node = {
      id: generateUUID(),
      x: draggingCircleRef.current.cx,
      y: draggingCircleRef.current.cy,
      radius: draggingCircleRef.current.radius,
      text: 'node',
      focus: 'inactive'
    };
  
    setNodeGraphData((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newNode],
    }));
  
    dragMouseUp();
  }, [setNodeGraphData, dragMouseUp]);

  return {
    draggingCircle,
    draggingNode,
    handleMouseDown,
    dragMouseMove,
    handleMouseDownNode,
    dragMouseUp,
  };
};
