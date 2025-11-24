document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000';

    const recetaForm = document.getElementById('receta-form');
    const recetaList = document.getElementById('receta-list');
    const cancelarBtn = document.getElementById('cancelar-edicion');
    const editandoInfo = document.getElementById('editando-info');

    let editandoId = null;

    function mostrarEdicion(mostrar) {
        if (mostrar) {
            cancelarBtn.classList.remove('hidden');
            editandoInfo.classList.remove('hidden');
        } else {
            cancelarBtn.classList.add('hidden');
            editandoInfo.classList.add('hidden');
        }
    }

    // Mostrar Recetas
    async function fetchRecetas() {
        try {
            const response = await fetch(`${apiUrl}/recetas/`);
            if (!response.ok) throw new Error('No se pudo obtener recetas');
            const recetasArr = await response.json();
            recetaList.innerHTML = '';
            recetasArr.forEach(receta => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200';
                li.innerHTML = `
                    <div>
                        <span class="font-bold">${receta.nombre}</span>
                        <div class="text-gray-700 mt-1">${receta.descripcion}</div>
                        <div class="text-sm mt-1"><b>Ingredientes:</b> ${receta.ingredientes}</div>
                        <div class="text-sm mt-1"><b>Pasos:</b> ${receta.pasos}</div>
                        <div class="text-xs text-gray-400 mt-1">${new Date(receta.fecha_creacion).toLocaleString()}</div>
                        <div class="mt-2 flex gap-2">
                            <button class="bg-red-500 text-white px-2 py-1 rounded delete-btn" data-id="${receta.id}">Eliminar</button>
                            <button class="bg-yellow-500 text-white px-2 py-1 rounded edit-btn" data-id="${receta.id}">Editar</button>
                        </div>
                    </div>
                `;
                recetaList.appendChild(li);
            });
            // Asignar eventos a los botones
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = btn.getAttribute('data-id');
                    if (confirm('¿Seguro que deseas eliminar esta receta?')) {
                        await fetch(`${apiUrl}/recetas/${id}`, { method: 'DELETE' });
                        fetchRecetas();
                        if (editandoId == id) {
                            recetaForm.reset();
                            editandoId = null;
                            mostrarEdicion(false);
                        }
                    }
                });
            });
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = btn.getAttribute('data-id');
                    const receta = recetasArr.find(r => r.id == id);
                    document.getElementById('receta-nombre').value = receta.nombre;
                    document.getElementById('receta-descripcion').value = receta.descripcion;
                    document.getElementById('receta-ingredientes').value = receta.ingredientes;
                    document.getElementById('receta-pasos').value = receta.pasos;
                    editandoId = id;
                    mostrarEdicion(true);
                });
            });
        } catch (error) {
            alert('Error obteniendo recetas.');
        }
    }

    // Crear o Editar Receta
    recetaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('receta-nombre').value;
        const descripcion = document.getElementById('receta-descripcion').value;
        const ingredientes = document.getElementById('receta-ingredientes').value;
        const pasos = document.getElementById('receta-pasos').value;
        try {
            if (editandoId) {
                await fetch(`${apiUrl}/recetas/${editandoId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, descripcion, ingredientes, pasos })
                });
                editandoId = null;
                mostrarEdicion(false);
            } else {
                await fetch(`${apiUrl}/recetas/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, descripcion, ingredientes, pasos })
                });
            }
            fetchRecetas();
            recetaForm.reset();
        } catch (error) {
            alert('Error guardando receta.');
        }
    });

    cancelarBtn.addEventListener('click', () => {
        recetaForm.reset();
        editandoId = null;
        mostrarEdicion(false);
    });

    fetchRecetas();
    mostrarEdicion(false);
});