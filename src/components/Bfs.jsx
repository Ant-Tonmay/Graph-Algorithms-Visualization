import React from "react";

const BFS = ({ adjacencyList, startNode, highlightNode }) => {
  const bfs = async () => {
    const visited = new Set();
    const queue = [startNode];

    while (queue.length > 0) {
      const nodeId = queue.shift();
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        highlightNode(nodeId);
        await delay(500); // Delay for visualization

        adjacencyList[nodeId].forEach((neighborId) => {
          if (!visited.has(neighborId)) {
            queue.push(neighborId);
          }
        });
      }
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return <button onClick={bfs}>Run BFS</button>;
};

export default BFS;
