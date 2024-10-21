import React from "react";

const DFS = ({ adjacencyList, startNode, highlightNode }) => {
  const dfs = async () => {
    const visited = new Set();
    const stack = [startNode];

    while (stack.length > 0) {
      const nodeId = stack.pop();
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        highlightNode(nodeId);
        await delay(500); // Delay for visualization

        adjacencyList[nodeId].forEach((neighborId) => {
          if (!visited.has(neighborId)) {
            stack.push(neighborId);
          }
        });
      }
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return <button onClick={dfs}>Run DFS</button>;
};

export default DFS;
