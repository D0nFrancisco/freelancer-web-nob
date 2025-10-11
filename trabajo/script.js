let registros = [];
let editandoIndex = -1;

window.onload = function() {
    mostrarRegistros();
};

document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const curso = document.getElementById('curso').value;

    if (!nombre || !apellido || !telefono || !curso) {
        mostrarMensaje('Por favor, complete todos los campos', 'error');
        return;
    }

    if (!/^\d+$/.test(telefono)) {
        mostrarMensaje('El teléfono debe contener solo números', 'error');
        return;
    }

    const registro = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        curso: curso
    };

    if (editandoIndex >= 0) {
        registros[editandoIndex] = registro;
        mostrarMensaje('Registro actualizado correctamente', 'success');
        editandoIndex = -1;
    } else {
        registros.push(registro);
        mostrarMensaje('Registro guardado correctamente', 'success');
    }

    limpiarFormulario();
    mostrarRegistros();
});

function limpiarFormulario() {
    document.getElementById('registroForm').reset();
    editandoIndex = -1;
    document.getElementById('btnGuardar').textContent = 'Guardar';
}

function mostrarRegistros() {
    const lista = document.getElementById('listaRegistros');
    
    if (registros.length === 0) {
        lista.innerHTML = '<div class="empty-state">No hay registros guardados</div>';
        return;
    }

    lista.innerHTML = '';
    
    registros.forEach((registro, index) => {
        const div = document.createElement('div');
        div.className = 'registro-item';
        div.innerHTML = `
            <p><strong>Nombre:</strong> ${registro.nombre}</p>
            <p><strong>Apellido:</strong> ${registro.apellido}</p>
            <p><strong>Teléfono:</strong> ${registro.telefono}</p>
            <p><strong>Curso:</strong> ${registro.curso}</p>
            <div class="registro-actions">
                <button class="btn-editar" onclick="editarRegistro(${index})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarRegistro(${index})">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function editarRegistro(index) {
    const registro = registros[index];
    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('apellido').value = registro.apellido;
    document.getElementById('telefono').value = registro.telefono;
    document.getElementById('curso').value = registro.curso;
    
    editandoIndex = index;
    document.getElementById('btnGuardar').textContent = 'Actualizar';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function eliminarRegistro(index) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
        registros.splice(index, 1);
        mostrarMensaje('Registro eliminado correctamente', 'success');
        mostrarRegistros();
    }
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.className = 'mensaje ' + tipo;
    mensaje.style.display = 'block';
    
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}