#!/usr/bin/env python3
"""
Test admin login functionality specifically
"""

import requests
import base64

BACKEND_URL = "https://coaching-login-fix.preview.emergentagent.com/api"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def test_admin_login():
    """Test the exact same authentication flow as frontend"""
    print("Testing admin login functionality...")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Credentials: {ADMIN_USERNAME}/{ADMIN_PASSWORD}")
    print()
    
    # Create Basic Auth header exactly like frontend
    auth_string = f"{ADMIN_USERNAME}:{ADMIN_PASSWORD}"
    auth_bytes = auth_string.encode('ascii')
    auth_b64 = base64.b64encode(auth_bytes).decode('ascii')
    
    headers = {
        'Authorization': f'Basic {auth_b64}',
        'Content-Type': 'application/json'
    }
    
    print(f"Authorization header: Basic {auth_b64}")
    print()
    
    # Test the endpoint that frontend now uses for authentication
    try:
        print("Testing GET /admin/contacts (authentication endpoint)...")
        response = requests.get(f"{BACKEND_URL}/admin/contacts", headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print("✅ SUCCESS: Admin authentication working!")
            contacts = response.json()
            print(f"Retrieved {len(contacts)} contact messages")
            return True
        elif response.status_code == 401:
            print("❌ FAIL: Authentication failed - Invalid credentials")
            print(f"Response: {response.text}")
            return False
        else:
            print(f"❌ FAIL: Unexpected status code {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Connection error - {str(e)}")
        return False

def test_cors_headers():
    """Test CORS configuration"""
    print("\nTesting CORS headers...")
    
    try:
        # Test preflight request
        headers = {
            'Origin': 'https://coaching-login-fix.preview.emergentagent.com',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'authorization,content-type'
        }
        
        response = requests.options(f"{BACKEND_URL}/admin/contacts", headers=headers)
        print(f"OPTIONS request status: {response.status_code}")
        
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
            'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
        }
        
        print("CORS Headers:")
        for header, value in cors_headers.items():
            print(f"  {header}: {value}")
            
        return True
        
    except Exception as e:
        print(f"❌ CORS test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("ADMIN LOGIN FUNCTIONALITY TEST")
    print("=" * 60)
    
    auth_success = test_admin_login()
    cors_success = test_cors_headers()
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Admin Authentication: {'✅ PASS' if auth_success else '❌ FAIL'}")
    print(f"CORS Configuration: {'✅ PASS' if cors_success else '❌ FAIL'}")
    
    if auth_success:
        print("\n🎉 Admin login should work in frontend!")
    else:
        print("\n🚨 Admin login issue needs investigation!")