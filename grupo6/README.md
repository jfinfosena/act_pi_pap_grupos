# Gestor de Recetas

Este proyecto es una aplicación web simple para la gestión de recetas de cocina, usando FastAPI (backend) y HTML/JS (frontend).

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

- Agregar recetas con nombre, descripción, ingredientes y pasos.
- Ver listado de recetas guardadas.

## Endpoints principales (API)

- `GET /recetas/` — Lista todas las recetas
- `POST /recetas/` — Crea una nueva receta

## Notas
- No hay autenticación.
- El frontend es estático y simple.

---
¡Listo para usar y modificar como gestor de recetas!
