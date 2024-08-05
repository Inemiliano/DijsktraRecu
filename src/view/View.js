class View {
    obtenerVertices() {
        const verticesInput = document.getElementById('vertices').value;
        return verticesInput.split(',').map(v => v.trim());
    }

    limpiarInputVertices() {
        document.getElementById('vertices').value = '';
    }

    mostrarAlerta(mensaje) {
        alert(mensaje);
    }

    obtenerRuta() {
        const inicio = document.getElementById('inicio').value;
        const fin = document.getElementById('fin').value;
        const peso = parseInt(document.getElementById('peso').value, 10);
        return { inicio, fin, peso };
    }

    limpiarInputsRuta() {
        document.getElementById('inicio').value = '';
        document.getElementById('fin').value = '';
        document.getElementById('peso').value = '1';
    }

    mostrarSalida(mensaje) {
        document.getElementById('salida').innerText = mensaje;
    }
}

export default View;
