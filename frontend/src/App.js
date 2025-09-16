import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-gray-900 tracking-tight">
              Bipul <span className="text-blue-600">Competitive</span>
            </Link>
            <div className="ml-3 text-sm text-gray-600 hidden sm:block border-l border-gray-300 pl-3">
              Government Exam Coaching
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">About</Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Courses</Link>
            <Link to="/notes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Study Materials</Link>
            <Link to="/schedule" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Live Classes</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Contact</Link>
            <Link to="/admin" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">Admin</Link>
          </nav>

          <button 
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-4">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">About</Link>
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Courses</Link>
              <Link to="/notes" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Study Materials</Link>
              <Link to="/schedule" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Live Classes</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors">Contact</Link>
              <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium text-center">Admin</Link>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Bipul <span className="text-blue-400">Competitive</span></h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Empowering aspirants to succeed in government examinations through dedicated coaching and comprehensive study materials. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/9876543210" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full transition-colors duration-200 font-medium inline-flex items-center">
                <span className="mr-2">💬</span>
                WhatsApp Us
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/courses" className="hover:text-white transition-colors">Our Courses</Link></li>
              <li><Link to="/notes" className="hover:text-white transition-colors">Study Materials</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition-colors">Live Classes</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center"><span className="mr-3 text-blue-400">📞</span> +91 98765 43210</li>
              <li className="flex items-center"><span className="mr-3 text-blue-400">📧</span> info@bipulcompetitive.com</li>
              <li className="flex items-center"><span className="mr-3 text-blue-400">📍</span> Demo Address, City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
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
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Government
                <span className="text-blue-600 block">Exam Success</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Expert coaching for SSC, UPSC, Banking, Railway & State PSC exams with personalized guidance and proven results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Join Classes Today
                </button>
                <button 
                  onClick={() => navigate('/notes')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200"
                >
                  Access Study Materials
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1574130303188-31a915382726?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBlZHVjYXRpb258ZW58MHx8fGJsdWV8MTc1ODAzMzUyNXww&ixlib=rb-4.1.0&q=85" 
                alt="Professional education setting" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Success Stories</p>
                    <p className="text-gray-600 text-sm">Government Job Placements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bipul Competitive?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive preparation with expert guidance and proven methodologies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Expert Live Teaching</h3>
              <p className="text-gray-700 leading-relaxed">Real-time interaction with experienced faculty. Personal attention and instant doubt resolution in every session.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Comprehensive Materials</h3>
              <p className="text-gray-700 leading-relaxed">Well-organized PDF study materials covering all subjects and exam patterns with regular updates.</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Proven Track Record</h3>
              <p className="text-gray-700 leading-relaxed">Consistent success rate with 500+ students placed in various government positions across different sectors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1591700180499-a5a29621ee5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkeXxlbnwwfHx8Ymx1ZXwxNzU4MDMzNTMzfDA&ixlib=rb-4.1.0&q=85" 
                alt="Professional study environment" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Success Journey Starts Here
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Bipul Competitive, we believe every student has the potential to excel. Our structured approach, experienced faculty, and comprehensive study materials create the perfect environment for your government exam success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Personalized Learning Approach</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Regular Progress Assessments</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Updated Curriculum & Materials</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">Continuous Mentorship Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Success Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6+</div>
              <div className="text-blue-200">Exam Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Support Available</div>
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
      <div className="pt-16 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Bipul Competitive</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Dedicated to empowering government exam aspirants with expert guidance and comprehensive preparation</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Founder</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Bipul Sir brings years of expertise in government exam preparation, having mentored thousands of successful candidates. His passion for teaching and deep understanding of competitive exam patterns has helped students achieve their dreams of government service.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  With a proven track record and innovative teaching methodologies, Bipul Sir ensures that every student receives personalized attention and guidance throughout their preparation journey.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-6xl">👨‍🏫</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Bipul Sir</h3>
                <p className="text-blue-600 font-medium">Founder & Chief Instructor</p>
                <p className="text-gray-600 mt-2">M.A., B.Ed. | 15+ Years Experience</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Mission & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📖</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Education</h3>
                <p className="text-gray-700 leading-relaxed">Providing comprehensive and updated study materials with the latest exam patterns and trends for all major government examinations.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Interactive Teaching</h3>
                <p className="text-gray-700 leading-relaxed">Real-time interaction and personalized guidance through live online and offline classes with immediate doubt resolution.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl">
                <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Success</h3>
                <p className="text-gray-700 leading-relaxed">Dedicated to helping every student achieve their government job aspirations through consistent support and motivation.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Support</h3>
                <p className="text-gray-700 leading-relaxed">Ongoing mentorship and guidance throughout the preparation journey with regular assessments and feedback.</p>
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
    { name: "SSC", icon: "🏛️", description: "Staff Selection Commission exams including CGL, CHSL, MTS, and other central government positions", subjects: ["General Knowledge", "Quantitative Aptitude", "English Language", "General Reasoning"], color: "from-blue-50 to-blue-100", iconBg: "bg-blue-600" },
    { name: "UPSC", icon: "🎯", description: "Union Public Service Commission - Civil Services Examination for IAS, IPS, IFS positions", subjects: ["History & Culture", "Geography", "Polity & Governance", "Economy", "Current Affairs"], color: "from-red-50 to-red-100", iconBg: "bg-red-600" },
    { name: "Banking", icon: "🏦", description: "Bank PO, Clerk, and Specialist Officer positions in public and private sector banks", subjects: ["Banking Awareness", "Computer Knowledge", "English Language", "Quantitative Aptitude"], color: "from-green-50 to-green-100", iconBg: "bg-green-600" },
    { name: "Railway", icon: "🚂", description: "Railway Recruitment Board examinations for various technical and non-technical positions", subjects: ["General Awareness", "Mathematics", "General Intelligence", "General Science"], color: "from-yellow-50 to-yellow-100", iconBg: "bg-yellow-600" },
    { name: "State PSC", icon: "🏢", description: "State Public Service Commission examinations for state government administrative positions", subjects: ["State General Knowledge", "Indian Polity", "History & Geography", "Current Affairs"], color: "from-purple-50 to-purple-100", iconBg: "bg-purple-600" },
    { name: "Defence", icon: "🛡️", description: "NDA, CDS, and other defence examinations for officer positions in Armed Forces", subjects: ["Mathematics", "General Ability Test", "English", "Current Affairs"], color: "from-indigo-50 to-indigo-100", iconBg: "bg-indigo-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Comprehensive Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Expert coaching programs designed for all major government examinations with proven success methodology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className={`bg-gradient-to-br ${course.color} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}>
                <div className="text-center mb-6">
                  <div className={`${course.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-white text-2xl">{course.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
                </div>
                <p className="text-gray-700 mb-6 text-center leading-relaxed">{course.description}</p>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-center">Key Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {course.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-white/60 text-gray-800 px-3 py-2 rounded-full text-sm font-medium border border-gray-200">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of successful candidates who achieved their government job dreams with our expert guidance and comprehensive preparation.</p>
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notes/Study Materials Page Component
const Notes = () => {
  const { toast } = useToast();
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
      toast({
        title: "Error Loading Study Materials",
        description: "Unable to load PDFs. Please refresh the page.",
        variant: "destructive",
        duration: 5000,
      });
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
      toast({
        title: "Download Started",
        description: `Downloading ${filename}...`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading study materials...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Study Materials</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Access comprehensive PDF notes organized by exam type and subjects for effective preparation</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <div className="min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Exam Type:</label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                >
                  {examTypes.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[200px]">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Group by:</label>
                <select 
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Study Materials Yet</h2>
                <p className="text-gray-600 mb-6">Study materials will be uploaded by the admin soon. Check back later for comprehensive notes and resources.</p>
                <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200">
                  Contact for Updates
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedPdfs).map(([groupKey, groupPdfs]) => (
                <div key={groupKey} className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize text-center">
                    {groupKey.replace('_', ' ')} ({groupPdfs.length} Materials)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupPdfs.map((pdf) => (
                      <div key={pdf.id} className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-red-100 p-3 rounded-full mr-4">
                            <span className="text-red-600 text-xl">📄</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{pdf.title}</h3>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2 mb-6">
                          <div className="flex justify-between">
                            <span className="font-medium">Exam:</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{pdf.exam_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Subject:</span>
                            <span>{pdf.subject}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Batch:</span>
                            <span>{pdf.batch}</span>
                          </div>
                          {pdf.description && (
                            <div className="mt-3">
                              <span className="font-medium block mb-1">Description:</span>
                              <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">{pdf.description}</p>
                            </div>
                          )}
                          <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <span>Uploaded: {new Date(pdf.upload_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadPDF(pdf.id, pdf.filename)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
                        >
                          <span className="mr-2">📥</span>
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading class schedules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Live Class Schedule</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join our interactive live classes for personalized learning and real-time doubt resolution</p>
          </div>

          {schedules.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">📅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Classes Scheduled Yet</h2>
                <p className="text-gray-600 mb-6">Class schedules will be updated by the admin soon. Stay tuned for upcoming batches and timings.</p>
                <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200">
                  Get Notified
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {daysOrder.map(day => {
                const daySchedules = groupedSchedules[day] || [];
                if (daySchedules.length === 0) return null;
                
                return (
                  <div key={day} className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{day}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {daySchedules.map((schedule) => (
                        <div key={schedule.id} className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className={`${schedule.is_online ? 'bg-green-100' : 'bg-orange-100'} p-3 rounded-full mr-4`}>
                              <span className="text-2xl">{schedule.is_online ? '💻' : '🏫'}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{schedule.exam_type}</h3>
                          </div>
                          <div className="text-sm text-gray-700 space-y-3">
                            <div className="flex justify-between">
                              <span className="font-medium">Subject:</span>
                              <span>{schedule.subject}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Time:</span>
                              <span className="font-semibold text-blue-600">{schedule.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Mode:</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${schedule.is_online ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                {schedule.is_online ? 'Online' : 'Offline'}
                              </span>
                            </div>
                            {schedule.is_online && schedule.meeting_link && (
                              <div className="mt-4 pt-4 border-t border-blue-200">
                                <a 
                                  href={schedule.meeting_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-colors duration-200 inline-flex items-center text-sm"
                                >
                                  <span className="mr-2">🎥</span>
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

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">How to Join Online Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⏰</span>
                </div>
                <p className="font-medium">Join on Time</p>
                <p className="text-blue-100 text-sm mt-1">Click the link at scheduled time</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌐</span>
                </div>
                <p className="font-medium">Stable Internet</p>
                <p className="text-blue-100 text-sm mt-1">Ensure good connection</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <p className="font-medium">Take Notes</p>
                <p className="text-blue-100 text-sm mt-1">Keep notebook ready</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🙋</span>
                </div>
                <p className="font-medium">Ask Questions</p>
                <p className="text-blue-100 text-sm mt-1">Participate actively</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const Contact = () => {
  const { toast } = useToast();
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
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. We'll contact you soon.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Submitting Form",
        description: "Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
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
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ready to start your government exam preparation journey? Get in touch with us today!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Register Your Interest</h2>
              
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-8 flex items-center">
                  <span className="text-green-600 text-xl mr-3">✓</span>
                  <div>
                    <p className="font-semibold">Thank you for your interest!</p>
                    <p className="text-sm">We will contact you soon to discuss your preparation journey.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Course Interested In *</label>
                  <select
                    name="course_interested"
                    value={formData.course_interested}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="SSC">SSC (Staff Selection Commission)</option>
                    <option value="UPSC">UPSC (Civil Services)</option>
                    <option value="Banking">Banking (PO/Clerk)</option>
                    <option value="Railway">Railway (RRB)</option>
                    <option value="State PSC">State PSC</option>
                    <option value="Defence">Defence (NDA/CDS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    placeholder="Any specific questions or requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                    <div className="bg-blue-600 p-3 rounded-full mr-4">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600 text-lg">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-green-50 rounded-xl">
                    <div className="bg-green-600 p-3 rounded-full mr-4">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600 text-lg">info@bipulcompetitive.com</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                    <div className="bg-purple-600 p-3 rounded-full mr-4">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600 text-lg">Demo Address, Demo City, PIN - 123456</p>
                    </div>
                  </div>

                  <div className="pt-6 text-center">
                    <a 
                      href="https://wa.me/9876543210?text=Hi%20Bipul%20Sir%2C%20I%20want%20to%20join%20your%20coaching%20classes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-colors duration-200 inline-flex items-center text-lg shadow-lg hover:shadow-xl"
                    >
                      <span className="mr-3 text-xl">💬</span>
                      WhatsApp Us Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Class Timings</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Morning Batch:</span>
                    <span className="text-orange-600 font-semibold">6:00 AM - 8:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Evening Batch:</span>
                    <span className="text-orange-600 font-semibold">6:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Weekend Classes:</span>
                    <span className="text-orange-600 font-semibold">9:00 AM - 12:00 PM</span>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4 italic">
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
  const { toast } = useToast();
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
      
      toast({
        title: "PDF Uploaded Successfully!",
        description: `${pdfForm.title} has been uploaded to the system.`,
        duration: 5000,
      });
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
      toast({
        title: "Upload Failed",
        description: "Unable to upload PDF. Please check file format and try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleScheduleCreate = async (e) => {
    e.preventDefault();
    try {
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      await axios.post(`${API}/admin/schedule`, scheduleForm, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      
      toast({
        title: "Schedule Created Successfully!",
        description: `${scheduleForm.subject} class scheduled for ${scheduleForm.day_of_week}`,
        duration: 5000,
      });
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
      toast({
        title: "Schedule Creation Failed",
        description: "Unable to create schedule. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
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
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Access the admin dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors duration-200"
            >
              Login to Dashboard
            </button>
          </form>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo Credentials:</strong><br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">Manage your coaching center content and settings</p>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('pdfs')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'pdfs'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  📚 Manage PDFs ({pdfs.length})
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'schedule'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  📅 Class Schedule ({schedules.length})
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors duration-200 ${
                    activeTab === 'contacts'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  📧 Contact Messages ({contacts.length})
                </button>
              </nav>
            </div>
          </div>

          {/* PDF Management Tab */}
          {activeTab === 'pdfs' && (
            <div className="space-y-8">
              {/* Upload Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">📤 Upload New PDF</h2>
                <form onSubmit={handlePdfUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Title *</label>
                    <input
                      type="text"
                      value={pdfForm.title}
                      onChange={(e) => setPdfForm({...pdfForm, title: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="e.g., Mathematics Chapter 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Exam Type *</label>
                    <select
                      value={pdfForm.exam_type}
                      onChange={(e) => setPdfForm({...pdfForm, exam_type: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Subject *</label>
                    <input
                      type="text"
                      value={pdfForm.subject}
                      onChange={(e) => setPdfForm({...pdfForm, subject: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Batch *</label>
                    <input
                      type="text"
                      value={pdfForm.batch}
                      onChange={(e) => setPdfForm({...pdfForm, batch: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="e.g., Morning Batch 2024"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                    <textarea
                      value={pdfForm.description}
                      onChange={(e) => setPdfForm({...pdfForm, description: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      rows="3"
                      placeholder="Brief description of the study material..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">PDF File *</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfForm({...pdfForm, file: e.target.files[0]})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200"
                    >
                      Upload PDF
                    </button>
                  </div>
                </form>
              </div>

              {/* PDF List */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">📚 Uploaded PDFs ({pdfs.length} total)</h2>
                {pdfs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📁</div>
                    <p className="text-gray-600">No PDFs uploaded yet. Upload your first study material above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-tl-xl">Title</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Exam</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subject</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Batch</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Upload Date</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-tr-xl">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pdfs.map((pdf) => (
                          <tr key={pdf.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{pdf.title}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{pdf.exam_type}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{pdf.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{pdf.batch}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{new Date(pdf.upload_date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => deletePdf(pdf.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Management Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              {/* Schedule Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">📅 Add Class Schedule</h2>
                <form onSubmit={handleScheduleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Exam Type *</label>
                    <select
                      value={scheduleForm.exam_type}
                      onChange={(e) => setScheduleForm({...scheduleForm, exam_type: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Subject *</label>
                    <input
                      type="text"
                      value={scheduleForm.subject}
                      onChange={(e) => setScheduleForm({...scheduleForm, subject: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Day *</label>
                    <select
                      value={scheduleForm.day_of_week}
                      onChange={(e) => setScheduleForm({...scheduleForm, day_of_week: e.target.value})}
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Time *</label>
                    <input
                      type="text"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                      placeholder="e.g., 6:00 PM - 8:00 PM"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Class Mode *</label>
                    <select
                      value={scheduleForm.is_online}
                      onChange={(e) => setScheduleForm({...scheduleForm, is_online: e.target.value === 'true'})}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    >
                      <option value="true">Online</option>
                      <option value="false">Offline</option>
                    </select>
                  </div>
                  {scheduleForm.is_online && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Meeting Link</label>
                      <input
                        type="url"
                        value={scheduleForm.meeting_link}
                        onChange={(e) => setScheduleForm({...scheduleForm, meeting_link: e.target.value})}
                        placeholder="Zoom/Meet link"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors duration-200"
                    >
                      Add Schedule
                    </button>
                  </div>
                </form>
              </div>

              {/* Schedule List */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">📅 Current Schedules ({schedules.length} total)</h2>
                {schedules.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📅</div>
                    <p className="text-gray-600">No schedules created yet. Add your first class schedule above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-tl-xl">Exam</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subject</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Day</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mode</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-tr-xl">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {schedules.map((schedule) => (
                          <tr key={schedule.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{schedule.exam_type}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{schedule.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{schedule.day_of_week}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">{schedule.time}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs ${schedule.is_online ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                {schedule.is_online ? 'Online' : 'Offline'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
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
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Messages Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📧 Contact Messages ({contacts.length} total)</h2>
              {contacts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📮</div>
                  <p className="text-gray-600">No contact messages yet. Messages from the contact form will appear here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-700">Name:</span>
                            <p className="text-gray-900 font-medium">{contact.name}</p>
                          </div>
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-700">Phone:</span>
                            <p className="text-gray-900">{contact.phone}</p>
                          </div>
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-700">Email:</span>
                            <p className="text-gray-900">{contact.email}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-700">Course Interested:</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm ml-2">{contact.course_interested}</span>
                          </div>
                          <div className="mb-3">
                            <span className="text-sm font-semibold text-gray-700">Date:</span>
                            <p className="text-gray-600">{new Date(contact.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      {contact.message && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <span className="text-sm font-semibold text-gray-700 block mb-2">Message:</span>
                          <div className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                            <p>{contact.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;