import React, { useRef, useEffect } from "react";

const GraphCanvas = ({ nodes, edges, addNode, radius }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      addNode({ x, y });
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [addNode]);

  const drawNode = (ctx, x, y, id) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(id, x - 5, y + 5);
  };

  const drawEdge = (ctx, node1, node2, distance) => {
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();
    ctx.closePath();

    const midX = (node1.x + node2.x) / 2;
    const midY = (node1.y + node2.y) / 2;
    ctx.fillStyle = "red";
    ctx.font = "12px Arial";
    ctx.fillText(distance, midX, midY);
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((node) => drawNode(ctx, node.x, node.y, node.id));
    edges.forEach(({ node1, node2, distance }) => drawEdge(ctx, node1, node2, distance));
  };

  useEffect(() => {
    drawGraph();
  }, [nodes, edges]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "1px solid black" }}
    />
  );
};

export default GraphCanvas;
