import { useRef, useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { findOverlappingNode, Link, Node, NodeGraphData } from '../../utils/graphData';
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
  const foucsLink = useRef<Set<Link> | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const removeLinksByNodeIds = (eventNodes: Node[]) => {
    const link1 = nodeGraphData.links.find((data) => data.source === eventNodes[0].id && data.target === eventNodes[1].id);
    const link2 = nodeGraphData.links.find((data) => data.target === eventNodes[0].id && data.source === eventNodes[1].id);

    const linksToRemove = new Set<Link>();
    if (link1) linksToRemove.add(link1);
    if (link2) linksToRemove.add(link2);

    const links = nodeGraphData.links.filter((link) => !linksToRemove.has(link));

    foucsLink.current = linksToRemove;

    nodeGraphData.links = links;
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

    const hasOverlap = findOverlappingNode(newNode, nodeGraphData.nodes);

    if(hasOverlap && edgeNodes.current) {
      const newLink: Link = {source: edgeNodes.current[0].id, target: hasOverlap.id};
      nodeGraphData.links.push(newLink);
    }
    else {

      // 삭제 or 복구 논의 필요
      // foucsLink.current?.forEach(link => {
      //   nodeGraphData.links.push(link);
      // });
    }

    setDraggingEdge(null);
    
    foucsLink.current = null;
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
