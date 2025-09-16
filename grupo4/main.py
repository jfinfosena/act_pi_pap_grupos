from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine
from app.models import models
from app.routers import users, products, reviews, cart

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Supermercado API",
    description="API de supermercado con productos y carrito de compras.",
    version="1.0.0",
)

# Set up CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(products.router)
app.include_router(reviews.router)
app.include_router(cart.router)
