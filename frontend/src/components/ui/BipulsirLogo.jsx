import React from 'react';
import { motion } from 'framer-motion';

const BipulsirLogo = ({ className = "", animated = true }) => {
  const logoVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const glowVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const text = "BIPULSIR";

  return (
    <motion.div
      className={`relative inline-flex items-center ${className}`}
      variants={logoVariants}
      initial={animated ? "initial" : "animate"}
      animate="animate"
      whileHover={animated ? "hover" : undefined}
    >
      {/* Animated Glow Background */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg blur-xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
      )}
      
      {/* Logo Container */}
      <div className="relative flex items-center space-x-1">
        {/* Animated Icon */}
        <motion.div
          className="relative w-10 h-10 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute w-10 h-10 border-2 border-primary-500 rounded-full"
            animate={animated ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Accent Ring */}
          <motion.div
            className="absolute w-6 h-6 border-2 border-accent-400 rounded-full"
            animate={animated ? { rotate: -360 } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Dot */}
          <motion.div
            className="w-2 h-2 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full"
            animate={animated ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Animated Text */}
        <div className="flex">
          {text.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent tracking-tight"
              variants={letterVariants}
              initial={animated ? "initial" : "animate"}
              animate="animate"
              custom={i}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Subtitle */}
      <motion.div
        className="absolute -bottom-6 left-12 text-xs text-primary-600/80 font-medium uppercase tracking-wider"
        initial={animated ? { opacity: 0, y: 10 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Educational Innovation
      </motion.div>
    </motion.div>
  );
};

export default BipulsirLogo;