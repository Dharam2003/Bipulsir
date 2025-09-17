import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import axios from "axios";

// Import new animated components
import AnimatedHeader from "./components/layout/AnimatedHeader";
import AnimatedFooter from "./components/layout/AnimatedFooter";
import HeroSection from "./components/sections/HeroSection";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Home Page Component - Updated with new Hero Section
const Home = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* New Animated Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Bipulsir</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of educational excellence with our innovative approach to government exam preparation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Advanced Learning System",
                  description: "AI-powered personalized learning paths tailored to your exam goals and learning pace.",
                  icon: "🚀",
                  color: "from-primary-500 to-primary-700"
                },
                {
                  title: "Expert Mentorship",
                  description: "Learn from top-ranked professionals with proven track records in government exams.",
                  icon: "🎯",
                  color: "from-accent-500 to-accent-700"
                },
                {
                  title: "Interactive Materials",
                  description: "Access comprehensive study materials with interactive quizzes and real-time progress tracking.",
                  icon: "📚",
                  color: "from-primary-600 to-accent-600"
                },
                {
                  title: "Live Classes",
                  description: "Attend live interactive sessions with doubt clearing and real-time Q&A support.",
                  icon: "🎓",
                  color: "from-accent-600 to-primary-600"
                },
                {
                  title: "Mock Tests",
                  description: "Practice with exam-pattern mock tests and detailed performance analytics.",
                  icon: "📊",
                  color: "from-primary-700 to-accent-500"
                },
                {
                  title: "Success Guarantee",
                  description: "98% success rate with money-back guarantee and continuous support until you succeed.",
                  icon: "🏆",
                  color: "from-accent-700 to-primary-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-900 to-dark-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful candidates who achieved their dreams with Bipulsir's innovative learning approach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  onClick={() => navigate('/courses')}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Courses
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

// About Page Component - Enhanced with animations
const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Bipulsir</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of government exam preparation through innovative technology and proven methodologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Bipulsir, we believe that every aspiring government servant deserves access to world-class education and mentorship. 
                Our mission is to democratize quality education and make government exam success achievable for all.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through cutting-edge technology, personalized learning experiences, and expert guidance, we're transforming 
                how students prepare for competitive examinations.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDB8fHxibHVlfDE3NTgwNDgyMjV8MA&ixlib=rb-4.1.0&q=85" 
                alt="Modern educational technology" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary-600 to-accent-600 p-6 rounded-2xl text-white">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm uppercase tracking-wider">Years Experience</div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            className="bg-white rounded-3xl p-12 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Innovation", description: "Constantly evolving our methods with the latest educational technology", icon: "💡" },
                { title: "Excellence", description: "Maintaining the highest standards in education and student support", icon: "⭐" },
                { title: "Integrity", description: "Building trust through transparent practices and honest guidance", icon: "🤝" }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

