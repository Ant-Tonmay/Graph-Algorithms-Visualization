import React from "react";

const Dijkstra = ({ adjacencyList, nodes, startNode, endNode, highlightNode }) => {
  const dijkstra = async () => {
    const dist = {};
    const prev = {};
    const pq = [{ id: startNode, dist: 0 }];

    nodes.forEach((node) => {
      dist[node.id] = Infinity;
      prev[node.id] = null;
    });
    dist[startNode] = 0;

    while (pq.length > 0) {
      pq.sort((a, b) => a.dist - b.dist);
      const { id } = pq.shift();
      highlightNode(id);
      await delay(500);

      if (id === endNode) break;

      adjacencyList[id].forEach((neighborId) => {
        const altDist = dist[id] + 1; // Assuming uniform weight for edges
        if (altDist < dist[neighborId]) {
          dist[neighborId] = altDist;
          prev[neighborId] = id;
          pq.push({ id: neighborId, dist: altDist });
        }
      });
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return <button onClick={dijkstra}>Run Dijkstra</button>;
};

export default Dijkstra;
