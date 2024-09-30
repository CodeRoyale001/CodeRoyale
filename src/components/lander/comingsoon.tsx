import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">
          Coming Soon
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground mb-8">
          We're working on something exciting!
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-12"
      >
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-7xl sm:text-8xl animate-pulse">🚀</span>
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-lg sm:text-xl text-center max-w-2xl mb-8 text-muted-foreground"
      >
        Our team is putting the finishing touches on this feature. Stay tuned for an amazing coding experience!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link href="/">
          <Button size="lg" className="group">
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
