"use client";

import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ContestCard from "@/components/contest/contestCard";
import { useRouter } from "next/navigation";

export default function Contests() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto flex flex-col items-center justify-center p-5 md:p-14 space-y-10 max-w-7xl w-full">
        <section className="text-center pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide subpixel-antialiased text-primary">
            Choose Your Contest
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground mt-4">
            Compete in the most thrilling coding contests.
          </p>
        </section>

        <section className="w-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-5 w-full">
            <ContestCard
              title="1v1 Contest"
              description="Face off in a thrilling head-to-head challenge. Prove your speed and skill as this contest waits for no one."
              content="This is a 15-minute intense battle designed to test your speed and precision. Quick thinking and rapid execution are key."
              buttonText="Play 1v1"
              buttonAction="/1v1"
            />
            <ContestCard
              title="BattleRoyale Contest"
              description="Compete against many in an intense battle. Outlast everyone and rise to the top; only the fastest will succeed."
              content="Prepare for a 1-hour showdown where endurance and strategy matter most. Survive the challenges and outlast every opponent."
              buttonText="Join BattleRoyale"
              buttonAction="/battle"
            />
            <ContestCard
              title="ICPC-Styled Contest"
              description="A competitive contest inspired by ICPC. Showcase your coding prowess against top minds in a challenging environment."
              content="A 3-hour rigorous contest featuring multiple problems of varying difficulty. Deep problem-solving skills will lead to victory."
              buttonText="Apply for ICPC"
              buttonAction="/icpc"
            />
          </div>
        </section>

        {!isLoggedIn && (
          <div className="mt-10">
            <LoginWarnPopup isLoggedIn={isLoggedIn} />
          </div>
        )}
      </main>
    </div>
  );
}
