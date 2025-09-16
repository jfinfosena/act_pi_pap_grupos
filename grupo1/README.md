# Sistema PQRS (Peticiones, Quejas, Reclamos y Sugerencias)

Este proyecto es una aplicación web simple para la gestión de PQRS, usando FastAPI (backend) y HTML/JS (frontend).

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

- Enviar PQRS (Petición, Queja, Reclamo, Sugerencia) con nombre, email, tipo y mensaje.
- Ver listado de PQRS recibidas.

## Endpoints principales (API)

- `GET /pqrs/` — Lista todas las PQRS
- `POST /pqrs/` — Crea una nueva PQRS

## Notas
- No hay autenticación.
- El frontend es estático y simple.

---
¡Listo para usar y modificar como sistema PQRS!
