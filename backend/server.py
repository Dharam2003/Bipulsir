from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import secrets
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Simple admin authentication
security = HTTPBasic()
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')  # Simple password for admin

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    is_correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not is_correct_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return credentials.username

# Define Models
class PDFDocument(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    exam_type: str  # SSC, UPSC, Banking, Railway, State PSC, etc.
    subject: str
    batch: str
    filename: str
    file_path: str
    upload_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    description: Optional[str] = None

class PDFDocumentCreate(BaseModel):
    title: str
    exam_type: str
    subject: str
    batch: str
    description: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: str
    course_interested: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    email: str
    course_interested: str
    message: Optional[str] = None

class ClassSchedule(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    exam_type: str
    subject: str
    day_of_week: str
    time: str
    is_online: bool
    meeting_link: Optional[str] = None
    created_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ClassScheduleCreate(BaseModel):
    exam_type: str
    subject: str
    day_of_week: str
    time: str
    is_online: bool
    meeting_link: Optional[str] = None

# Routes

@api_router.get("/")
async def root():
    return {"message": "Bipul Competitive - Government Exam Coaching API"}

# PDF Management Routes
@api_router.post("/admin/pdfs", response_model=PDFDocument)
async def upload_pdf(
    file: UploadFile = File(...),
    title: str = Form(...),
    exam_type: str = Form(...),
    subject: str = Form(...),
    batch: str = Form(...),
    description: Optional[str] = Form(None),
    admin: str = Depends(verify_admin)
):
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    file_extension = ".pdf"
    unique_filename = f"{file_id}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create PDF document record
    pdf_doc = PDFDocument(
        title=title,
        exam_type=exam_type,
        subject=subject,
        batch=batch,
        filename=file.filename,
        file_path=str(file_path),
        description=description
    )
    
    # Save to database
    await db.pdf_documents.insert_one(pdf_doc.dict())
    return pdf_doc

@api_router.get("/pdfs", response_model=List[PDFDocument])
async def get_all_pdfs():
    pdfs = await db.pdf_documents.find().sort("upload_date", -1).to_list(length=None)
    return [PDFDocument(**pdf) for pdf in pdfs]

@api_router.get("/pdfs/exam/{exam_type}", response_model=List[PDFDocument])
async def get_pdfs_by_exam(exam_type: str):
    pdfs = await db.pdf_documents.find({"exam_type": exam_type}).sort("upload_date", -1).to_list(length=None)
    return [PDFDocument(**pdf) for pdf in pdfs]

@api_router.get("/pdfs/download/{pdf_id}")
async def download_pdf(pdf_id: str):
    pdf_doc = await db.pdf_documents.find_one({"id": pdf_id})
    if not pdf_doc:
        raise HTTPException(status_code=404, detail="PDF not found")
    
    file_path = Path(pdf_doc["file_path"])
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found on server")
    
    return FileResponse(
        path=file_path,
        filename=pdf_doc["filename"],
        media_type="application/pdf"
    )

@api_router.delete("/admin/pdfs/{pdf_id}")
async def delete_pdf(pdf_id: str, admin: str = Depends(verify_admin)):
    pdf_doc = await db.pdf_documents.find_one({"id": pdf_id})
    if not pdf_doc:
        raise HTTPException(status_code=404, detail="PDF not found")
    
    # Delete file from filesystem
    file_path = Path(pdf_doc["file_path"])
    if file_path.exists():
        file_path.unlink()
    
    # Delete from database
    await db.pdf_documents.delete_one({"id": pdf_id})
    return {"message": "PDF deleted successfully"}

# Contact Management Routes
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact: ContactMessageCreate):
    contact_msg = ContactMessage(**contact.dict())
    await db.contact_messages.insert_one(contact_msg.dict())
    return contact_msg

@api_router.get("/admin/contacts", response_model=List[ContactMessage])
async def get_contact_messages(admin: str = Depends(verify_admin)):
    contacts = await db.contact_messages.find().sort("timestamp", -1).to_list(length=None)
    return [ContactMessage(**contact) for contact in contacts]

# Class Schedule Routes
@api_router.post("/admin/schedule", response_model=ClassSchedule)
async def create_class_schedule(schedule: ClassScheduleCreate, admin: str = Depends(verify_admin)):
    class_schedule = ClassSchedule(**schedule.dict())
    await db.class_schedules.insert_one(class_schedule.dict())
    return class_schedule

@api_router.get("/schedule", response_model=List[ClassSchedule])
async def get_class_schedules():
    schedules = await db.class_schedules.find().to_list(length=None)
    return [ClassSchedule(**schedule) for schedule in schedules]

@api_router.delete("/admin/schedule/{schedule_id}")
async def delete_class_schedule(schedule_id: str, admin: str = Depends(verify_admin)):
    result = await db.class_schedules.delete_one({"id": schedule_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return {"message": "Schedule deleted successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()