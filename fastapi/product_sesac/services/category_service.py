# services/post_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from repositories.product_repository import product_repository
from models.product import Product
from schemas.product import ProductCreate, ProductUpdate
