import { useRef, useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { EdgePosition, findOverlappingNode, Link, Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';


export const useEditEdge = (nodeGraphData: NodeGraphData) => {
  const [draggingEdge, setDraggingEdge] = useState<EdgePosition | null>(null);

  const isDragging = useRef(false);
  const draggingEdgeRef = useRef<EdgePosition | null>(null);

  const edgeNodes = useRef<[Node, Node] | null>(null);
  const foucsLink = useRef<Set<Link> | null>(null);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const removeLinksByNodeIds = (eventNodes: [Node, Node]) => {
    const link1 = nodeGraphData.links.find((data) => data.source === eventNodes[0].id && data.target === eventNodes[1].id);
    const link2 = nodeGraphData.links.find((data) => data.target === eventNodes[0].id && data.source === eventNodes[1].id);

    const linksToRemove = new Set<Link>();
    if (link1) linksToRemove.add(link1);
    if (link2) linksToRemove.add(link2);

    const links = nodeGraphData.links.filter((link) => !linksToRemove.has(link));

    foucsLink.current = linksToRemove;

    nodeGraphData.links = links;
  };

  const edgeMouseDown = (e: React.MouseEvent<SVGElement>, eventNodes: [Node, Node]) => {
    updateHandlers(edgeMouseMove, edgeMouseUp);

    removeLinksByNodeIds(eventNodes);

    edgeNodes.current = eventNodes;

    const edge: EdgePosition = {x1: eventNodes[0].x, y1: eventNodes[0].y, x2: eventNodes[1].x, y2: eventNodes[1].y};

    draggingEdgeRef.current = edge;
    isDragging.current = true;

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

  const createEdgeMouseDown = (eventNode: Node) => {
    updateHandlers(edgeMouseMove, edgeMouseUp);

    edgeNodes.current = [eventNode, eventNode];

    const edge: EdgePosition = {x1: eventNode.x, y1: eventNode.y, x2: null, y2: null};

    draggingEdgeRef.current = edge;
    isDragging.current = true;
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
    const newNode: Node = { id: '-1', x: e.clientX, y: e.clientY - headerHeight, radius: 20, text:'', focus: 'inactive' };

    const hasOverlap = findOverlappingNode(newNode, nodeGraphData.nodes);

    if(hasOverlap && edgeNodes.current && edgeNodes.current[0].id !== hasOverlap.id) {
      const newLink: Link = {source: edgeNodes.current[0].id, target: hasOverlap.id};

      if (!nodeGraphData.links.some(link => 
        (link.source === newLink.source && link.target === newLink.target) || (link.source === newLink.target && link.target === newLink.source))) {
        nodeGraphData.links.push(newLink);
      }
    }
    else {
      // 삭제 or 복구 논의 필요
      // foucsLink.current?.forEach(link => {
      //   nodeGraphData.links.push(link);
      // });
    }

    setDraggingEdge(null);
    
    foucsLink.current = null;
    edgeNodes.current = null;
    draggingEdgeRef.current = null;
    isDragging.current = false;
  };

  return {
    draggingEdge,
    edgeMouseDown,
    edgeMouseUp,
    createEdgeMouseDown
  };
};
