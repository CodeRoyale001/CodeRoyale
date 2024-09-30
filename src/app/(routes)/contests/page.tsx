"use client";

import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ContestCard from "@/components/contest/contestCard";
import { Sword, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Contests() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const contestTypes = [
    {
      title: "1v1 Contest",
      description: "Face off in a thrilling head-to-head challenge.",
      content:
        "15-minute intense battles to test your speed and precision. Quick thinking and rapid execution are key.",
      buttonText: "Play 1v1",
      buttonAction: "/1v1",
      icon: Sword,
    },
    {
      title: "BattleRoyale Contest",
      description: "Compete against many in an intense battle royale.",
      content:
        "1-hour showdowns where endurance and strategy matter most. Outlast your opponents and rise to the top.",
      buttonText: "Join BattleRoyale",
      buttonAction: "/battle",
      icon: Users,
    },
    {
      title: "ICPC-Styled Contest",
      description:
        "Showcase your coding prowess in an ICPC-inspired environment.",
      content:
        "3-hour rigorous contests featuring multiple problems of varying difficulty. Deep problem-solving skills lead to victory.",
      buttonText: "Apply for ICPC",
      buttonAction: "/icpc",
      icon: Trophy,
    },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <section className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Choose Your Coding Challenge
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Prove your skills in our diverse range of competitive coding
            contests. Select your battlefield and start coding!
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contestTypes.map((contest) => (
            <ContestCard
              key={contest.title}
              title={contest.title}
              description={contest.description}
              content={contest.content}
              buttonText={contest.buttonText}
              buttonAction={contest.buttonAction}
              icon={<contest.icon className="w-6 h-6 text-primary" />}
            />
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-primary">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Try our practice problems to warm up and find the contest that suits
            you best. Hone your skills before diving into the competitions.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/problems");
            }}
          >
            Explore Practice Problems
          </Button>
        </section>

        {!isLoggedIn && (
          <div className="mt-10 text-center">
            <LoginWarnPopup isLoggedIn={isLoggedIn} />
          </div>
        )}
      </main>
    </div>
  );
}
