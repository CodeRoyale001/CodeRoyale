"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypeAnimation } from "react-type-animation";
import { LoginPopup } from "../popups";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Safari from "../ui/safariView";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Trophy,
  DollarSign,
  Code,
  Target,
  Users,
  Zap,
  Clock,
  Gamepad2,
} from "lucide-react";


const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Active Coders" },
  { icon: Zap, value: 50000, suffix: "+", label: "Battles Fought" },
  { icon: Clock, value: 1000000, suffix: "+", label: "Code Hours" },
];

const FEATURES = [
  {
    title: "Battle Royale Contest",
    description: "Compete with 100 users in a battle royale.",
    content:
      "In our battle royale style contest, 100 users compete fiercely, and the last person standing wins. Experience an exciting and competitive environment that keeps you on your toes until the very end.",
    icon: Trophy,
  },
  {
    title: "Earn Real Rewards",
    description: "Win points that convert to real money.",
    content:
      "Winners earn points and in-game currency, which can be withdrawn as real money. Play and earn with tangible rewards, making your gaming experience not only fun but also rewarding in the real world.",
    icon: DollarSign,
  },
  {
    title: "Multi-Language Coding",
    description: "Code in various languages anytime.",
    content:
      "Our platform supports multiple programming languages including C++, JavaScript, Java, and Python. Start contests at any time, enjoying a flexible and versatile coding environment that suits your schedule.",
    icon: Code,
  },
  {
    title: "Skill-Based Matchmaking",
    description: "Compete against users at your level.",
    content:
      "Our advanced matchmaking system ensures you're always competing against users of similar skill levels, providing a challenging yet fair experience for all participants.",
    icon: Target,
  },
];

const accordionItems = [
  {
    value: "item-1",
    question:
      "What is the Battle Royale Contest in CodeRoyale and how does it work?",
    answer: `The Battle Royale Contest is a competition where 100 users compete until one participant remains, who is declared the winner. Participants must solve increasingly difficult coding problems to stay in the game.`,
  },
  {
    value: "item-2",
    question:
      "How do I participate in a Battle Royale Contest on the platform?",
    answer: `Sign up for the event through the CodeRoyale platform. You'll be matched with 99 other participants and need to solve coding challenges to stay in the game. The contest continues until one person remains.`,
  },
  {
    value: "item-3",
    question: "What types of rewards can I earn in CodeRoyale competitions?",
    answer: `Winners earn points and in-game currency that can be converted into real money. There may also be special prizes or bonuses for top performers in certain contests.`,
  },
  {
    value: "item-4",
    question: "How can I withdraw my earnings from CodeRoyale after winning?",
    answer: `Request a withdrawal through the platform's withdrawal feature after accumulating enough points and in-game currency. The specific methods for withdrawing funds will be detailed in your account settings.`,
  },
  {
    value: "item-5",
    question:
      "What programming languages are supported in CodeRoyale contests?",
    answer: `CodeRoyale supports C++, JavaScript, Java, and Python. This allows you to choose the language you are most comfortable with for the challenges.`,
  },
  {
    value: "item-6",
    question: "Can I start a coding contest at any time on CodeRoyale?",
    answer: `Yes, you can participate in contests according to your own schedule, without being restricted to specific times.`,
  },
  {
    value: "item-7",
    question:
      "Is CodeRoyale suitable for programmers of all skill levels and backgrounds?",
    answer: `Yes, CodeRoyale caters to all skill levels, offering a range of contests and challenges that vary in difficulty, along with resources and tutorials for beginners.`,
  },
];


const Lander = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <main className="mx-auto flex flex-col items-center justify-center p-3 md:p-14 space-y-16 max-w-7xl">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center gap-8 text-center pt-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              <TypeAnimation
                wrapper="div"
                sequence={["CODE ROYALE", 1000]}
                speed={50}
                repeat={Infinity}
              />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-3xl font-medium text-muted-foreground"
          >
            <span className="border-l-4 border-cyan-400 pl-2">Next-gen</span> coding battles with{' '}
            <span className="underline decoration-blue-500 decoration-wavy">real stakes</span>
          </motion.p>

          <div className="flex gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <LoginPopup
                classname="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all"
                btntext="Join Arena" btnVaraint={"link"}              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                className="px-8 py-4 border-2 border-cyan-500/30 bg-background/80 backdrop-blur-lg rounded-xl hover:border-cyan-500/50 hover:bg-background/100"
                onClick={() => router.push("/about")}
              >
                Learn More <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-lg">
          <div className="container mx-auto text-center">
            <div className="flex flex-wrap justify-center items-center gap-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <stat.icon className="w-16 h-16 mb-4 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-5xl font-bold mb-2 text-cyan-400">
                    <CountUp end={stat.value} duration={3} />{stat.suffix}
                  </p>
                  <p className="text-muted-foreground uppercase text-sm tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Browser Preview */}
        <motion.section 
          className="w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-3xl" />
          <Safari
            url="coderoyale.tech"
            className="relative z-10 border-2 border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            src={"/image-cr.png"}
          />
        </motion.section>

        {/* Features Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative bg-background/80 backdrop-blur-lg border-2 border-cyan-500/20 rounded-xl hover:border-cyan-500/40 transition-all h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 text-cyan-400" />
                  <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {feature.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {accordionItems.map((item) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AccordionItem 
                  value={item.value}
                  className="bg-background/80 backdrop-blur-lg border-2 border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-colors"
                >
                  <AccordionTrigger className="text-lg font-medium hover:text-cyan-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="w-full relative py-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl" />
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Ready for the Ultimate Code Battle?
            </motion.h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-6 rounded-2xl text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
                onClick={() => router.push(isLoggedIn ? "/contests" : "/signup")}
              >
                {isLoggedIn ? (
                  <>
                    <Gamepad2 className="mr-3 h-6 w-6" />
                    Enter Arena
                  </>
                ) : (
                  "Start Free Trial"
                )}
                <ChevronRightIcon className="ml-3 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Lander;
