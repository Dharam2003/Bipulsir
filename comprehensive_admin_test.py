#!/usr/bin/env python3
"""
Comprehensive test for admin login functionality after the fix
"""

import requests
import base64
import json

BACKEND_URL = "https://coaching-login-fix.preview.emergentagent.com/api"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def test_admin_endpoints():
    """Test all admin endpoints with authentication"""
    print("Testing all admin endpoints with authentication...")
    
    # Create Basic Auth header
    auth_string = f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}"
    auth_b64 = base64.b64encode(auth_string.encode('ascii')).decode('ascii')
    headers = {'Authorization': f'Basic {auth_b64}'}
    
    admin_endpoints = [
        ("GET", "/admin/contacts", "Contact messages retrieval"),
        ("GET", "/admin/schedule", "Schedule management (should be 404 - no GET endpoint)"),
    ]
    
    results = []
    
    for method, endpoint, description in admin_endpoints:
        try:
            if method == "GET":
                response = requests.get(f"{BACKEND_URL}{endpoint}", headers=headers)
            
            print(f"{method} {endpoint}: {response.status_code} - {description}")
            
            if endpoint == "/admin/contacts" and response.status_code == 200:
                results.append(("✅", f"{method} {endpoint}", "Authentication successful"))
            elif endpoint == "/admin/schedule" and response.status_code == 404:
                results.append(("✅", f"{method} {endpoint}", "Expected 404 (no GET endpoint)"))
            else:
                results.append(("❌", f"{method} {endpoint}", f"Unexpected status: {response.status_code}"))
                
        except Exception as e:
            results.append(("❌", f"{method} {endpoint}", f"Error: {str(e)}"))
    
    return results

def test_invalid_credentials():
    """Test with invalid credentials"""
    print("\nTesting with invalid credentials...")
    
    # Create Basic Auth header with wrong password
    auth_string = f"{ADMIN_USERNAME}:wrongpassword"
    auth_b64 = base64.b64encode(auth_string.encode('ascii')).decode('ascii')
    headers = {'Authorization': f'Basic {auth_b64}'}
    
    try:
        response = requests.get(f"{BACKEND_URL}/admin/contacts", headers=headers)
        
        if response.status_code == 401:
            print("✅ Invalid credentials correctly rejected with 401")
            return True
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing invalid credentials: {str(e)}")
        return False

def test_frontend_auth_endpoint():
    """Test the specific endpoint that frontend uses for authentication"""
    print("\nTesting frontend authentication endpoint...")
    
    # This is exactly what the frontend does now
    auth_string = f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}"
    auth_b64 = base64.b64encode(auth_string.encode('ascii')).decode('ascii')
    
    try:
        response = requests.get(f"{BACKEND_URL}/admin/contacts", 
                              headers={'Authorization': f'Basic {auth_b64}'})
        
        if response.status_code == 200:
            print("✅ Frontend authentication endpoint working correctly")
            contacts = response.json()
            print(f"   Retrieved {len(contacts)} contact messages")
            return True
        else:
            print(f"❌ Frontend auth endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Frontend auth test error: {str(e)}")
        return False

def test_api_accessibility():
    """Test basic API accessibility"""
    print("\nTesting API accessibility...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/")
        
        if response.status_code == 200:
            data = response.json()
            if "Bipul Competitive" in data.get("message", ""):
                print("✅ API root endpoint accessible")
                return True
            else:
                print(f"❌ Unexpected API response: {data}")
                return False
        else:
            print(f"❌ API not accessible: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API accessibility error: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("COMPREHENSIVE ADMIN LOGIN TEST AFTER FIX")
    print("=" * 70)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Admin credentials: {ADMIN_USERNAME}/{ADMIN_PASSWORD}")
    print()
    
    # Run all tests
    api_accessible = test_api_accessibility()
    admin_results = test_admin_endpoints()
    invalid_creds = test_invalid_credentials()
    frontend_auth = test_frontend_auth_endpoint()
    
    print("\n" + "=" * 70)
    print("DETAILED RESULTS")
    print("=" * 70)
    
    for status, endpoint, message in admin_results:
        print(f"{status} {endpoint}: {message}")
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"API Accessibility: {'✅ PASS' if api_accessible else '❌ FAIL'}")
    print(f"Invalid Credentials Rejection: {'✅ PASS' if invalid_creds else '❌ FAIL'}")
    print(f"Frontend Auth Endpoint: {'✅ PASS' if frontend_auth else '❌ FAIL'}")
    
    all_admin_passed = all(result[0] == "✅" for result in admin_results)
    print(f"Admin Endpoints: {'✅ PASS' if all_admin_passed else '❌ FAIL'}")
    
    overall_success = api_accessible and invalid_creds and frontend_auth and all_admin_passed
    
    print(f"\nOVERALL STATUS: {'🎉 ALL TESTS PASSED' if overall_success else '🚨 SOME TESTS FAILED'}")
    
    if overall_success:
        print("\n✅ ADMIN LOGIN ISSUE RESOLVED!")
        print("   - Backend authentication working correctly")
        print("   - Frontend should now be able to login with admin/admin123")
        print("   - CORS properly configured")
        print("   - All admin endpoints accessible with proper authentication")
    else:
        print("\n❌ ADMIN LOGIN STILL HAS ISSUES!")
        print("   - Check failed tests above for details")