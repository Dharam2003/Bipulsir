import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BipulsirLogo from '../ui/BipulsirLogo';

const AnimatedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100 },
    animate: { 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/notes', label: 'Materials' },
    { path: '/schedule', label: 'Classes' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100' 
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-200/50'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BipulsirLogo animated={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent-500 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ x: '-50%' }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Admin Button */}
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/admin"
                className="ml-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full font-medium text-sm uppercase tracking-wide hover:from-primary-700 hover:to-accent-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Admin
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                className="w-6 h-0.5 bg-current mb-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 4 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current mb-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -4 }
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-primary-100/50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={mobileMenuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-all duration-200 rounded-lg ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  variants={mobileMenuItemVariants}
                  initial="closed"
                  animate="open"
                  custom={navItems.length}
                  className="pt-2"
                >
                  <Link
                    to="/admin"
                    className="block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-3 rounded-lg font-medium text-sm uppercase tracking-wide text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default AnimatedHeader;