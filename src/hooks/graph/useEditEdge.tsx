import { useRef, useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { checkNodeOverlap, Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';

interface EdgePosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const useEditEdge = (nodeGraphData: NodeGraphData) => {
  const [draggingEdge, setDraggingEdge] = useState<EdgePosition | null>(null);

  const isDragging = useRef(false);
  const draggingEdgeRef = useRef<EdgePosition | null>(null);

  const edgeNodes = useRef<[Node, Node]>();

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const removeLinksByNodeIds = (eventNodes: Node[]) => {
    const idsToRemove = eventNodes.map(node => node.id);
  
    const data1 = nodeGraphData.links.find((data) => data.source === eventNodes[0].id);
    const data2 = nodeGraphData.links.find((data) => data.target === eventNodes[1].id);
  
    // if (data1) {
    //   data1.link = data1.link.filter(link => 
    //     !idsToRemove.includes(link.source) && 
    //     !idsToRemove.includes(link.target)
    //   );
    // }
  
    // if (data2) {
    //   data2.link = data2.link.
    // }
  };

  const edgeMouseDown = (eventNodes: [Node, Node]) => {
    removeLinksByNodeIds(eventNodes);

    edgeNodes.current = eventNodes;
    
    const edge: EdgePosition = {x1: eventNodes[0].x, y1: eventNodes[0].y, x2: eventNodes[1].x, y2: eventNodes[1].y};

    draggingEdgeRef.current = edge;
    isDragging.current = true;

    updateHandlers(edgeMouseMove, edgeMouseUp);
  };

  const edgeMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;
    
    if (draggingEdgeRef.current) {
      setDraggingEdge({
        ...draggingEdgeRef.current,
        x2: newCx,
        y2: newCy
      });
    }
  };

  const edgeMouseUp = (e: MouseEvent) => {
    const newNode: Node = { id: '-1', x: e.clientX, y: e.clientY - headerHeight, radius: 20, focus: 'inactive' };

    const hasOverlap = checkNodeOverlap(newNode, nodeGraphData.nodes);

    console.log(hasOverlap);

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
