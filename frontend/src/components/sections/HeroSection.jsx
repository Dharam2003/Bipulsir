import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-primary-950 to-dark-900">
        {/* Animated Mesh Gradient */}
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(30, 91, 207, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 191, 165, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(26, 64, 143, 0.3) 0%, transparent 50%)
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
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1Spring }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9)), url('https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwwfHx8Ymx1ZXwxNzU4MDQ4MjMyfDA&ixlib=rb-4.1.0&q=85')`
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ opacity, scale }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight"
              style={{ y: y2Spring }}
            >
              <span className="block">Master Your</span>
              <span className="block bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                Educational
              </span>
              <span className="block text-primary-300">Future</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience next-generation learning with{' '}
              <span className="text-accent-400 font-semibold">Bipulsir</span>{' '}
              - where innovation meets education through advanced coaching, 
              interactive materials, and proven success strategies.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/courses"
                className="group relative bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Explore Courses</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/notes"
                className="group bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Study Materials
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "5000+", label: "Students Trained" },
              { number: "98%", label: "Success Rate" },
              { number: "15+", label: "Expert Mentors" },
              { number: "50+", label: "Course Materials" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: index * 0.5 }}
              >
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-accent-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Action Elements */}
        <motion.div
          className="absolute top-1/4 right-10 hidden lg:block"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full backdrop-blur-sm border border-white/10" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-10 hidden lg:block"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full backdrop-blur-sm border border-white/10" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            variants={pulseVariants}
            animate="animate"
          >
            <motion.div
              className="w-1 h-3 bg-accent-400 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <p className="text-white/60 text-xs mt-2 uppercase tracking-wider">Scroll</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;