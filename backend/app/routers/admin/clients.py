from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.user import User

router = APIRouter(prefix="/admin/clients", tags=["Admin - Clients"])

@router.get("/count")
def get_clients_count(db: Session = Depends(get_db)):
    count = db.query(User).filter(User.role == "client").count()
    return {"count": count}

