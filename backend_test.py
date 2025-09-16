#!/usr/bin/env python3
"""
Backend API Testing for Bipul Competitive Coaching Center
Tests all backend functionality including PDF management, admin auth, contact forms, and schedules.
"""

import requests
import json
import os
import tempfile
from pathlib import Path
import base64
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://edu-admin-portal-2.preview.emergentagent.com/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.uploaded_pdf_ids = []
        self.created_schedule_ids = []
        
    def log_result(self, test_name, success, message, details=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details or {},
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def create_test_pdf(self):
        """Create a temporary PDF file for testing"""
        # Create a simple PDF content (minimal PDF structure)
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
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(SSC CGL Study Material) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
299
%%EOF"""
        
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_file.write(pdf_content)
        temp_file.close()
        return temp_file.name

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = self.session.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "Bipul Competitive" in data.get("message", ""):
                    self.log_result("Root Endpoint", True, "API root endpoint accessible")
                    return True
                else:
                    self.log_result("Root Endpoint", False, "Unexpected response message", {"response": data})
                    return False
            else:
                self.log_result("Root Endpoint", False, f"HTTP {response.status_code}", {"response": response.text})
                return False
        except Exception as e:
            self.log_result("Root Endpoint", False, f"Connection error: {str(e)}")
            return False

    def test_admin_authentication(self):
        """Test admin authentication with correct and incorrect credentials"""
        # Test with correct credentials
        try:
            auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
            response = self.session.get(f"{BACKEND_URL}/admin/contacts", auth=auth)
            
            if response.status_code == 200:
                self.log_result("Admin Auth - Valid Credentials", True, "Admin authentication successful")
                auth_success = True
            else:
                self.log_result("Admin Auth - Valid Credentials", False, f"HTTP {response.status_code}", {"response": response.text})
                auth_success = False
        except Exception as e:
            self.log_result("Admin Auth - Valid Credentials", False, f"Error: {str(e)}")
            auth_success = False
        
        # Test with incorrect credentials
        try:
            wrong_auth = (ADMIN_USERNAME, "wrongpassword")
            response = self.session.get(f"{BACKEND_URL}/admin/contacts", auth=wrong_auth)
            
            if response.status_code == 401:
                self.log_result("Admin Auth - Invalid Credentials", True, "Correctly rejected invalid credentials")
            else:
                self.log_result("Admin Auth - Invalid Credentials", False, f"Should return 401, got {response.status_code}")
        except Exception as e:
            self.log_result("Admin Auth - Invalid Credentials", False, f"Error: {str(e)}")
        
        return auth_success

    def test_contact_form_submission(self):
        """Test contact form submission and retrieval"""
        # Submit contact form
        contact_data = {
            "name": "Rajesh Kumar",
            "phone": "9876543210",
            "email": "rajesh.kumar@email.com",
            "course_interested": "SSC CGL",
            "message": "I am interested in joining SSC CGL coaching batch starting next month."
        }
        
        try:
            response = self.session.post(f"{BACKEND_URL}/contact", json=contact_data)
            
            if response.status_code == 200:
                contact_response = response.json()
                contact_id = contact_response.get("id")
                self.log_result("Contact Form Submission", True, "Contact form submitted successfully", {"contact_id": contact_id})
                
                # Test retrieving contact messages as admin
                auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
                response = self.session.get(f"{BACKEND_URL}/admin/contacts", auth=auth)
                
                if response.status_code == 200:
                    contacts = response.json()
                    # Check if our submitted contact is in the list
                    found_contact = any(c.get("id") == contact_id for c in contacts)
                    if found_contact:
                        self.log_result("Contact Retrieval", True, "Contact message retrieved successfully")
                        return True
                    else:
                        self.log_result("Contact Retrieval", False, "Submitted contact not found in admin list")
                        return False
                else:
                    self.log_result("Contact Retrieval", False, f"HTTP {response.status_code}", {"response": response.text})
                    return False
            else:
                self.log_result("Contact Form Submission", False, f"HTTP {response.status_code}", {"response": response.text})
                return False
                
        except Exception as e:
            self.log_result("Contact Form Submission", False, f"Error: {str(e)}")
            return False

    def test_pdf_management(self):
        """Test PDF upload, listing, download, and deletion"""
        auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
        
        # Create test PDF
        pdf_file_path = self.create_test_pdf()
        
        try:
            # Test PDF upload
            with open(pdf_file_path, 'rb') as pdf_file:
                files = {'file': ('ssc_cgl_study_material.pdf', pdf_file, 'application/pdf')}
                data = {
                    'title': 'SSC CGL Mathematics Study Material',
                    'exam_type': 'SSC',
                    'subject': 'Mathematics',
                    'batch': 'Morning Batch 2024',
                    'description': 'Comprehensive mathematics study material for SSC CGL preparation'
                }
                
                response = self.session.post(f"{BACKEND_URL}/admin/pdfs", files=files, data=data, auth=auth)
                
                if response.status_code == 200:
                    pdf_response = response.json()
                    pdf_id = pdf_response.get("id")
                    self.uploaded_pdf_ids.append(pdf_id)
                    self.log_result("PDF Upload", True, "PDF uploaded successfully", {"pdf_id": pdf_id})
                    
                    # Test PDF listing
                    response = self.session.get(f"{BACKEND_URL}/pdfs")
                    if response.status_code == 200:
                        pdfs = response.json()
                        found_pdf = any(p.get("id") == pdf_id for p in pdfs)
                        if found_pdf:
                            self.log_result("PDF Listing", True, "PDF appears in public listing")
                        else:
                            self.log_result("PDF Listing", False, "Uploaded PDF not found in listing")
                    else:
                        self.log_result("PDF Listing", False, f"HTTP {response.status_code}")
                    
                    # Test PDF download
                    response = self.session.get(f"{BACKEND_URL}/pdfs/download/{pdf_id}")
                    if response.status_code == 200:
                        if response.headers.get('content-type') == 'application/pdf':
                            self.log_result("PDF Download", True, "PDF download successful")
                        else:
                            self.log_result("PDF Download", False, "Downloaded file is not PDF format")
                    else:
                        self.log_result("PDF Download", False, f"HTTP {response.status_code}")
                    
                    # Test PDF filtering by exam type
                    response = self.session.get(f"{BACKEND_URL}/pdfs/exam/SSC")
                    if response.status_code == 200:
                        ssc_pdfs = response.json()
                        found_ssc_pdf = any(p.get("id") == pdf_id for p in ssc_pdfs)
                        if found_ssc_pdf:
                            self.log_result("PDF Filtering", True, "PDF filtering by exam type works")
                        else:
                            self.log_result("PDF Filtering", False, "PDF not found in SSC filter")
                    else:
                        self.log_result("PDF Filtering", False, f"HTTP {response.status_code}")
                    
                    return True
                else:
                    self.log_result("PDF Upload", False, f"HTTP {response.status_code}", {"response": response.text})
                    return False
                    
        except Exception as e:
            self.log_result("PDF Upload", False, f"Error: {str(e)}")
            return False
        finally:
            # Clean up temporary file
            if os.path.exists(pdf_file_path):
                os.unlink(pdf_file_path)

    def test_class_schedule_management(self):
        """Test class schedule creation, listing, and deletion"""
        auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
        
        # Create test schedule
        schedule_data = {
            "exam_type": "SSC CGL",
            "subject": "General Awareness",
            "day_of_week": "Monday",
            "time": "10:00 AM - 12:00 PM",
            "is_online": True,
            "meeting_link": "https://meet.google.com/abc-defg-hij"
        }
        
        try:
            # Test schedule creation
            response = self.session.post(f"{BACKEND_URL}/admin/schedule", json=schedule_data, auth=auth)
            
            if response.status_code == 200:
                schedule_response = response.json()
                schedule_id = schedule_response.get("id")
                self.created_schedule_ids.append(schedule_id)
                self.log_result("Schedule Creation", True, "Class schedule created successfully", {"schedule_id": schedule_id})
                
                # Test schedule listing (public access)
                response = self.session.get(f"{BACKEND_URL}/schedule")
                if response.status_code == 200:
                    schedules = response.json()
                    found_schedule = any(s.get("id") == schedule_id for s in schedules)
                    if found_schedule:
                        self.log_result("Schedule Listing", True, "Schedule appears in public listing")
                        return True
                    else:
                        self.log_result("Schedule Listing", False, "Created schedule not found in listing")
                        return False
                else:
                    self.log_result("Schedule Listing", False, f"HTTP {response.status_code}")
                    return False
            else:
                self.log_result("Schedule Creation", False, f"HTTP {response.status_code}", {"response": response.text})
                return False
                
        except Exception as e:
            self.log_result("Schedule Creation", False, f"Error: {str(e)}")
            return False

    def test_pdf_deletion(self):
        """Test PDF deletion (requires admin auth)"""
        if not self.uploaded_pdf_ids:
            self.log_result("PDF Deletion", False, "No PDFs to delete (upload test may have failed)")
            return False
        
        auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
        
        for pdf_id in self.uploaded_pdf_ids:
            try:
                response = self.session.delete(f"{BACKEND_URL}/admin/pdfs/{pdf_id}", auth=auth)
                
                if response.status_code == 200:
                    self.log_result("PDF Deletion", True, f"PDF {pdf_id} deleted successfully")
                    
                    # Verify PDF is no longer accessible
                    response = self.session.get(f"{BACKEND_URL}/pdfs/download/{pdf_id}")
                    if response.status_code == 404:
                        self.log_result("PDF Deletion Verification", True, "Deleted PDF no longer accessible")
                    else:
                        self.log_result("PDF Deletion Verification", False, "Deleted PDF still accessible")
                else:
                    self.log_result("PDF Deletion", False, f"HTTP {response.status_code}", {"response": response.text})
                    return False
                    
            except Exception as e:
                self.log_result("PDF Deletion", False, f"Error: {str(e)}")
                return False
        
        return True

    def test_schedule_deletion(self):
        """Test schedule deletion (requires admin auth)"""
        if not self.created_schedule_ids:
            self.log_result("Schedule Deletion", False, "No schedules to delete (creation test may have failed)")
            return False
        
        auth = (ADMIN_USERNAME, ADMIN_PASSWORD)
        
        for schedule_id in self.created_schedule_ids:
            try:
                response = self.session.delete(f"{BACKEND_URL}/admin/schedule/{schedule_id}", auth=auth)
                
                if response.status_code == 200:
                    self.log_result("Schedule Deletion", True, f"Schedule {schedule_id} deleted successfully")
                else:
                    self.log_result("Schedule Deletion", False, f"HTTP {response.status_code}", {"response": response.text})
                    return False
                    
            except Exception as e:
                self.log_result("Schedule Deletion", False, f"Error: {str(e)}")
                return False
        
        return True

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("BIPUL COMPETITIVE COACHING CENTER - BACKEND API TESTING")
        print("=" * 80)
        print(f"Testing backend at: {BACKEND_URL}")
        print(f"Admin credentials: {ADMIN_USERNAME}/{ADMIN_PASSWORD}")
        print()
        
        # Test sequence
        tests = [
            ("Root Endpoint", self.test_root_endpoint),
            ("Admin Authentication", self.test_admin_authentication),
            ("Contact Form", self.test_contact_form_submission),
            ("PDF Management", self.test_pdf_management),
            ("Class Schedule Management", self.test_class_schedule_management),
            ("PDF Deletion", self.test_pdf_deletion),
            ("Schedule Deletion", self.test_schedule_deletion),
        ]
        
        passed = 0
        total = len(tests)
        
        for test_name, test_func in tests:
            print(f"\n--- Testing {test_name} ---")
            try:
                if test_func():
                    passed += 1
            except Exception as e:
                self.log_result(test_name, False, f"Unexpected error: {str(e)}")
        
        # Summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        failed_tests = []
        for result in self.test_results:
            if "❌ FAIL" in result["status"]:
                failed_tests.append(result)
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {len(self.test_results) - len(failed_tests)}")
        print(f"Failed: {len(failed_tests)}")
        
        if failed_tests:
            print("\nFAILED TESTS:")
            for test in failed_tests:
                print(f"  ❌ {test['test']}: {test['message']}")
                if test['details']:
                    print(f"     Details: {test['details']}")
        
        print(f"\nOverall Success Rate: {((len(self.test_results) - len(failed_tests)) / len(self.test_results) * 100):.1f}%")
        
        return len(failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)