# Concesionario de Autos (Galería y Venta)

Este proyecto es una aplicación web simple de concesionario de autos, usando FastAPI (backend) y HTML/JS (frontend).

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

- Agregar autos (marca, modelo, año, precio, imagen)
- Ver galería de autos
- Marcar autos como vendidos
- Eliminar autos

## Endpoints principales (API)

- `GET /autos/` — Lista autos
- `POST /autos/` — Crea auto
- `PUT /autos/{id}` — Actualiza auto (puede enviar solo los campos a modificar, por ejemplo `{ "vendido": true }`)
- `DELETE /autos/{id}` — Elimina auto

## Notas
- No hay autenticación.
- El frontend es estático y simple.

---
¡Listo para usar y modificar como concesionario de autos!
