import { useRef, useState } from 'react';
import { useWindowSize } from '../getWindowSize';
import { EdgePosition, findOverlappingNode, Link, Node, NodeGraphData } from '../../utils/graphData';
import { useSVGEvents } from './useSvgEvents';


export const useEditEdge = (nodeGraphData: NodeGraphData, setNodeGraphData: React.Dispatch<React.SetStateAction<NodeGraphData>>, 
  direction: boolean = false
) => {
  const [draggingEdge, setDraggingEdge] = useState<EdgePosition | null>(null);

  const isDragging = useRef(false);
  const draggingEdgeRef = useRef<EdgePosition | null>(null);

  const edgeNodes = useRef<[Node, Node] | null>(null);
  const foucsLink = useRef<Set<Link> | null>(null);

  const edgeEdit = useRef<Boolean>(false);

  const { updateHandlers } = useSVGEvents({});

  const { height } = useWindowSize();
  const headerHeight = height * 0.1;

  const removeLinksByNodeIds = (eventNodes: [Node, Node]) => {
    setNodeGraphData(prevData => {
      const link1 = prevData.links.find((data) => data.source === eventNodes[0].id && data.target === eventNodes[1].id);
      const link2 = prevData.links.find((data) => data.target === eventNodes[0].id && data.source === eventNodes[1].id);
    
      const linksToRemove = new Set<Link>();
      if (link1) linksToRemove.add(link1);
      if (link2) linksToRemove.add(link2);
    
      const updatedLinks = prevData.links.filter((link) => !linksToRemove.has(link));
    
      foucsLink.current = linksToRemove;
    
      return {
        ...prevData,
        links: updatedLinks
      };
    });
  };

  const edgeMouseDown = (e: React.PointerEvent, eventNodes: [Node, Node], link: Link) => {
    updateHandlers(edgeMouseMove, edgeMouseUp);

    edgeEdit.current = true;
    removeLinksByNodeIds(eventNodes);

    edgeNodes.current = eventNodes;

    const edge: EdgePosition = {x1: eventNodes[0].x, y1: eventNodes[0].y, x2: eventNodes[1].x, y2: eventNodes[1].y, weight: link.weight, direction: direction};

    draggingEdgeRef.current = edge;
    isDragging.current = true;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;
    
    if (draggingEdgeRef.current) {
      setDraggingEdge({
        ...draggingEdgeRef.current,
        x2: newCx,
        y2: newCy,
        weight: link.weight,
        direction: direction
      });
    }
  };

  const createEdgeMouseDown = (eventNode: Node, isWeighted: boolean) => {
    updateHandlers(edgeMouseMove, edgeMouseUp);

    edgeEdit.current = false;

    edgeNodes.current = [eventNode, eventNode];

    let edge: EdgePosition;

    if(isWeighted) {
      edge = {x1: eventNode.x, y1: eventNode.y, x2: null, y2: null, weight: 1, direction: direction};
    }
    else {
      edge = {x1: eventNode.x, y1: eventNode.y, x2: null, y2: null, direction: direction};
    }

    draggingEdgeRef.current = edge;
    isDragging.current = true;
  };

  const edgeMouseMove = (e: PointerEvent) => {
    if (!isDragging.current) return;

    const newCx = e.clientX;
    const newCy = e.clientY - headerHeight;

    if (draggingEdgeRef.current) {
      setDraggingEdge({
        ...draggingEdgeRef.current,
        x2: newCx,
        y2: newCy,
      });
    }
  };

  const edgeMouseUp = (e: PointerEvent) => {
    const newNode: Node = { id: '-1', x: e.clientX, y: e.clientY - headerHeight, radius: 50, text:'', focus: 'inactive' };

    const hasOverlap = findOverlappingNode(newNode, nodeGraphData.nodes);

    if(hasOverlap && edgeNodes.current && edgeNodes.current[0].id !== hasOverlap.id) {
      const newLink: Link = {
        source: edgeNodes.current[0].id, 
        target: hasOverlap.id, 
        focus: 'inactive', 
        weight: draggingEdgeRef.current?.weight, 
        direction: direction
      };

      if (!nodeGraphData.links.some(link => 
        (link.source === newLink.source && link.target === newLink.target) || (link.source === newLink.target && link.target === newLink.source)) || edgeEdit.current) {
        setNodeGraphData(prevData => ({
          ...prevData,
          links: [...prevData.links, newLink]
        }));
      }
    }

    setDraggingEdge(null);
    
    foucsLink.current = null;
    edgeNodes.current = null;
    draggingEdgeRef.current = null;
    isDragging.current = false;

    updateHandlers(() => {}, () => {});
  };

  return {
    draggingEdge,
    edgeMouseDown,
    edgeMouseUp,
    createEdgeMouseDown
  };
};
