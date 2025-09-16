import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
    return <LoadingSpinner message="Loading Study Materials..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Materials</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Download comprehensive PDFs, notes, and practice materials for your exam preparation
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {examTypes.map(exam => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedExam === exam
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Group by:</label>
              <select 
                value={groupBy} 
                onChange={(e) => setGroupBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              >
                <option value="exam_type">Exam Type</option>
                <option value="subject">Subject</option>
                <option value="batch">Batch</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Study Materials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(groupedPdfs).length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">No Study Materials Found</h3>
              <p className="text-gray-600 mb-6">There are no PDFs available for the selected exam type.</p>
              <button 
                onClick={() => setSelectedExam('All')}
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                View All Materials
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedPdfs).map(([group, groupPdfs]) => (
                <div key={group}>
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                    <div className="w-1 h-8 bg-black rounded-full mr-4"></div>
                    {group}
                    <span className="ml-3 bg-gray-100 text-black text-sm font-medium px-3 py-1 rounded-full">
                      {groupPdfs.length} materials
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupPdfs.map(pdf => (
                      <div 
                        key={pdf.id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-black group overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors duration-200">
                                {pdf.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="bg-gray-100 text-black text-xs font-medium px-2 py-1 rounded-full">
                                  {pdf.exam_type}
                                </span>
                                <span className="bg-gray-200 text-black text-xs font-medium px-2 py-1 rounded-full">
                                  {pdf.subject}
                                </span>
                                {pdf.batch && (
                                  <span className="bg-gray-300 text-black text-xs font-medium px-2 py-1 rounded-full">
                                    {pdf.batch}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          
                          {pdf.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {pdf.description}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>📅 {new Date(pdf.upload_date).toLocaleDateString()}</span>
                            <span>💾 PDF File</span>
                          </div>
                          
                          <button
                            onClick={() => downloadPDF(pdf.id, pdf.filename)}
                            className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            <span>Download PDF</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notes;