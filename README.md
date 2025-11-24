# Introducción a los ejemplos

Este repositorio reúne seis ejemplos didácticos construidos con FastAPI (backend) y HTML/JS (frontend). Cada ejemplo aborda un caso común de desarrollo web y comparte una estructura similar: modelos y esquemas de datos, operaciones CRUD, enrutadores de API y una interfaz mínima en `frontend/`.

## Índice de ejemplos

- [Ejemplo 1 — Sistema PQRS](./Ejemplo%201/)  
  Gestión de Peticiones, Quejas, Reclamos y Sugerencias. Permite crear y listar PQRS mediante la API (`/pqrs`).

- [Ejemplo 2 — Productos, Usuarios y Reseñas](./Ejemplo%202/)  
  Catálogo de productos con usuarios y reseñas relacionadas. Expone CRUD para `/products`, `/users` y `/reviews` y demuestra relaciones entre entidades.

- [Ejemplo 3 — Supermercado con Carrito](./Ejemplo%203/)  
  Gestión de productos y un carrito de compras global. Incluye endpoints de productos y carrito (`/products`, `/cart`).

- [Ejemplo 4 — Cafetería con Carrito](./Ejemplo%204/)  
  Menú de cafetería con tipos de producto (bebida, postre, snack) y carrito. Exposición de `/products` y `/cart`.

- [Ejemplo 5 — Concesionario de Autos](./Ejemplo%205/)  
  Galería y estado de venta de autos. CRUD de `/autos` con posibilidad de marcar como vendidos y eliminar.

- [Ejemplo 6 — Gestor de Recetas](./Ejemplo%206/)  
  Registro y listado de recetas con ingredientes y pasos. API centrada en `/recetas` para crear y consultar.

## Explicación general de cada ejemplo

**Ejemplo 1 — Sistema PQRS**
- Caso de uso: recepción y consulta de PQRS.
- API principal: `GET /pqrs/` para listar y `POST /pqrs/` para crear.
- Enfoque: datos simples, sin autenticación; ideal para introducir formularios y almacenamiento básico.

**Ejemplo 2 — Productos, Usuarios y Reseñas**
- Caso de uso: catálogo con usuarios que reseñan productos.
- API: CRUD en `/products`, `/users`, `/reviews` con relaciones (usuario ↔ reseña ↔ producto).
- Enfoque: modelado relacional y operaciones de actualización parcial; base para sistemas de e‑commerce sencillos.

**Ejemplo 3 — Supermercado con Carrito**
- Caso de uso: listado de productos y manejo de carrito.
- API: `/products` para gestionar productos y `/cart` para agregar, quitar y limpiar.
- Enfoque: estado de carrito global; útil para comprender flujos de compra.

**Ejemplo 4 — Cafetería con Carrito**
- Caso de uso: menú con tipos de producto y carrito.
- API: similar al ejemplo 3, añade tipificación de producto (bebida, postre, snack).
- Enfoque: validación de datos y categorías dentro de CRUD.

**Ejemplo 5 — Concesionario de Autos**
- Caso de uso: administración de inventario de autos, galería y estado de venta.
- API: `GET/POST/PUT/DELETE /autos` con actualización de campos como `vendido`.
- Enfoque: actualización parcial y gestión de recursos con atributos multimedia (imagen).

**Ejemplo 6 — Gestor de Recetas**
- Caso de uso: creación y consulta de recetas con ingredientes y pasos.
- API: `GET /recetas/` y `POST /recetas/`.
- Enfoque: estructuras de datos compuestas y formularios de entrada.

## Cómo explorar y ejecutar
- En cada carpeta `Ejemplo X`:
  - Instala dependencias con `pip install -r requirements.txt`.
  - Inicia el backend con `uvicorn main:app --reload`.
  - Abre `frontend/index.html` en el navegador para interactuar con la API.

