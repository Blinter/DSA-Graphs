/**
 * Represents a node in the graph.
 */
// sonarlint-disable-next-line javascript:S2094
class Node {
  /**
   * Creates a new Node instance.
   * @param {*} value The value stored in the node.
   * @param {Set<Node>} [adjacent=new Set()] A set of adjacent nodes.
   */
  constructor(value, adjacent = new Set()) {
    /** @type {*} The value stored in the node. */
    this.value = value;

    /** @type {Set<Node>} A set of adjacent nodes. */
    this.adjacent = adjacent;
  }
}

/**
 * Represents a graph data structure.
 */
class Graph {
  /**
   * Creates a new Graph instance.
   */
  constructor() {
    /** @type {Set<Node>} A set of all nodes in the graph. */
    this.nodes = new Set();
  }

  /**
   * Adds a single vertex to the graph.
   * @param {Node} vertex The vertex to add.
   */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /**
   * Adds multiple vertices to the graph.
   * @param {Node[]} vertexArray An array of vertices to add.
   */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /**
   * Adds an edge between two vertices.
   * @param {Node} v1 The first vertex.
   * @param {Node} v2 The second vertex.
   */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /**
   * Removes an edge between two vertices.
   * @param {Node} v1 The first vertex.
   * @param {Node} v2 The second vertex.
   */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /**
   * Removes a vertex from the graph.
   * @param {Node} vertex The vertex to remove.
   */
  removeVertex(vertex) {
    for (const node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  /**
   * Performs a depth-first search traversal of the graph.
   * @param {Node} start The starting vertex.
   * @returns {Array<*>} An array of values representing the order of visited nodes.
   */
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      if (!vertex) {
        return null;
      }

      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      });
    }

    traverse(start);
    return result;
  }

  /**
   * Performs an iterative depth-first search traversal of the graph.
   * @param {Node} start The starting vertex.
   * @returns {Array<*>} An array of values representing the order of visited nodes.
   */
  depthFirstSearchIterative(start) {
    const stack = [start];
    const result = [];
    const visited = new Set();

    visited.add(start);

    while (stack.length > 0) {
      const currentVertex = stack.pop();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }

    return result;
  }

  /**
   * Performs a breadth-first search traversal of the graph.
   * @param {Node} start The starting vertex.
   * @returns {Array<*>} An array of values representing the order of visited nodes.
   */
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();

    visited.add(start);

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      result.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  /**
   * Finds the shortest path between two vertices in the graph.
   * @param {Node} start The starting vertex.
   * @param {Node} end The ending vertex.
   * @returns {Array<*>} An array of values representing the shortest path.
   */
  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    const queue = [start];
    const visited = new Set();
    const predecessors = {};

    while (queue.length > 0) {
      const currentVertex = queue.shift();

      if (currentVertex === end) {
        const path = [];
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        return path.reverse();
      }

      visited.add(currentVertex);

      for (const vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }

    return []; // Return empty array if no path found
  }
}

module.exports = { Graph, Node };