from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.models import models
from app.routers import pqrs

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema PQRS",
    description="API simple para gestión de Peticiones, Quejas, Reclamos y Sugerencias.",
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

app.include_router(pqrs.router)
