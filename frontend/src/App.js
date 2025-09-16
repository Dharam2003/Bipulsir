import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-800">
              Bipul Competitive
            </Link>
            <span className="ml-2 text-sm text-gray-600 hidden sm:block">Government Exam Coaching</span>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">About</Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Courses</Link>
            <Link to="/notes" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Study Materials</Link>
            <Link to="/schedule" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Live Classes</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">Contact</Link>
            <Link to="/admin" className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">Admin</Link>
          </nav>

          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-blue-800 font-medium py-2">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-800 font-medium py-2">About</Link>
              <Link to="/courses" className="text-gray-700 hover:text-blue-800 font-medium py-2">Courses</Link>
              <Link to="/notes" className="text-gray-700 hover:text-blue-800 font-medium py-2">Study Materials</Link>
              <Link to="/schedule" className="text-gray-700 hover:text-blue-800 font-medium py-2">Live Classes</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-800 font-medium py-2">Contact</Link>
              <Link to="/admin" className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors inline-block text-center">Admin</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Bipul Competitive</h3>
            <p className="text-gray-300 mb-4">
              Empowering aspirants to succeed in government examinations through dedicated coaching and comprehensive study materials.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/9876543210" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link to="/notes" className="hover:text-white">Study Materials</Link></li>
              <li><Link to="/schedule" className="hover:text-white">Live Classes</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +91 98765 43210</li>
              <li>📧 info@bipulcompetitive.com</li>
              <li>📍 Demo Address, City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Bipul Competitive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1755548413928-4aaeba7c740e)',
            opacity: 0.3
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bipul Competitive
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100">
            Government Exam Coaching Center
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Master SSC, UPSC, Banking, Railway & State PSC exams with our expert live coaching and comprehensive study materials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Join Classes Now
            </button>
            <button 
              onClick={() => navigate('/notes')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all"
            >
              Access Study Materials
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bipul Competitive?</h2>
            <p className="text-xl text-gray-600">Expert coaching with proven results</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Live Teaching</h3>
              <p className="text-gray-600">Real-time interaction with expert teachers both online and offline</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Study Materials</h3>
              <p className="text-gray-600">Comprehensive PDF notes organized by exam type and subjects</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-gray-600">Track record of successful candidates in government jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Success is Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are dedicated to providing the best coaching experience for government exam aspirants. 
                Our live teaching approach ensures personalized attention and real-time doubt resolution.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span>Expert faculty with years of experience</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span>Updated curriculum as per latest patterns</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <span>Regular mock tests and assessments</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg" 
                alt="Success celebration" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// About Page Component
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Bipul Competitive</h1>
            <p className="text-xl text-gray-600">Empowering government exam aspirants since our inception</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Founder</h2>
                <p className="text-gray-600 mb-4">
                  Bipul Sir, with years of experience in government exam preparation, founded this coaching center 
                  with a vision to provide quality education and guidance to aspiring candidates.
                </p>
                <p className="text-gray-600">
                  Our teaching methodology focuses on conceptual clarity, regular practice, and personalized attention 
                  to ensure every student achieves their government job dreams.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-semibold">Bipul Sir</h3>
                <p className="text-gray-600">Founder & Chief Instructor</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Quality Education</h3>
                <p className="text-gray-700">Providing comprehensive and updated study materials for all major government exams</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Live Teaching</h3>
                <p className="text-gray-700">Real-time interaction and personalized guidance through live classes</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Student Success</h3>
                <p className="text-gray-700">Dedicated to helping every student achieve their government job aspirations</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Continuous Support</h3>
                <p className="text-gray-700">Ongoing mentorship and guidance throughout the preparation journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Courses Page Component
const Courses = () => {
  const courses = [
    { name: "SSC", icon: "🏛️", description: "Staff Selection Commission exams including CGL, CHSL, MTS", subjects: ["General Knowledge", "Quantitative Aptitude", "English", "Reasoning"] },
    { name: "UPSC", icon: "🎯", description: "Union Public Service Commission - Civil Services Examination", subjects: ["History", "Geography", "Polity", "Economy", "Current Affairs"] },
    { name: "Banking", icon: "🏦", description: "Bank PO, Clerk, and Specialist Officer positions", subjects: ["Banking Awareness", "Computer Knowledge", "English", "Quantitative Aptitude"] },
    { name: "Railway", icon: "🚂", description: "Railway Recruitment Board examinations", subjects: ["General Awareness", "Mathematics", "General Intelligence", "General Science"] },
    { name: "State PSC", icon: "🏢", description: "State Public Service Commission examinations", subjects: ["State GK", "Indian Polity", "History", "Current Affairs"] },
    { name: "Defence", icon: "🛡️", description: "NDA, CDS, and other defence examinations", subjects: ["Mathematics", "General Ability", "English", "Current Affairs"] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
            <p className="text-xl text-gray-600">Comprehensive coaching for all major government examinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{course.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-center">{course.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Key Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Notes/Study Materials Page Component
const Notes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('All');
  const [groupBy, setGroupBy] = useState('exam_type');

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await axios.get(`${API}/pdfs`);
      setPdfs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      setLoading(false);
    }
  };

  const examTypes = ['All', 'SSC', 'UPSC', 'Banking', 'Railway', 'State PSC', 'Defence'];

  const filteredPdfs = selectedExam === 'All' 
    ? pdfs 
    : pdfs.filter(pdf => pdf.exam_type === selectedExam);

  const groupedPdfs = filteredPdfs.reduce((acc, pdf) => {
    const key = pdf[groupBy];
    if (!acc[key]) acc[key] = [];
    acc[key].push(pdf);
    return acc;
  }, {});

  const downloadPDF = async (pdfId, filename) => {
    try {
      const response = await axios.get(`${API}/pdfs/download/${pdfId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading study materials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Materials</h1>
            <p className="text-xl text-gray-600">Access comprehensive PDF notes for all exam types</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Exam:</label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  {examTypes.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group by:</label>
                <select 
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="exam_type">Exam Type</option>
                  <option value="subject">Subject</option>
                  <option value="batch">Batch</option>
                </select>
              </div>
            </div>
          </div>

          {/* PDF Lists */}
          {Object.keys(groupedPdfs).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No study materials available yet.</p>
              <p className="text-gray-500">Materials will be uploaded by the admin soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedPdfs).map(([groupKey, groupPdfs]) => (
                <div key={groupKey} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                    {groupKey.replace('_', ' ')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupPdfs.map((pdf) => (
                      <div key={pdf.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">📄</span>
                          <h3 className="font-semibold text-gray-900 flex-1">{pdf.title}</h3>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                          <p><strong>Exam:</strong> {pdf.exam_type}</p>
                          <p><strong>Subject:</strong> {pdf.subject}</p>
                          <p><strong>Batch:</strong> {pdf.batch}</p>
                          {pdf.description && <p><strong>Description:</strong> {pdf.description}</p>}
                          <p><strong>Uploaded:</strong> {new Date(pdf.upload_date).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => downloadPDF(pdf.id, pdf.filename)}
                          className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors"
                        >
                          Download PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Schedule Page Component
const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API}/schedule`);
      setSchedules(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
    }
  };

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.day_of_week]) acc[schedule.day_of_week] = [];
    acc[schedule.day_of_week].push(schedule);
    return acc;
  }, {});

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading class schedules...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Class Schedule</h1>
            <p className="text-xl text-gray-600">Join our live classes for interactive learning</p>
          </div>

          {schedules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No class schedules available yet.</p>
              <p className="text-gray-500">Schedules will be updated by the admin soon.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {daysOrder.map(day => {
                const daySchedules = groupedSchedules[day] || [];
                if (daySchedules.length === 0) return null;
                
                return (
                  <div key={day} className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{day}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {daySchedules.map((schedule) => (
                        <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{schedule.is_online ? '💻' : '🏫'}</span>
                            <h3 className="font-semibold text-gray-900">{schedule.exam_type}</h3>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Subject:</strong> {schedule.subject}</p>
                            <p><strong>Time:</strong> {schedule.time}</p>
                            <p><strong>Mode:</strong> {schedule.is_online ? 'Online' : 'Offline'}</p>
                            {schedule.is_online && schedule.meeting_link && (
                              <div className="mt-3">
                                <a 
                                  href={schedule.meeting_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-block"
                                >
                                  Join Online Class
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">How to Join Online Classes</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Click on "Join Online Class" button at the scheduled time</li>
              <li>• Make sure you have a stable internet connection</li>
              <li>• Keep your notebook and pen ready for taking notes</li>
              <li>• Participate actively in discussions and ask doubts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course_interested: 'SSC',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        course_interested: 'SSC',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
    
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch to start your government exam preparation journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Register Your Interest</h2>
              
              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your interest! We will contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Interested In *</label>
                  <select
                    name="course_interested"
                    value={formData.course_interested}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="SSC">SSC</option>
                    <option value="UPSC">UPSC</option>
                    <option value="Banking">Banking</option>
                    <option value="Railway">Railway</option>
                    <option value="State PSC">State PSC</option>
                    <option value="Defence">Defence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific questions or requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📞</span>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📧</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@bipulcompetitive.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📍</span>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">Demo Address, Demo City, PIN - 123456</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://wa.me/9876543210?text=Hi%20Bipul%20Sir%2C%20I%20want%20to%20join%20your%20coaching%20classes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
                    >
                      <span className="mr-2">💬</span>
                      WhatsApp Us Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Class Timings</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Morning Batch:</strong> 6:00 AM - 8:00 AM</p>
                  <p><strong>Evening Batch:</strong> 6:00 PM - 8:00 PM</p>
                  <p><strong>Weekend Classes:</strong> 9:00 AM - 12:00 PM</p>
                  <p className="text-sm text-gray-500 mt-4">
                    * Timings may vary based on course and batch selection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Admin Page Component
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: 'admin', password: '' });
  const [activeTab, setActiveTab] = useState('pdfs');
  const [pdfs, setPdfs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [schedules, setSchedules] = useState([]);

  // PDF Upload Form
  const [pdfForm, setPdfForm] = useState({
    title: '',
    exam_type: 'SSC',
    subject: '',
    batch: '',
    description: '',
    file: null
  });

  // Schedule Form
  const [scheduleForm, setScheduleForm] = useState({
    exam_type: 'SSC',
    subject: '',
    day_of_week: 'Monday',
    time: '',
    is_online: true,
    meeting_link: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (credentials.password === 'admin123') {
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      alert('Invalid password');
    }
  };

  const fetchAdminData = async () => {
    try {
      // Create basic auth header
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      const headers = { 'Authorization': `Basic ${auth}` };

      const [pdfsRes, contactsRes, schedulesRes] = await Promise.all([
        axios.get(`${API}/pdfs`),
        axios.get(`${API}/admin/contacts`, { headers }),
        axios.get(`${API}/schedule`)
      ]);

      setPdfs(pdfsRes.data);
      setContacts(contactsRes.data);
      setSchedules(schedulesRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', pdfForm.file);
    formData.append('title', pdfForm.title);
    formData.append('exam_type', pdfForm.exam_type);
    formData.append('subject', pdfForm.subject);
    formData.append('batch', pdfForm.batch);
    formData.append('description', pdfForm.description);

    try {
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      await axios.post(`${API}/admin/pdfs`, formData, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('PDF uploaded successfully!');
      setPdfForm({
        title: '',
        exam_type: 'SSC',
        subject: '',
        batch: '',
        description: '',
        file: null
      });
      fetchAdminData();
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF');
    }
  };

  const handleScheduleCreate = async (e) => {
    e.preventDefault();
    try {
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      await axios.post(`${API}/admin/schedule`, scheduleForm, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      
      alert('Schedule created successfully!');
      setScheduleForm({
        exam_type: 'SSC',
        subject: '',
        day_of_week: 'Monday',
        time: '',
        is_online: true,
        meeting_link: ''
      });
      fetchAdminData();
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Error creating schedule');
    }
  };

  const deletePdf = async (pdfId) => {
    if (!confirm('Are you sure you want to delete this PDF?')) return;
    
    try {
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      await axios.delete(`${API}/admin/pdfs/${pdfId}`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      alert('PDF deleted successfully!');
      fetchAdminData();
    } catch (error) {
      console.error('Error deleting PDF:', error);
      alert('Error deleting PDF');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Demo Password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Panel</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('pdfs')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pdfs'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Manage PDFs
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'schedule'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Class Schedule
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'contacts'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Contact Messages
                </button>
              </nav>
            </div>
          </div>

          {/* PDF Management Tab */}
          {activeTab === 'pdfs' && (
            <div className="space-y-8">
              {/* Upload Form */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Upload New PDF</h2>
                <form onSubmit={handlePdfUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={pdfForm.title}
                      onChange={(e) => setPdfForm({...pdfForm, title: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                    <select
                      value={pdfForm.exam_type}
                      onChange={(e) => setPdfForm({...pdfForm, exam_type: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="SSC">SSC</option>
                      <option value="UPSC">UPSC</option>
                      <option value="Banking">Banking</option>
                      <option value="Railway">Railway</option>
                      <option value="State PSC">State PSC</option>
                      <option value="Defence">Defence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      value={pdfForm.subject}
                      onChange={(e) => setPdfForm({...pdfForm, subject: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch *</label>
                    <input
                      type="text"
                      value={pdfForm.batch}
                      onChange={(e) => setPdfForm({...pdfForm, batch: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={pdfForm.description}
                      onChange={(e) => setPdfForm({...pdfForm, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">PDF File *</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfForm({...pdfForm, file: e.target.files[0]})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      Upload PDF
                    </button>
                  </div>
                </form>
              </div>

              {/* PDF List */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Uploaded PDFs ({pdfs.length})</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Exam</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Batch</th>
                        <th className="px-4 py-2 text-left">Upload Date</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pdfs.map((pdf) => (
                        <tr key={pdf.id} className="border-b">
                          <td className="px-4 py-2">{pdf.title}</td>
                          <td className="px-4 py-2">{pdf.exam_type}</td>
                          <td className="px-4 py-2">{pdf.subject}</td>
                          <td className="px-4 py-2">{pdf.batch}</td>
                          <td className="px-4 py-2">{new Date(pdf.upload_date).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deletePdf(pdf.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Management Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              {/* Schedule Form */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Add Class Schedule</h2>
                <form onSubmit={handleScheduleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                    <select
                      value={scheduleForm.exam_type}
                      onChange={(e) => setScheduleForm({...scheduleForm, exam_type: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="SSC">SSC</option>
                      <option value="UPSC">UPSC</option>
                      <option value="Banking">Banking</option>
                      <option value="Railway">Railway</option>
                      <option value="State PSC">State PSC</option>
                      <option value="Defence">Defence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      value={scheduleForm.subject}
                      onChange={(e) => setScheduleForm({...scheduleForm, subject: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Day *</label>
                    <select
                      value={scheduleForm.day_of_week}
                      onChange={(e) => setScheduleForm({...scheduleForm, day_of_week: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                      type="text"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                      placeholder="e.g., 6:00 PM - 8:00 PM"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Mode *</label>
                    <select
                      value={scheduleForm.is_online}
                      onChange={(e) => setScheduleForm({...scheduleForm, is_online: e.target.value === 'true'})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="true">Online</option>
                      <option value="false">Offline</option>
                    </select>
                  </div>
                  {scheduleForm.is_online && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                      <input
                        type="url"
                        value={scheduleForm.meeting_link}
                        onChange={(e) => setScheduleForm({...scheduleForm, meeting_link: e.target.value})}
                        placeholder="Zoom/Meet link"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      Add Schedule
                    </button>
                  </div>
                </form>
              </div>

              {/* Schedule List */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Current Schedules ({schedules.length})</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Exam</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Day</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Mode</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.map((schedule) => (
                        <tr key={schedule.id} className="border-b">
                          <td className="px-4 py-2">{schedule.exam_type}</td>
                          <td className="px-4 py-2">{schedule.subject}</td>
                          <td className="px-4 py-2">{schedule.day_of_week}</td>
                          <td className="px-4 py-2">{schedule.time}</td>
                          <td className="px-4 py-2">{schedule.is_online ? 'Online' : 'Offline'}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={async () => {
                                if (confirm('Delete this schedule?')) {
                                  try {
                                    const auth = btoa(`${credentials.username}:${credentials.password}`);
                                    await axios.delete(`${API}/admin/schedule/${schedule.id}`, {
                                      headers: { 'Authorization': `Basic ${auth}` }
                                    });
                                    fetchAdminData();
                                  } catch (error) {
                                    alert('Error deleting schedule');
                                  }
                                }
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contact Messages Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Contact Messages ({contacts.length})</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                      </div>
                      <div>
                        <p><strong>Course:</strong> {contact.course_interested}</p>
                        <p><strong>Date:</strong> {new Date(contact.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {contact.message && (
                      <div className="mt-4">
                        <p><strong>Message:</strong></p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded">{contact.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;