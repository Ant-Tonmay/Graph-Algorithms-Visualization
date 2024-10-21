import React, { useState, useEffect } from "react";
import GraphCanvas from "./GraphCanvas";
import DFS from "./Dfs";
import BFS from "./Bfs";
import Dijkstra from "./Dijsktra";

const GraphAlgorithms = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);
  const [srcDest, setSrcDest] = useState({ src: "", dest: "" });
  const [distanceMatrix, setDistanceMatrix] = useState([]);
  const radius = 20;

  // Create adjacency list
  const adjacencyList = {};
  nodes.forEach((node) => {
    adjacencyList[node.id] = [];
  });
  edges.forEach(({ node1, node2 }) => {
    adjacencyList[node1.id].push(node2.id);
    adjacencyList[node2.id].push(node1.id);
  });

  useEffect(() => {
    calculateDistanceMatrix();
  }, [nodes, edges]);

  const addNode = ({ x, y }) => {
    const newNode = { id: nodeId, x, y };
    setNodes((prevNodes) => [...prevNodes, newNode]);

    // Add edges from this new node to all previous nodes
    nodes.forEach((existingNode) => {
      const distance = calculateDistance(newNode, existingNode);
      addEdge(newNode, existingNode, distance);
    });

    setNodeId(nodeId + 1);
  };

  const addEdge = (node1, node2, distance) => {
    setEdges((prevEdges) => [...prevEdges, { node1, node2, distance }]);
  };

  const calculateDistance = (node1, node2) => {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const dist = parseInt(Math.sqrt(dx * dx + dy * dy));
    return dist;
  };

  const calculateDistanceMatrix = () => {
    const matrix = nodes.map(() =>
      nodes.map(() => Infinity)
    );

    nodes.forEach((node, i) => {
      matrix[i][i] = 0;
    });

    edges.forEach(({ node1, node2, distance }) => {
      const i = nodes.findIndex((n) => n.id === node1.id);
      const j = nodes.findIndex((n) => n.id === node2.id);
      matrix[i][j] = parseInt(distance);
      matrix[j][i] = parseInt(distance); // Assuming undirected graph
    });

    setDistanceMatrix(matrix);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSrcDest((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Graph Algorithms Visualization</h2>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        addNode={addNode}
        radius={radius}
      />
      <br />
      <input
        type="text"
        name="src"
        placeholder="Source Node ID"
        value={srcDest.src}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="dest"
        placeholder="Destination Node ID"
        value={srcDest.dest}
        onChange={handleInputChange}
      />
      <br />
      <DFS adjacencyList={adjacencyList} startNode={srcDest.src} />
      <BFS adjacencyList={adjacencyList} startNode={srcDest.src} />
      <Dijkstra
        adjacencyList={adjacencyList}
        nodes={nodes}
        startNode={srcDest.src}
        endNode={srcDest.dest}
      />
      <h3>Distance Matrix</h3>
      <table border="1">
        <thead>
          <tr>
            <th></th>
            {nodes.map((node) => (
              <th key={node.id}>{node.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {distanceMatrix.map((row, i) => (
            <tr key={i}>
              <td>{nodes[i]?.id}</td>
              {row.map((dist, j) => (
                <td key={j}>{dist === Infinity ? "-" : dist}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GraphAlgorithms;
