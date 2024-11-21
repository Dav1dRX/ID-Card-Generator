import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEnterButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-2"
        >
          ID Master
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl mb-4"
        >
          Create Your Digital Identity
        </motion.p>
        {showEnterButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/generator">
              <Button>Enter</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;