// Courses Page Component - Enhanced with modern design
const Courses = () => {
  const courses = [
    {
      title: "SSC CGL Complete Course",
      duration: "12 Months",
      level: "Beginner to Advanced",
      subjects: ["Quantitative Aptitude", "English", "General Studies", "Reasoning"],
      price: "₹15,999",
      features: ["Live Classes", "Study Materials", "Mock Tests", "Doubt Support"]
    },
    {
      title: "UPSC CSE Foundation",
      duration: "18 Months",
      level: "Comprehensive",
      subjects: ["History", "Geography", "Polity", "Economics", "Current Affairs"],
      price: "₹25,999",
      features: ["Expert Mentorship", "Answer Writing", "Personality Development", "Interview Prep"]
    },
    {
      title: "Banking PO Masterclass",
      duration: "8 Months",
      level: "Intermediate",
      subjects: ["Quantitative Aptitude", "Reasoning", "English", "Banking Awareness"],
      price: "₹12,999",
      features: ["Sectional Tests", "Previous Years", "Group Discussion", "Interview Tips"]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive courses designed to help you excel in government examinations with expert guidance and proven methodologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📅 {course.duration}</span>
                    <span>🎯 {course.level}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-accent-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-primary-600">{course.price}</span>
                    <span className="text-sm text-gray-500">One-time payment</span>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-full font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// Notes Page Component - Keep existing functionality with enhanced design
const Notes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [examFilter, setExamFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPdfs();
  }, []);

  useEffect(() => {
    if (examFilter === 'all') {
      setFilteredPdfs(pdfs);
    } else {
      setFilteredPdfs(pdfs.filter(pdf => pdf.exam_type.toLowerCase() === examFilter.toLowerCase()));
    }
  }, [pdfs, examFilter]);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get(`${API}/pdfs`);
      setPdfs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch study materials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async (pdfId, title) => {
    try {
      const response = await axios.get(`${API}/pdfs/${pdfId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new window.Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PDF",
        variant: "destructive"
      });
    }
  };

  const examTypes = ['all', 'SSC', 'UPSC', 'Banking', 'Railway', 'State PSC'];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Study <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Materials</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive study materials, notes, and resources for all government examinations.
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {examTypes.map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setExamFilter(type)}
                  className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                    examFilter === type
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type === 'all' ? 'All Categories' : type}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* PDF Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPdfs.map((pdf, index) => (
                <motion.div
                  key={pdf.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{pdf.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                          {pdf.exam_type}
                        </span>
                        <span>{pdf.subject}</span>
                      </div>
                    </div>
                    <div className="text-4xl">📄</div>
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    Uploaded: {new Date(pdf.uploaded_at).toLocaleDateString()}
                  </div>

                  <motion.button
                    onClick={() => downloadPdf(pdf.id, pdf.title)}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-full font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>📥</span>
                    <span>Download PDF</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {filteredPdfs.length === 0 && !loading && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Materials Found</h3>
              <p className="text-gray-600">No study materials available for the selected category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

// Schedule Page Component - Enhanced with modern design
const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${API}/schedules`);
      setSchedules(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch class schedules",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.day_of_week]) {
      acc[schedule.day_of_week] = [];
    }
    acc[schedule.day_of_week].push(schedule);
    return acc;
  }, {});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Class <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Schedule</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our comprehensive class schedule and never miss an important session.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {daysOfWeek.map((day, dayIndex) => (
                <motion.div
                  key={day}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                    {day}
                  </h3>
                  
                  <div className="space-y-3">
                    {groupedSchedules[day]?.map((schedule, index) => (
                      <motion.div
                        key={schedule.id}
                        className="bg-gradient-to-br from-primary-50 to-accent-50 p-4 rounded-xl border border-primary-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm font-semibold text-primary-700 mb-1">
                          {schedule.exam_type}
                        </div>
                        <div className="text-sm text-gray-700 mb-2">{schedule.subject}</div>
                        <div className="text-xs text-gray-600 mb-2">{schedule.time}</div>
                        
                        {schedule.is_online && schedule.meeting_link && (
                          <motion.a
                            href={schedule.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Join Online
                          </motion.a>
                        )}
                      </motion.div>
                    )) || (
                      <div className="text-center text-gray-500 py-8">
                        <div className="text-2xl mb-2">📅</div>
                        <div className="text-sm">No classes</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

// Contact Page Component - Enhanced with modern form design
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course_interested: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contacts`, formData);
      toast({
        title: "Success!",
        description: "Your message has been submitted. We'll contact you soon."
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        course_interested: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get In <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your journey? Contact us today and let's discuss how we can help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Interested In *
                  </label>
                  <select
                    name="course_interested"
                    value={formData.course_interested}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                  >
                    <option value="">Select a course</option>
                    <option value="SSC CGL">SSC CGL</option>
                    <option value="UPSC CSE">UPSC CSE</option>
                    <option value="Banking PO">Banking PO</option>
                    <option value="Railway NTPC">Railway NTPC</option>
                    <option value="State PSC">State PSC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-white/80">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-white/80">info@bipulsir.edu</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-white/80">Educational Hub, India</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">⏰</span>
                    </div>
                    <div>
                      <div className="font-semibold">Office Hours</div>
                      <div className="text-white/80">Mon - Sat: 9:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                className="bg-green-500 rounded-3xl p-8 text-white text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2">Quick Support</h3>
                <p className="mb-4 text-green-100">
                  Get instant answers to your questions via WhatsApp
                </p>
                <motion.a
                  href="https://wa.me/9876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-green-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat on WhatsApp
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// Admin Page Component - Keep existing functionality with enhanced design
const Admin = () => {
  const [currentView, setCurrentView] = useState('pdfs');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Admin authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Test authentication with a simple API call
      const auth = window.btoa(`${credentials.username}:${credentials.password}`);
      await axios.get(`${API}/admin/contacts`, {
        headers: { Authorization: `Basic ${auth}` }
      });
      
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', auth);
      toast({
        title: "Success",
        description: "Login successful"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setCredentials({ username: '', password: '' });
    setCurrentView('pdfs');
  };

  // Check if already authenticated
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-20">
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
                  placeholder="Enter password"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Demo credentials: admin / admin123
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Admin Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg min-h-screen">
            <nav className="p-6">
              <div className="space-y-2">
                {[
                  { id: 'pdfs', label: 'Manage PDFs', icon: '📄' },
                  { id: 'schedules', label: 'Class Schedule', icon: '📅' },
                  { id: 'contacts', label: 'Contact Messages', icon: '💬' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <AdminContent currentView={currentView} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// Admin Content Component (placeholder - implement full admin functionality)
const AdminContent = ({ currentView }) => {
  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Students", value: "5,247", icon: "👨‍🎓", color: "from-blue-500 to-blue-600" },
          { title: "Active Courses", value: "24", icon: "📚", color: "from-green-500 to-green-600" },
          { title: "Study Materials", value: "156", icon: "📄", color: "from-purple-500 to-purple-600" },
          { title: "Success Rate", value: "98%", icon: "🏆", color: "from-orange-500 to-orange-600" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'pdfs':
        return <div className="text-center py-20 text-gray-500">PDF Management - Implementation needed</div>;
      case 'schedules':
        return <div className="text-center py-20 text-gray-500">Schedule Management - Implementation needed</div>;
      case 'contacts':
        return <div className="text-center py-20 text-gray-500">Contact Messages - Implementation needed</div>;
      default:
        return renderDashboard();
    }
  };

  return renderContent();
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <div className="App bg-white min-h-screen">
        <AnimatedHeader />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
        <AnimatedFooter />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;