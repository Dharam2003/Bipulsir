import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Bipul Competitive</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering government exam aspirants with world-class coaching and comprehensive preparation strategies
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To provide comprehensive, accessible, and result-oriented coaching for government examinations, 
                ensuring that every aspiring candidate has the tools and guidance needed to succeed.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Expert faculty with proven track records</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Comprehensive study materials and resources</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Personalized attention and doubt clearing</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg" 
                alt="Professional Success" 
                className="rounded-2xl shadow-2xl grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Numbers that speak for our success</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-700 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-500 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to your success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-black to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">BP</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Bipul Kumar</h3>
              <p className="text-gray-600 font-medium mb-4">Founder & Lead Instructor</p>
              <p className="text-gray-600">Expert in SSC, UPSC, and Banking examinations with 10+ years of teaching experience</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AK</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Ankit Kumar</h3>
              <p className="text-gray-600 font-medium mb-4">Mathematics Expert</p>
              <p className="text-gray-600">Specializes in Quantitative Aptitude and Reasoning for all government exams</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">PK</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Priya Kumari</h3>
              <p className="text-gray-600 font-medium mb-4">English & GK Expert</p>
              <p className="text-gray-600">Expert in English Language, General Knowledge, and Current Affairs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;