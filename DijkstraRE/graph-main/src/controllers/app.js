import Graph from '../models/Graph.js';
import View from '../view/View.js';

const grafo = new Graph();
const vista = new View();

function agregarVertices() {
    const vertices = vista.obtenerVertices();
    grafo.addVertices(...vertices);
    vista.limpiarInputVertices();
    vista.mostrarAlerta(`Zonas agregadas: ${vertices.join(', ')}`);
}

function agregarRuta() {
    const { inicio, fin, peso } = vista.obtenerRuta();

    if (grafo.addConnection(inicio, fin, peso)) {
        vista.mostrarAlerta(`Ruta agregada: ${inicio} -> ${fin} (Peso: ${peso})`);
    } else {
        vista.mostrarAlerta(`Error: No se pudo agregar la ruta ${inicio} -> ${fin}`);
    }

    vista.limpiarInputsRuta();
}

function buscarDFS() {
    const vertices = grafo.vertices;

    if (vertices.length > 0) {
        let recorrido = 'Recorrido: ';
        grafo.dfs(vertices[0], val => {
            recorrido += `${val} `;
        });
        vista.mostrarSalida(recorrido);
    } else {
        vista.mostrarSalida('No hay vértices en el grafo.');
    }
}

function buscarDijkstra() {
    const inicio = document.getElementById('dijkstraInicio').value;
    if (grafo.hasVertex(inicio)) {
        const distancias = grafo.dijkstra(inicio);
        let resultado = 'Distancias: ';
        for (let [vertex, distance] of distancias) {
            resultado += `${vertex}: ${distance}, `;
        }
        vista.mostrarSalida(resultado);
    } else {
        vista.mostrarAlerta(`Error: El vértice ${inicio} no existe en el grafo.`);
    }
}

// Asociación de eventos a los botones
document.getElementById('addVerticesBtn').addEventListener('click', agregarVertices);
document.getElementById('addAristaBtn').addEventListener('click', agregarRuta);
document.getElementById('dfsBtn').addEventListener('click', buscarDFS);
document.getElementById('dijkstraBtn').addEventListener('click', buscarDijkstra);
