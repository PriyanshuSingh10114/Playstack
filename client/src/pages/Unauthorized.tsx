import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="text-9xl font-bold text-muted/20 select-none">403</div>
        <h1 className="text-2xl font-bold mt-4">Access Denied</h1>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          You do not have the required permissions to access this page. Please contact your system administrator if you believe this is an error.
        </p>
        <Button onClick={() => navigate('/dashboard')} className="mt-8">
          Return to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
