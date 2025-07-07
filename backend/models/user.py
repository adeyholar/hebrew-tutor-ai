from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, Enum, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class Dialect(str, enum.Enum):
    ASHKENAZI = "ashkenazi"
    SEPHARDIC = "sephardic"
    MODERN = "modern"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    dialect = Column(Enum(Dialect), default=Dialect.MODERN)
    proficiency_level = Column(Integer, default=1)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    dialect: Dialect = Dialect.MODERN
    proficiency_level: int = 1

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    dialect: Dialect
    proficiency_level: int