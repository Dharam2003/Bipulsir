import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors duration-300">
              Bipul <span className="text-blue-600">Competitive</span>
            </Link>
            <div className="ml-4 text-xs text-gray-500 hidden sm:block border-l border-gray-200 pl-4 font-medium">
              Government Exam Coaching
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              About
            </Link>
            <Link 
              to="/courses" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              Courses
            </Link>
            <Link 
              to="/notes" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              Study Materials
            </Link>
            <Link 
              to="/schedule" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              Live Classes
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-blue-50"
            >
              Contact
            </Link>
            <Link 
              to="/admin" 
              className="ml-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/courses" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/notes" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Study Materials
              </Link>
              <Link 
                to="/schedule" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Live Classes
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/admin" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;