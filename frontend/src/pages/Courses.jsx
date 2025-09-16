import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "SSC Combined Graduate Level (CGL)",
      duration: "6 Months",
      price: "₹15,000",
      features: ["Complete Syllabus Coverage", "Mock Tests", "Doubt Clearing Sessions", "Study Materials"],
      popular: true,
      image: "https://images.unsplash.com/photo-1574130303188-31a915382726?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxlZHVjYXRpb24lMjBjb2FjaGluZ3xlbnwwfHx8Ymx1ZXwxNzU4MDQ0NjY4fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 2,
      title: "UPSC Civil Services Preliminary",
      duration: "12 Months",
      price: "₹25,000",
      features: ["Comprehensive Coverage", "Current Affairs", "Essay Writing", "Interview Preparation"],
      popular: false,
      image: "https://images.unsplash.com/photo-1550198498-5d06469259ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnb3Zlcm5tZW50JTIwZXhhbXxlbnwwfHx8Ymx1ZXwxNzU4MDQ0Njc1fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 3,
      title: "Banking & Financial Services",
      duration: "4 Months",
      price: "₹12,000",
      features: ["IBPS Preparation", "SBI Exams", "Quantitative Aptitude", "Banking Awareness"],
      popular: false,
      image: "https://images.pexels.com/photos/159746/notebook-pen-pencil-education-159746.jpeg"
    },
    {
      id: 4,
      title: "Railway Recruitment Board (RRB)",
      duration: "3 Months",
      price: "₹10,000",
      features: ["Technical & Non-Technical", "Group D Preparation", "ALP & Technician", "Practice Tests"],
      popular: false,
      image: "https://images.unsplash.com/photo-1574130303188-31a915382726?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxlZHVjYXRpb24lMjBjb2FjaGluZ3xlbnwwfHx8Ymx1ZXwxNzU4MDQ0NjY4fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 5,
      title: "State PSC Examinations",
      duration: "8 Months",
      price: "₹18,000",
      features: ["State-specific Syllabus", "Local Current Affairs", "Interview Guidance", "Previous Papers"],
      popular: false,
      image: "https://images.unsplash.com/photo-1550198498-5d06469259ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxnb3Zlcm5tZW50JTIwZXhhbXxlbnwwfHx8Ymx1ZXwxNzU4MDQ0Njc1fDA&ixlib=rb-4.1.0&q=85"
    },
    {
      id: 6,
      title: "Defence Services (NDA/CDS)",
      duration: "10 Months",
      price: "₹20,000",
      features: ["Written Exam Prep", "Physical Training", "Personality Test", "Medical Guidance"],
      popular: false,
      image: "https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Courses</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose from our expertly designed courses tailored for different government examinations
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-black group transform hover:-translate-y-2"
              >
                {course.popular && (
                  <div className="bg-gradient-to-r from-black to-gray-800 text-white text-center py-2 font-semibold text-sm">
                    🔥 Most Popular
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-black mb-2">{course.price}</div>
                    <div className="text-sm text-gray-500">One-time payment</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      to="/contact"
                      className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-center block transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      Enroll Now
                    </Link>
                    <button className="w-full border border-gray-300 hover:border-black text-gray-700 hover:text-black py-3 px-4 rounded-lg font-semibold transition-all duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Confused About Which Course to Choose?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our expert counselors are here to help you choose the right course based on your goals and preparation level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
            >
              Get Free Counseling
            </Link>
            <a 
              href="https://wa.me/9876543210"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;