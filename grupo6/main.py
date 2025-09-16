from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.models import models
from app.routers import pqrs as recetas_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gestor de Recetas",
    description="API simple para gestión de recetas de cocina.",
    version="1.0.0",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recetas_router.router)
