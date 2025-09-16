import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black text-black tracking-tight">
              BIPUL
            </Link>
            <div className="ml-3 text-xs text-gray-500 hidden sm:block border-l border-gray-300 pl-3 uppercase tracking-wide">
              Competitive Coaching
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">About</Link>
            <Link to="/courses" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">Courses</Link>
            <Link to="/notes" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">Materials</Link>
            <Link to="/schedule" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">Classes</Link>
            <Link to="/contact" className="text-gray-800 hover:text-black font-medium transition-colors duration-200 py-2 text-sm uppercase tracking-wide">Contact</Link>
            <Link to="/admin" className="bg-black text-white px-4 py-2 rounded-none hover:bg-gray-800 transition-colors duration-200 font-medium text-sm uppercase tracking-wide border border-black">Admin</Link>
          </nav>

          <button 
            className="lg:hidden text-gray-800 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-4">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">Home</Link>
              <Link to="/about" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">About</Link>
              <Link to="/courses" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">Courses</Link>
              <Link to="/notes" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">Materials</Link>
              <Link to="/schedule" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">Classes</Link>
              <Link to="/contact" className="text-gray-800 hover:text-black font-medium py-2 px-2 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">Contact</Link>
              <Link to="/admin" className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors font-medium text-center text-sm uppercase tracking-wide">Admin</Link>
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
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black mb-4 tracking-tight">BIPUL COMPETITIVE</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Excellence in government examination preparation through structured coaching and comprehensive study materials.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/9876543210" className="bg-white text-black hover:bg-gray-200 px-6 py-3 transition-colors duration-200 font-medium inline-flex items-center text-sm uppercase tracking-wide">
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/courses" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Courses</Link></li>
              <li><Link to="/notes" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Materials</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Classes</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center text-sm"><span className="mr-3">📞</span> +91 98765 43210</li>
              <li className="flex items-center text-sm"><span className="mr-3">📧</span> info@bipulcompetitive.com</li>
              <li className="flex items-center text-sm"><span className="mr-3">📍</span> Demo Address, City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="text-sm uppercase tracking-wide">&copy; 2024 Bipul Competitive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20 lg:py-32 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-8 leading-tight tracking-tight">
                MASTER
                <span className="block">GOVERNMENT</span>
                <span className="block text-gray-600">EXAMS</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional coaching for SSC, UPSC, Banking, Railway & State PSC examinations with proven methodologies and comprehensive preparation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 text-lg transition-all duration-200 border border-black uppercase tracking-wide"
                >
                  Join Classes
                </button>
                <button 
                  onClick={() => navigate('/notes')}
                  className="border-2 border-black text-black hover:bg-black hover:text-white font-bold py-4 px-8 text-lg transition-all duration-200 uppercase tracking-wide"
                >
                  Study Materials
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1574130303188-31a915382726?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBlZHVjYXRpb258ZW58MHx8fGJsdWV8MTc1ODAzMzUyNXww&ixlib=rb-4.1.0&q=85" 
                alt="Professional education setting" 
                className="w-full h-96 object-cover filter grayscale border border-gray-300"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 border border-gray-300 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-black text-white p-2 w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-black text-sm uppercase tracking-wide">500+ Success Stories</p>
                    <p className="text-gray-600 text-xs uppercase tracking-wide">Government Placements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight uppercase">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Excellence through structured preparation and proven methodologies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-300 p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-black text-white w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                01
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wide">Expert Teaching</h3>
              <p className="text-gray-700 leading-relaxed">Real-time interaction with experienced faculty. Personal attention and instant doubt resolution in every session.</p>
            </div>
            
            <div className="bg-white border border-gray-300 p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-black text-white w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                02
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wide">Study Materials</h3>
              <p className="text-gray-700 leading-relaxed">Comprehensive PDF study materials covering all subjects and exam patterns with regular updates.</p>
            </div>
            
            <div className="bg-white border border-gray-300 p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-black text-white w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                03
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wide">Proven Results</h3>
              <p className="text-gray-700 leading-relaxed">Consistent success rate with 500+ students placed in various government positions across sectors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1591700180499-a5a29621ee5b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkeXxlbnwwfHx8Ymx1ZXwxNzU4MDMzNTMzfDA&ixlib=rb-4.1.0&q=85" 
                alt="Professional study environment" 
                className="w-full h-96 object-cover filter grayscale border border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6 tracking-tight uppercase">
                Your Success Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Structured approach, experienced faculty, and comprehensive study materials create the perfect environment for government exam success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-black text-white p-2 w-6 h-6 flex items-center justify-center mr-4 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-gray-700 font-medium text-sm uppercase tracking-wide">Personalized Learning</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-black text-white p-2 w-6 h-6 flex items-center justify-center mr-4 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-gray-700 font-medium text-sm uppercase tracking-wide">Progress Assessments</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-black text-white p-2 w-6 h-6 flex items-center justify-center mr-4 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-gray-700 font-medium text-sm uppercase tracking-wide">Updated Curriculum</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-black text-white p-2 w-6 h-6 flex items-center justify-center mr-4 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-gray-700 font-medium text-sm uppercase tracking-wide">Continuous Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Success Stories</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">6+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Exam Categories</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">95%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Support Available</div>
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
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">About Bipul Competitive</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Excellence in government examination preparation through structured coaching</p>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-8 lg:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Our Founder</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Bipul Sir brings extensive expertise in government exam preparation, having mentored thousands of successful candidates. His dedication to teaching and comprehensive understanding of competitive exam patterns has guided students toward their government service aspirations.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  With proven results and innovative teaching methodologies, every student receives personalized attention throughout their preparation journey.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-200 border border-gray-400 w-48 h-48 flex items-center justify-center mx-auto mb-6">
                  <span className="text-6xl filter grayscale">👨‍🏫</span>
                </div>
                <h3 className="text-2xl font-black text-black uppercase tracking-wide">Bipul Sir</h3>
                <p className="text-gray-600 font-medium text-sm uppercase tracking-wide">Founder & Chief Instructor</p>
                <p className="text-gray-600 mt-2 text-sm">M.A., B.Ed. | 15+ Years Experience</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-8 lg:p-12">
            <h2 className="text-3xl font-black text-black mb-12 text-center uppercase tracking-tight">Mission & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-300 p-8">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  01
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Quality Education</h3>
                <p className="text-gray-700 leading-relaxed">Comprehensive and updated study materials with the latest exam patterns for all major government examinations.</p>
              </div>
              <div className="bg-white border border-gray-300 p-8">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  02
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Interactive Teaching</h3>
                <p className="text-gray-700 leading-relaxed">Real-time interaction and personalized guidance through live classes with immediate doubt resolution.</p>
              </div>
              <div className="bg-white border border-gray-300 p-8">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  03
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Student Success</h3>
                <p className="text-gray-700 leading-relaxed">Dedicated to helping every student achieve their government job aspirations through consistent support.</p>
              </div>
              <div className="bg-white border border-gray-300 p-8">
                <div className="bg-black text-white w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  04
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Continuous Support</h3>
                <p className="text-gray-700 leading-relaxed">Ongoing mentorship throughout the preparation journey with regular assessments and feedback.</p>
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
    { 
      name: "SSC", 
      number: "01",
      description: "Staff Selection Commission exams including CGL, CHSL, MTS, and other central government positions", 
      subjects: ["General Knowledge", "Quantitative Aptitude", "English Language", "General Reasoning"]
    },
    { 
      name: "UPSC", 
      number: "02",
      description: "Union Public Service Commission - Civil Services Examination for IAS, IPS, IFS positions", 
      subjects: ["History & Culture", "Geography", "Polity & Governance", "Economy", "Current Affairs"]
    },
    { 
      name: "Banking", 
      number: "03",
      description: "Bank PO, Clerk, and Specialist Officer positions in public and private sector banks", 
      subjects: ["Banking Awareness", "Computer Knowledge", "English Language", "Quantitative Aptitude"]
    },
    { 
      name: "Railway", 
      number: "04",
      description: "Railway Recruitment Board examinations for various technical and non-technical positions", 
      subjects: ["General Awareness", "Mathematics", "General Intelligence", "General Science"]
    },
    { 
      name: "State PSC", 
      number: "05",
      description: "State Public Service Commission examinations for state government administrative positions", 
      subjects: ["State General Knowledge", "Indian Polity", "History & Geography", "Current Affairs"]
    },
    { 
      name: "Defence", 
      number: "06",
      description: "NDA, CDS, and other defence examinations for officer positions in Armed Forces", 
      subjects: ["Mathematics", "General Ability Test", "English", "Current Affairs"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 border-b border-gray-200 pb-16">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">Our Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Professional coaching programs for all major government examinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 border border-gray-300 p-8 hover:shadow-lg transition-all duration-300 hover:bg-white">
                <div className="text-center mb-6">
                  <div className="bg-black text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-black">
                    {course.number}
                  </div>
                  <h3 className="text-2xl font-black text-black uppercase tracking-wide">{course.name}</h3>
                </div>
                <p className="text-gray-700 mb-6 text-center leading-relaxed text-sm">{course.description}</p>
                <div className="space-y-4">
                  <h4 className="font-bold text-black text-center text-sm uppercase tracking-wide">Key Subjects:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {course.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-white border border-gray-400 text-gray-800 px-3 py-2 text-xs font-medium uppercase tracking-wide">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button className="bg-white border-2 border-black text-black hover:bg-black hover:text-white font-bold py-3 px-6 transition-colors duration-200 text-sm uppercase tracking-wide">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 border border-gray-300 p-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-black text-black mb-6 uppercase tracking-tight">Ready to Begin?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of successful candidates who achieved their government job aspirations with our expert guidance.</p>
              <Link to="/contact" className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 text-lg transition-all duration-200 uppercase tracking-wide">
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 uppercase tracking-wide">Loading materials...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 border-b border-gray-200 pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">Study Materials</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive PDF notes organized by exam type and subjects</p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 border border-gray-300 p-8 mb-12">
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <div className="min-w-[200px]">
                <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Filter by Exam:</label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
                >
                  {examTypes.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[200px]">
                <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Group by:</label>
                <select 
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
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
              <div className="bg-gray-50 border border-gray-300 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6 filter grayscale">📚</div>
                <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-wide">No Materials Yet</h2>
                <p className="text-gray-600 mb-6">Study materials will be uploaded by the admin soon. Check back later for comprehensive resources.</p>
                <Link to="/contact" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 transition-colors duration-200 text-sm uppercase tracking-wide">
                  Contact for Updates
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedPdfs).map(([groupKey, groupPdfs]) => (
                <div key={groupKey} className="bg-gray-50 border border-gray-300 p-8 lg:p-12">
                  <h2 className="text-3xl font-black text-black mb-8 capitalize text-center uppercase tracking-wide">
                    {groupKey.replace('_', ' ')} ({groupPdfs.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupPdfs.map((pdf) => (
                      <div key={pdf.id} className="bg-white border border-gray-400 p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div className="bg-gray-200 border border-gray-400 p-3 mr-4">
                            <span className="text-black text-xl filter grayscale">📄</span>
                          </div>
                          <h3 className="font-black text-black text-lg leading-tight uppercase tracking-wide">{pdf.title}</h3>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2 mb-6">
                          <div className="flex justify-between">
                            <span className="font-bold uppercase tracking-wide">Exam:</span>
                            <span className="bg-gray-200 text-black px-2 py-1 text-xs border border-gray-400 uppercase tracking-wide">{pdf.exam_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold uppercase tracking-wide">Subject:</span>
                            <span className="text-xs uppercase tracking-wide">{pdf.subject}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold uppercase tracking-wide">Batch:</span>
                            <span className="text-xs uppercase tracking-wide">{pdf.batch}</span>
                          </div>
                          {pdf.description && (
                            <div className="mt-3">
                              <span className="font-bold block mb-1 uppercase tracking-wide">Description:</span>
                              <p className="text-gray-700 text-sm bg-gray-100 p-2 border border-gray-300">{pdf.description}</p>
                            </div>
                          )}
                          <div className="flex justify-between text-xs text-gray-500 mt-3 uppercase tracking-wide">
                            <span>Uploaded: {new Date(pdf.upload_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadPDF(pdf.id, pdf.filename)}
                          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition-colors duration-200 flex items-center justify-center text-sm uppercase tracking-wide"
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 uppercase tracking-wide">Loading schedules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 border-b border-gray-200 pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">Live Classes</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Interactive live classes for personalized learning and real-time guidance</p>
          </div>

          {schedules.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-300 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6 filter grayscale">📅</div>
                <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-wide">No Classes Scheduled</h2>
                <p className="text-gray-600 mb-6">Class schedules will be updated by the admin soon. Stay tuned for upcoming batches.</p>
                <Link to="/contact" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 transition-colors duration-200 text-sm uppercase tracking-wide">
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
                  <div key={day} className="bg-gray-50 border border-gray-300 p-8 lg:p-12">
                    <h2 className="text-3xl font-black text-black mb-8 text-center uppercase tracking-wide">{day}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {daySchedules.map((schedule) => (
                        <div key={schedule.id} className="bg-white border border-gray-400 p-6 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center mb-4">
                            <div className="bg-gray-200 border border-gray-400 p-3 mr-4">
                              <span className="text-2xl filter grayscale">{schedule.is_online ? '💻' : '🏫'}</span>
                            </div>
                            <h3 className="font-black text-black text-lg uppercase tracking-wide">{schedule.exam_type}</h3>
                          </div>
                          <div className="text-sm text-gray-700 space-y-3">
                            <div className="flex justify-between">
                              <span className="font-bold uppercase tracking-wide">Subject:</span>
                              <span className="text-xs uppercase tracking-wide">{schedule.subject}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-bold uppercase tracking-wide">Time:</span>
                              <span className="font-black text-black text-xs uppercase tracking-wide">{schedule.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-bold uppercase tracking-wide">Mode:</span>
                              <span className={`px-2 py-1 text-xs font-bold border uppercase tracking-wide ${schedule.is_online ? 'bg-gray-200 text-black border-gray-400' : 'bg-gray-300 text-black border-gray-500'}`}>
                                {schedule.is_online ? 'Online' : 'Offline'}
                              </span>
                            </div>
                            {schedule.is_online && schedule.meeting_link && (
                              <div className="mt-4 pt-4 border-t border-gray-300">
                                <a 
                                  href={schedule.meeting_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 transition-colors duration-200 inline-flex items-center text-sm uppercase tracking-wide"
                                >
                                  Join Class
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

          <div className="mt-16 bg-gray-900 p-8 lg:p-12 text-white">
            <h3 className="text-2xl font-black mb-6 text-center uppercase tracking-wide">How to Join Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white text-black w-12 h-12 flex items-center justify-center mx-auto mb-3 font-black text-xl">
                  01
                </div>
                <p className="font-bold uppercase tracking-wide">Join on Time</p>
                <p className="text-gray-300 text-sm mt-1 uppercase tracking-wide">Click link at scheduled time</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-12 h-12 flex items-center justify-center mx-auto mb-3 font-black text-xl">
                  02
                </div>
                <p className="font-bold uppercase tracking-wide">Stable Internet</p>
                <p className="text-gray-300 text-sm mt-1 uppercase tracking-wide">Ensure good connection</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-12 h-12 flex items-center justify-center mx-auto mb-3 font-black text-xl">
                  03
                </div>
                <p className="font-bold uppercase tracking-wide">Take Notes</p>
                <p className="text-gray-300 text-sm mt-1 uppercase tracking-wide">Keep notebook ready</p>
              </div>
              <div className="text-center">
                <div className="bg-white text-black w-12 h-12 flex items-center justify-center mx-auto mb-3 font-black text-xl">
                  04
                </div>
                <p className="font-bold uppercase tracking-wide">Ask Questions</p>
                <p className="text-gray-300 text-sm mt-1 uppercase tracking-wide">Participate actively</p>
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
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 border-b border-gray-200 pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight uppercase">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ready to start your government exam preparation journey? Connect with us today.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-300 p-8 lg:p-12">
              <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-wide">Register Interest</h2>
              
              {submitted && (
                <div className="bg-white border-2 border-black text-black px-6 py-4 mb-8 flex items-center">
                  <span className="text-black text-xl mr-3 font-black">✓</span>
                  <div>
                    <p className="font-bold uppercase tracking-wide">Thank you for your interest!</p>
                    <p className="text-sm uppercase tracking-wide">We will contact you soon to discuss your preparation journey.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
                    placeholder="ENTER YOUR FULL NAME"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
                    placeholder="ENTER YOUR PHONE NUMBER"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Course Interested *</label>
                  <select
                    name="course_interested"
                    value={formData.course_interested}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
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
                  <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm uppercase tracking-wide"
                    placeholder="ANY SPECIFIC QUESTIONS OR REQUIREMENTS..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
                >
                  {submitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 border border-gray-300 p-8 lg:p-12">
                <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-wide">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-white border border-gray-400">
                    <div className="bg-black text-white p-3 mr-4 w-12 h-12 flex items-center justify-center font-black text-xl">
                      01
                    </div>
                    <div>
                      <p className="font-bold text-black uppercase tracking-wide">Phone</p>
                      <p className="text-gray-600 text-lg">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white border border-gray-400">
                    <div className="bg-black text-white p-3 mr-4 w-12 h-12 flex items-center justify-center font-black text-xl">
                      02
                    </div>
                    <div>
                      <p className="font-bold text-black uppercase tracking-wide">Email</p>
                      <p className="text-gray-600 text-lg">info@bipulcompetitive.com</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white border border-gray-400">
                    <div className="bg-black text-white p-3 mr-4 w-12 h-12 flex items-center justify-center font-black text-xl">
                      03
                    </div>
                    <div>
                      <p className="font-bold text-black uppercase tracking-wide">Address</p>
                      <p className="text-gray-600 text-lg">Demo Address, Demo City, PIN - 123456</p>
                    </div>
                  </div>

                  <div className="pt-6 text-center">
                    <a 
                      href="https://wa.me/9876543210?text=Hi%20Bipul%20Sir%2C%20I%20want%20to%20join%20your%20coaching%20classes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 transition-colors duration-200 inline-flex items-center text-lg shadow-lg hover:shadow-xl uppercase tracking-wide"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 border border-gray-400 p-8">
                <h3 className="text-2xl font-black text-black mb-6 text-center uppercase tracking-wide">Class Timings</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-400">
                    <span className="font-bold uppercase tracking-wide">Morning:</span>
                    <span className="text-black font-black uppercase tracking-wide">6:00 AM - 8:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-400">
                    <span className="font-bold uppercase tracking-wide">Evening:</span>
                    <span className="text-black font-black uppercase tracking-wide">6:00 PM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white border border-gray-400">
                    <span className="font-bold uppercase tracking-wide">Weekend:</span>
                    <span className="text-black font-black uppercase tracking-wide">9:00 AM - 12:00 PM</span>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4 uppercase tracking-wide">
                    * Timings may vary based on course selection
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

// Admin Page Component
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
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Dashboard!",
        duration: 3000,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const fetchAdminData = async () => {
    try {
      const auth = btoa(`${credentials.username}:admin123`);
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
      toast({
        title: "Error Loading Data",
        description: "Unable to fetch admin data. Please refresh the page.",
        variant: "destructive",
        duration: 5000,
      });
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
      const auth = btoa(`${credentials.username}:admin123`);
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
      const auth = btoa(`${credentials.username}:admin123`);
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
      const auth = btoa(`${credentials.username}:admin123`);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-gray-50 border-2 border-black p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-black text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
              A
            </div>
            <h1 className="text-3xl font-black text-black uppercase tracking-wide">Admin Login</h1>
            <p className="text-gray-600 mt-2 uppercase tracking-wide">Access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white uppercase tracking-wide"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition-colors duration-200 uppercase tracking-wide"
            >
              Login to Dashboard
            </button>
          </form>
          <div className="mt-6 p-4 bg-gray-200 border border-gray-400">
            <p className="text-sm text-black text-center uppercase tracking-wide font-bold">
              Demo Credentials:<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-4xl font-black text-black mb-4 uppercase tracking-wide">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6 uppercase tracking-wide">Manage coaching center content and settings</p>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-800 hover:bg-black text-white px-6 py-2 transition-colors duration-200 font-bold uppercase tracking-wide"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="bg-gray-50 border border-gray-300 p-2">
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('pdfs')}
                  className={`flex-1 py-3 px-4 font-bold text-sm transition-colors duration-200 uppercase tracking-wide ${
                    activeTab === 'pdfs'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-white'
                  }`}
                >
                  Manage PDFs ({pdfs.length})
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`flex-1 py-3 px-4 font-bold text-sm transition-colors duration-200 uppercase tracking-wide ${
                    activeTab === 'schedule'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-white'
                  }`}
                >
                  Class Schedule ({schedules.length})
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex-1 py-3 px-4 font-bold text-sm transition-colors duration-200 uppercase tracking-wide ${
                    activeTab === 'contacts'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-white'
                  }`}
                >
                  Contact Messages ({contacts.length})
                </button>
              </nav>
            </div>
          </div>

          {/* PDF Management Tab */}
          {activeTab === 'pdfs' && (
            <div className="space-y-8">
              {/* Upload Form */}
              <div className="bg-gray-50 border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wide">Upload New PDF</h2>
                <form onSubmit={handlePdfUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Title *</label>
                    <input
                      type="text"
                      value={pdfForm.title}
                      onChange={(e) => setPdfForm({...pdfForm, title: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      placeholder="e.g., Mathematics Chapter 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Exam Type *</label>
                    <select
                      value={pdfForm.exam_type}
                      onChange={(e) => setPdfForm({...pdfForm, exam_type: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
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
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Subject *</label>
                    <input
                      type="text"
                      value={pdfForm.subject}
                      onChange={(e) => setPdfForm({...pdfForm, subject: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Batch *</label>
                    <input
                      type="text"
                      value={pdfForm.batch}
                      onChange={(e) => setPdfForm({...pdfForm, batch: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      placeholder="e.g., Morning Batch 2024"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Description</label>
                    <textarea
                      value={pdfForm.description}
                      onChange={(e) => setPdfForm({...pdfForm, description: e.target.value})}
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      rows="3"
                      placeholder="Optional description..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">PDF File *</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfForm({...pdfForm, file: e.target.files[0]})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 transition-colors duration-200 uppercase tracking-wide"
                    >
                      Upload PDF
                    </button>
                  </div>
                </form>
              </div>

              {/* PDF List */}
              <div className="bg-gray-50 border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wide">Uploaded PDFs</h2>
                {pdfs.length === 0 ? (
                  <p className="text-gray-600 text-center py-8 uppercase tracking-wide">No PDFs uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pdfs.map((pdf) => (
                      <div key={pdf.id} className="bg-white border border-gray-400 p-4">
                        <h3 className="font-black text-black mb-2 text-sm uppercase tracking-wide">{pdf.title}</h3>
                        <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">{pdf.exam_type} - {pdf.subject}</p>
                        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">Batch: {pdf.batch}</p>
                        <button
                          onClick={() => deletePdf(pdf.id)}
                          className="bg-gray-800 hover:bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wide"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Management Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              {/* Schedule Form */}
              <div className="bg-gray-50 border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wide">Create Schedule</h2>
                <form onSubmit={handleScheduleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Exam Type *</label>
                    <select
                      value={scheduleForm.exam_type}
                      onChange={(e) => setScheduleForm({...scheduleForm, exam_type: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
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
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Subject *</label>
                    <input
                      type="text"
                      value={scheduleForm.subject}
                      onChange={(e) => setScheduleForm({...scheduleForm, subject: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Day *</label>
                    <select
                      value={scheduleForm.day_of_week}
                      onChange={(e) => setScheduleForm({...scheduleForm, day_of_week: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
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
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Time *</label>
                    <input
                      type="text"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                      placeholder="e.g., 10:00 AM - 12:00 PM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Mode *</label>
                    <select
                      value={scheduleForm.is_online}
                      onChange={(e) => setScheduleForm({...scheduleForm, is_online: e.target.value === 'true'})}
                      required
                      className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                    >
                      <option value="true">Online</option>
                      <option value="false">Offline</option>
                    </select>
                  </div>
                  {scheduleForm.is_online && (
                    <div>
                      <label className="block text-sm font-bold text-black mb-3 uppercase tracking-wide">Meeting Link</label>
                      <input
                        type="url"
                        value={scheduleForm.meeting_link}
                        onChange={(e) => setScheduleForm({...scheduleForm, meeting_link: e.target.value})}
                        className="w-full border-2 border-gray-400 px-4 py-3 focus:border-black bg-white text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 transition-colors duration-200 uppercase tracking-wide"
                    >
                      Create Schedule
                    </button>
                  </div>
                </form>
              </div>

              {/* Schedule List */}
              <div className="bg-gray-50 border border-gray-300 p-8">
                <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wide">Current Schedule</h2>
                {schedules.length === 0 ? (
                  <p className="text-gray-600 text-center py-8 uppercase tracking-wide">No schedules created yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="bg-white border border-gray-400 p-4">
                        <h3 className="font-black text-black mb-2 text-sm uppercase tracking-wide">{schedule.exam_type}</h3>
                        <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">{schedule.subject}</p>
                        <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">{schedule.day_of_week} - {schedule.time}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{schedule.is_online ? 'Online' : 'Offline'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="bg-gray-50 border border-gray-300 p-8">
              <h2 className="text-2xl font-black mb-6 text-black uppercase tracking-wide">Contact Messages</h2>      
              {contacts.length === 0 ? (
                <p className="text-gray-600 text-center py-8 uppercase tracking-wide">No contact messages yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-white border border-gray-400 p-6">
                      <h3 className="font-black text-black mb-2 uppercase tracking-wide">{contact.name}</h3>
                      <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide">📞 {contact.phone}</p>
                      <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide">📧 {contact.email}</p>
                      <p className="text-sm text-gray-600 mb-1 uppercase tracking-wide">📚 {contact.course_interested}</p>
                      {contact.message && (
                        <div className="mt-3 p-3 bg-gray-100 border border-gray-300">
                          <p className="text-sm text-gray-700">{contact.message}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-3 uppercase tracking-wide">
                        {new Date(contact.timestamp).toLocaleString()}
                      </p>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App bg-white min-h-screen">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;