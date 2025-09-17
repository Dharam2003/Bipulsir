#!/usr/bin/env python3
"""
Specific Admin Panel Testing for PDF Upload Functionality
Focus on testing the exact scenarios mentioned in the review request.
"""

import requests
import tempfile
import os
from datetime import datetime

# Backend URL and admin credentials
BACKEND_URL = "https://coaching-login-fix.preview.emergentagent.com/api"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def create_realistic_pdf():
    """Create a more realistic PDF for testing"""
    pdf_content = b"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 16 Tf
50 750 Td
(SSC CGL Mathematics - Algebra Chapter) Tj
0 -30 Td
/F1 12 Tf
(Bipul Competitive Coaching Center) Tj
0 -20 Td
(Study Material for Government Exam Preparation) Tj
0 -40 Td
(Chapter 1: Linear Equations) Tj
0 -20 Td
(Practice Questions and Solutions) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000273 00000 n 
0000000525 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
595
%%EOF"""
    
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    temp_file.write(pdf_content)
    temp_file.close()
    return temp_file.name

def test_admin_panel_pdf_upload():
    """Test PDF upload functionality specifically for admin panel"""
    print("🔍 TESTING ADMIN PANEL PDF UPLOAD FUNCTIONALITY")
    print("=" * 60)
    
    session = requests.Session()
    auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
    
    # Test 1: Admin Authentication
    print("\n1. Testing Admin Authentication...")
    try:
        response = session.get(f"{BACKEND_URL}/admin/contacts", auth=auth)
        if response.status_code == 200:
            print("✅ Admin authentication successful with admin/admin123")
        else:
            print(f"❌ Admin authentication failed: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Admin authentication error: {e}")
        return False
    
    # Test 2: PDF Upload with Admin Auth
    print("\n2. Testing PDF Upload with Admin Authentication...")
    pdf_file_path = create_realistic_pdf()
    uploaded_pdf_id = None
    
    try:
        with open(pdf_file_path, 'rb') as pdf_file:
            files = {'file': ('SSC_CGL_Mathematics_Algebra.pdf', pdf_file, 'application/pdf')}
            data = {
                'title': 'SSC CGL Mathematics - Algebra Chapter',
                'exam_type': 'SSC',
                'subject': 'Mathematics',
                'batch': 'Evening Batch 2024',
                'description': 'Complete algebra chapter with practice questions for SSC CGL preparation'
            }
            
            response = session.post(f"{BACKEND_URL}/admin/pdfs", files=files, data=data, auth=auth)
            
            if response.status_code == 200:
                pdf_response = response.json()
                uploaded_pdf_id = pdf_response.get("id")
                print(f"✅ PDF uploaded successfully")
                print(f"   📄 Title: {pdf_response.get('title')}")
                print(f"   📚 Exam Type: {pdf_response.get('exam_type')}")
                print(f"   📖 Subject: {pdf_response.get('subject')}")
                print(f"   🎓 Batch: {pdf_response.get('batch')}")
                print(f"   🆔 PDF ID: {uploaded_pdf_id}")
            else:
                print(f"❌ PDF upload failed: HTTP {response.status_code}")
                print(f"   Response: {response.text}")
                return False
                
    except Exception as e:
        print(f"❌ PDF upload error: {e}")
        return False
    finally:
        if os.path.exists(pdf_file_path):
            os.unlink(pdf_file_path)
    
    # Test 3: Verify PDF appears in listing
    print("\n3. Testing PDF appears in public listing...")
    try:
        response = session.get(f"{BACKEND_URL}/pdfs")
        if response.status_code == 200:
            pdfs = response.json()
            found_pdf = any(p.get("id") == uploaded_pdf_id for p in pdfs)
            if found_pdf:
                print("✅ Uploaded PDF appears in public listing")
            else:
                print("❌ Uploaded PDF not found in public listing")
        else:
            print(f"❌ Failed to get PDF listing: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ PDF listing error: {e}")
    
    # Test 4: Test PDF download
    print("\n4. Testing PDF download functionality...")
    try:
        response = session.get(f"{BACKEND_URL}/pdfs/download/{uploaded_pdf_id}")
        if response.status_code == 200:
            if response.headers.get('content-type') == 'application/pdf':
                print("✅ PDF download successful with correct content-type")
                print(f"   📁 File size: {len(response.content)} bytes")
            else:
                print(f"❌ PDF download has wrong content-type: {response.headers.get('content-type')}")
        else:
            print(f"❌ PDF download failed: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ PDF download error: {e}")
    
    # Test 5: Test contact messages retrieval with admin auth
    print("\n5. Testing Contact Messages Retrieval with Admin Auth...")
    try:
        response = session.get(f"{BACKEND_URL}/admin/contacts", auth=auth)
        if response.status_code == 200:
            contacts = response.json()
            print(f"✅ Contact messages retrieved successfully")
            print(f"   📧 Total contacts: {len(contacts)}")
            if contacts:
                latest_contact = contacts[0]
                print(f"   👤 Latest contact: {latest_contact.get('name')} - {latest_contact.get('course_interested')}")
        else:
            print(f"❌ Contact messages retrieval failed: HTTP {response.status_code}")
    except Exception as e:
        print(f"❌ Contact messages retrieval error: {e}")
    
    # Test 6: Test class schedule creation with admin auth
    print("\n6. Testing Class Schedule Creation with Admin Auth...")
    schedule_data = {
        "exam_type": "SSC CGL",
        "subject": "Mathematics - Algebra",
        "day_of_week": "Tuesday",
        "time": "2:00 PM - 4:00 PM",
        "is_online": True,
        "meeting_link": "https://meet.google.com/ssc-cgl-math"
    }
    
    created_schedule_id = None
    try:
        response = session.post(f"{BACKEND_URL}/admin/schedule", json=schedule_data, auth=auth)
        if response.status_code == 200:
            schedule_response = response.json()
            created_schedule_id = schedule_response.get("id")
            print(f"✅ Class schedule created successfully")
            print(f"   📅 Subject: {schedule_response.get('subject')}")
            print(f"   🗓️  Day: {schedule_response.get('day_of_week')}")
            print(f"   ⏰ Time: {schedule_response.get('time')}")
            print(f"   💻 Online: {schedule_response.get('is_online')}")
        else:
            print(f"❌ Class schedule creation failed: HTTP {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Class schedule creation error: {e}")
    
    # Test 7: Test PDF deletion with admin auth
    print("\n7. Testing PDF Deletion with Admin Auth...")
    if uploaded_pdf_id:
        try:
            response = session.delete(f"{BACKEND_URL}/admin/pdfs/{uploaded_pdf_id}", auth=auth)
            if response.status_code == 200:
                print("✅ PDF deleted successfully")
                
                # Verify deletion
                response = session.get(f"{BACKEND_URL}/pdfs/download/{uploaded_pdf_id}")
                if response.status_code == 404:
                    print("✅ PDF deletion verified - file no longer accessible")
                else:
                    print("❌ PDF still accessible after deletion")
            else:
                print(f"❌ PDF deletion failed: HTTP {response.status_code}")
        except Exception as e:
            print(f"❌ PDF deletion error: {e}")
    
    # Test 8: Test schedule deletion with admin auth
    print("\n8. Testing Schedule Deletion with Admin Auth...")
    if created_schedule_id:
        try:
            response = session.delete(f"{BACKEND_URL}/admin/schedule/{created_schedule_id}", auth=auth)
            if response.status_code == 200:
                print("✅ Schedule deleted successfully")
            else:
                print(f"❌ Schedule deletion failed: HTTP {response.status_code}")
        except Exception as e:
            print(f"❌ Schedule deletion error: {e}")
    
    print("\n" + "=" * 60)
    print("🎉 ADMIN PANEL PDF UPLOAD TESTING COMPLETE")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    test_admin_panel_pdf_upload()