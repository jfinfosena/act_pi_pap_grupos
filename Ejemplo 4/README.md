# Cafetería con Carrito de Compras

Este proyecto es una aplicación web simple de cafetería con carrito de compras, usando FastAPI (backend) y HTML/JS (frontend).

## Instalación y ejecución

1. **Instala dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Inicia el backend:**
   ```bash
   uvicorn main:app --reload
   ```

3. **Abre el frontend:**
   - Abre el archivo `frontend/index.html` en tu navegador.

## Funcionalidades

- Crear productos de cafetería (nombre, precio y tipo: bebida, postre, snack)
- Ver lista de productos del menú
- Agregar productos al carrito
- Ver y modificar el carrito (quitar productos, limpiar carrito)
- Finalizar compra (limpia el carrito)

## Endpoints principales (API)

- `GET /products/` — Lista productos
- `POST /products/` — Crea producto (requiere nombre, precio y tipo)
- `DELETE /products/{id}` — Elimina producto
- `GET /cart/` — Ver carrito
- `POST /cart/add` — Agregar producto al carrito
- `DELETE /cart/{cart_item_id}` — Quitar producto del carrito
- `POST /cart/clear` — Limpiar carrito

## Notas
- El carrito es global (no por usuario).
- No hay autenticación.
- El frontend es estático y simple.

---
¡Listo para usar y modificar como cafetería!
