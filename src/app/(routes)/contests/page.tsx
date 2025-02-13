"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Sword, Users, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AnimatedShinyText from "@/components/ui/shinyText";
import Modescard from "@/components/contest/modesCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Contests() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const contestTypes = [
    {
      title: "1v1 Duel",
      description: "Face off in a thrilling head-to-head challenge",
      content: "15-minute intense battles testing speed and precision",
      buttonText: "Start Duel",
      buttonAction: "/1v1",
      icon: Sword,
      color: "from-purple-400 to-indigo-400",
    },
    {
      title: "Battle Royale",
      description: "Massive coding free-for-all",
      content: "1-hour showdown with 100+ participants",
      buttonText: "Join Battle",
      buttonAction: "/battle",
      icon: Users,
      color: "from-rose-400 to-pink-400",
    },
    {
      title: "ICPC Challenge",
      description: "Elite algorithmic competition",
      content: "3-hour rigorous problem-solving marathon",
      buttonText: "Enter Challenge",
      buttonAction: "/icpc",
      icon: Trophy,
      color: "from-cyan-600 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <section className="text-center mb-16 sm:mb-20">
          <AnimatedShinyText className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Choose Your Arena
            </h1>
          </AnimatedShinyText>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Prove your skills in our competitive coding arenas. Select your
            battle style and climb the leaderboards!
          </motion.p>
        </section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {contestTypes.map((contest) => (
            <motion.div
              key={contest.title}
              variants={itemVariants}
              className="h-full" // Add this class
            >
              <Modescard
                title={contest.title}
                description={contest.description}
                content={contest.content}
                buttonText={contest.buttonText}
                buttonAction={contest.buttonAction}
                icon={
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-lg border border-gray-200/30">
                    <contest.icon className="w-8 h-8 text-gray-900" />
                  </div>
                }
                className={`h-full bg-gradient-to-br ${contest.color} backdrop-blur-lg border border-gray-200/30 hover:border-gray-300/50 transition-all`}
              />
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 sm:p-12 border border-white/10 backdrop-blur-lg"
        >
          <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-100">
            New to Competitive Coding?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Sharpen your skills in our practice dojo before entering the arena.
          </p>
          <Button
            variant="gradient"
            size="lg"
            className="group hover:scale-[1.03] transition-transform"
            onClick={() => router.push("/problems")}
          >
            <span className="mr-2">🏋️</span>
            Training Grounds
            <span className="ml-2 opacity-80 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </Button>
        </motion.section>

        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2"
          >
            <LoginWarnPopup isLoggedIn={isLoggedIn} />
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
