document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000';

    const pqrsForm = document.getElementById('pqrs-form');
    const pqrsList = document.getElementById('pqrs-list');

    // Mostrar PQRS
    async function fetchPQRS() {
        try {
            const response = await fetch(`${apiUrl}/pqrs/`);
            if (!response.ok) throw new Error('No se pudo obtener PQRS');
            const pqrsArr = await response.json();
            pqrsList.innerHTML = '';
            pqrsArr.forEach(pqrs => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200';
                li.innerHTML = `
                    <div>
                        <span class="font-bold">${pqrs.tipo}</span> - <span>${pqrs.nombre_usuario} (${pqrs.email})</span>
                        <div class="text-gray-700 mt-1">${pqrs.mensaje}</div>
                        <div class="text-xs text-gray-400 mt-1">${new Date(pqrs.fecha).toLocaleString()}</div>
                        <button class="editar-btn bg-yellow-400 text-white px-2 py-1 rounded mr-2 mt-2" data-id="${pqrs.id}">Editar</button>
                        <button class="eliminar-btn bg-red-500 text-white px-2 py-1 rounded mt-2" data-id="${pqrs.id}">Eliminar</button>
                    </div>
                `;
                pqrsList.appendChild(li);
            });

            // Botones eliminar
            document.querySelectorAll('.eliminar-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = btn.getAttribute('data-id');
                    if (confirm('¿Seguro que deseas eliminar este PQRS?')) {
                        try {
                            await fetch(`${apiUrl}/pqrs/${id}`, { method: 'DELETE' });
                            fetchPQRS();
                        } catch (error) {
                            alert('Error eliminando PQRS.');
                        }
                    }
                });
            });

            // Botones editar
            document.querySelectorAll('.editar-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = btn.getAttribute('data-id');
                    const pqrs = pqrsArr.find(p => p.id == id);
                    document.getElementById('pqrs-nombre').value = pqrs.nombre_usuario;
                    document.getElementById('pqrs-email').value = pqrs.email;
                    document.getElementById('pqrs-tipo').value = pqrs.tipo;
                    document.getElementById('pqrs-mensaje').value = pqrs.mensaje;
                    pqrsForm.setAttribute('data-edit-id', id);
                    pqrsForm.querySelector('button[type="submit"]').textContent = 'Actualizar PQRS';
                });
            });
        } catch (error) {
            alert('Error obteniendo PQRS.');
        }
    }

    // Agregar botón cancelar si no existe
    let cancelarBtn = document.getElementById('cancelar-edicion-btn');
    if (!cancelarBtn) {
        cancelarBtn = document.createElement('button');
        cancelarBtn.type = 'button';
        cancelarBtn.id = 'cancelar-edicion-btn';
        cancelarBtn.textContent = 'Cancelar';
        cancelarBtn.className = 'w-full bg-gray-400 text-white p-2 rounded mt-2 hidden';
        pqrsForm.appendChild(cancelarBtn);
    }

    // Mostrar botón cancelar al editar
    document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const pqrs = pqrsArr.find(p => p.id == id);
            document.getElementById('pqrs-nombre').value = pqrs.nombre_usuario;
            document.getElementById('pqrs-email').value = pqrs.email;
            document.getElementById('pqrs-tipo').value = pqrs.tipo;
            document.getElementById('pqrs-mensaje').value = pqrs.mensaje;
            pqrsForm.setAttribute('data-edit-id', id);
            pqrsForm.querySelector('button[type="submit"]').textContent = 'Actualizar PQRS';
            cancelarBtn.classList.remove('hidden');
        });
    });

    // Lógica botón cancelar
    cancelarBtn.addEventListener('click', () => {
        pqrsForm.reset();
        pqrsForm.removeAttribute('data-edit-id');
        pqrsForm.querySelector('button[type="submit"]').textContent = 'Enviar PQRS';
        cancelarBtn.classList.add('hidden');
    });

    // Crear PQRS
    pqrsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre_usuario = document.getElementById('pqrs-nombre').value;
        const email = document.getElementById('pqrs-email').value;
        const tipo = document.getElementById('pqrs-tipo').value;
        const mensaje = document.getElementById('pqrs-mensaje').value;
        const editId = pqrsForm.getAttribute('data-edit-id');
        try {
            if (editId) {
                await fetch(`${apiUrl}/pqrs/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre_usuario, email, tipo, mensaje })
                });
                pqrsForm.removeAttribute('data-edit-id');
                pqrsForm.querySelector('button[type="submit"]').textContent = 'Enviar PQRS';
            } else {
                await fetch(`${apiUrl}/pqrs/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre_usuario, email, tipo, mensaje })
                });
            }
            fetchPQRS();
            pqrsForm.reset();
            cancelarBtn.classList.add('hidden');
        } catch (error) {
            alert('Error guardando PQRS.');
        }
    });

    fetchPQRS();
});