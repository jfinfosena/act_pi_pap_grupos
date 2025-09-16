document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:8000';

    const autoForm = document.getElementById('auto-form');
    const autoList = document.getElementById('auto-list');

    // Mostrar galería de autos
    async function fetchAutos() {
        try {
            const response = await fetch(`${apiUrl}/autos/`);
            if (!response.ok) throw new Error('No se pudo obtener autos');
            const autos = await response.json();
            autoList.innerHTML = '';
            autos.forEach(auto => {
                const li = document.createElement('li');
                li.className = 'p-2 border-b border-gray-200 flex justify-between items-center';
                li.innerHTML = `
                    <div class="flex items-center gap-4">
                        ${auto.imagen_url ? `<img src="${auto.imagen_url}" alt="auto" class="w-24 h-16 object-cover rounded" />` : ''}
                        <span>${auto.marca} ${auto.modelo} (${auto.anio}) - $${auto.precio} ${auto.vendido ? '<span class="text-red-500">[VENDIDO]</span>' : ''}</span>
                    </div>
                    <div>
                        ${!auto.vendido ? `<button class="bg-green-500 text-white p-1 rounded vender-auto" data-id="${auto.id}">Marcar como vendido</button>` : ''}
                        <button class="bg-red-500 text-white p-1 rounded eliminar-auto" data-id="${auto.id}">Eliminar</button>
                    </div>
                `;
                autoList.appendChild(li);
            });
        } catch (error) {
            alert('Error obteniendo autos.');
        }
    }

    // Crear auto
    autoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const marca = document.getElementById('auto-marca').value;
        const modelo = document.getElementById('auto-modelo').value;
        const anio = document.getElementById('auto-anio').value;
        const precio = document.getElementById('auto-precio').value;
        const imagen_url = document.getElementById('auto-imagen').value;
        try {
            await fetch(`${apiUrl}/autos/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ marca, modelo, anio: parseInt(anio), precio: parseFloat(precio), imagen_url })
            });
            fetchAutos();
            autoForm.reset();
        } catch (error) {
            alert('Error creando auto.');
        }
    });

    // Acciones de la galería
    autoList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('vender-auto')) {
            const id = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/autos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ vendido: true })
                });
                fetchAutos();
            } catch (error) {
                alert('Error marcando como vendido.');
            }
        } else if (e.target.classList.contains('eliminar-auto')) {
            const id = e.target.dataset.id;
            try {
                await fetch(`${apiUrl}/autos/${id}`, { method: 'DELETE' });
                fetchAutos();
            } catch (error) {
                alert('Error eliminando auto.');
            }
        }
    });

    fetchAutos();
});