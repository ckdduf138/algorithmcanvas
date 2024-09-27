import { useWindowSize } from '../getWindowSize';
import { distance, generateUUID } from '../../utils/common';
import { Link, Node, NodeGraphData, NodeGraphHeightPadding, NodeRadius } from '../../utils/graphData';

export const useGraphCanvasUI = (setNodeGraphData: React.Dispatch<React.SetStateAction<NodeGraphData>>) => {
  const { width, height } = useWindowSize();

  const randomizeGraphData = (numNodes: number) => {
    const nodes: Node[] = [];

    for (let i = 0; i < numNodes; i++) {
      let x: number, y: number;
      let isOverlapping: boolean;

      do {
        x = Math.random() * width;
        y = Math.random() * height * 0.8 - NodeGraphHeightPadding - NodeRadius - 7;
        isOverlapping = false;

        for (const node of nodes) {
          if (distance(x, y, node.x, node.y) < NodeRadius * 5) {
            isOverlapping = true;
            break;
          }
        }
      } while (isOverlapping);

      nodes.push({
        id: generateUUID(),
        x,
        y,
        radius: NodeRadius,
        text: 'node',
        focus: 'inactive',
      });
    }

    const links: Link[] = [];
    const existingLinks = new Set<string>();

    for (let i = 0; i < numNodes; i++) {
      const source = nodes[Math.floor(Math.random() * numNodes)].id;
      let target = nodes[Math.floor(Math.random() * numNodes)].id;

      while (target === source) {
        target = nodes[Math.floor(Math.random() * numNodes)].id;
      }

      const linkKey = `${source}-${target}`;
      const reverseLinkKey = `${target}-${source}`;

      if (!existingLinks.has(linkKey) && !existingLinks.has(reverseLinkKey)) {
        links.push({ source, target, focus: 'inactive'});
        existingLinks.add(linkKey);
      }
    }

    setNodeGraphData({nodes, links});
  };

  const resetGraphData = () => {
    setNodeGraphData({nodes: [], links: []});
  };

  return {
    randomizeGraphData,
    resetGraphData
  };
};