import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BipulsirLogo from '../ui/BipulsirLogo';

const AnimatedFooter = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      color: "#00bfa5",
      transition: { duration: 0.2 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const quickLinks = [
    { path: '/courses', label: 'Courses' },
    { path: '/notes', label: 'Study Materials' },
    { path: '/schedule', label: 'Class Schedule' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const examCategories = [
    'SSC CGL', 'UPSC CSE', 'Banking PO', 'Railway NTPC', 'State PSC'
  ];

  return (
    <motion.footer
      ref={ref}
      className="relative bg-gradient-to-br from-dark-950 via-primary-950 to-dark-900 text-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(30, 91, 207, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 191, 165, 0.3) 0%, transparent 50%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              <BipulsirLogo animated={false} />
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Revolutionizing government exam preparation through innovative learning 
              experiences and cutting-edge educational technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {['WhatsApp', 'Telegram', 'YouTube', 'Instagram'].map((social, index) => (
                <motion.a
                  key={social}
                  href={social === 'WhatsApp' ? 'https://wa.me/9876543210' : '#'}
                  className="w-12 h-12 bg-gradient-to-br from-primary-600/20 to-accent-600/20 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-medium">{social.slice(0, 2)}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-accent-400 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={link.path} variants={linkHoverVariants} whileHover="hover">
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-accent-400 transition-colors text-sm uppercase tracking-wide font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Exam Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-accent-400 uppercase tracking-wide">
              Exam Categories
            </h3>
            <ul className="space-y-3">
              {examCategories.map((exam, index) => (
                <motion.li 
                  key={exam} 
                  variants={linkHoverVariants} 
                  whileHover="hover"
                  className="text-gray-300 text-sm font-medium cursor-pointer"
                >
                  {exam}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800/50 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600/20 to-accent-600/20 rounded-full flex items-center justify-center">
                <span className="text-accent-400 text-lg">📞</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Phone</p>
                <p className="text-white font-medium">+91 98765 43210</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600/20 to-accent-600/20 rounded-full flex items-center justify-center">
                <span className="text-accent-400 text-lg">📧</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Email</p>
                <p className="text-white font-medium">info@bipulsir.edu</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600/20 to-accent-600/20 rounded-full flex items-center justify-center">
                <span className="text-accent-400 text-lg">📍</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Location</p>
                <p className="text-white font-medium">Educational Hub, India</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4 md:mb-0">
            &copy; 2025 Bipulsir Educational Innovation. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-accent-400 transition-colors uppercase tracking-wide"
              variants={linkHoverVariants}
              whileHover="hover"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-accent-400 transition-colors uppercase tracking-wide"
              variants={linkHoverVariants}
              whileHover="hover"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />
    </motion.footer>
  );
};

export default AnimatedFooter;