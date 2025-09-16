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
      setLo