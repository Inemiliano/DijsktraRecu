class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.adjacencyList.has(value)) {
                this.adjacencyList.set(value, []);
            }
        }
    }

    addConnection(start, end, weight = 1) {
        if (this.adjacencyList.has(start) && this.adjacencyList.has(end)) {
            this.adjacencyList.get(start).push({ node: end, weight });
            this.adjacencyList.get(end).push({ node: start, weight });
            return true;
        }
        return false;
    }

    dijkstra(start) {
        const infinito = 99999999; 
        const distances = new Map();
        const visited = new Set();
        const pq = new PriorityQueue();

        for (let vertex of this.adjacencyList.keys()) {
            distances.set(vertex, infinito);
        }
        distances.set(start, 0);
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const { value: minVertex } = pq.dequeue();
            if (visited.has(minVertex)) continue;

            visited.add(minVertex);

            const neighbors = this.adjacencyList.get(minVertex);
            for (let neighbor of neighbors) {
                const { node, weight } = neighbor;
                const newDist = distances.get(minVertex) + weight;

                if (newDist < distances.get(node)) {
                    distances.set(node, newDist);
                    pq.enqueue(node, newDist);
                }
            }
        }

        return distances;
    }

    dfs(start, callback) {
        const visited = new Set();

        const traverse = (vertex) => {
            if (!vertex) return;

            visited.add(vertex);
            callback(vertex);

            const neighbors = this.adjacencyList.get(vertex);
            for (let neighbor of neighbors) {
                if (!visited.has(neighbor.node)) {
                    traverse(neighbor.node);
                }
            }
        };

        traverse(start);
    }

    get vertices() {
        return Array.from(this.adjacencyList.keys());
    }

    hasVertex(vertex) {
        return this.adjacencyList.has(vertex);
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

export default Graph;
