"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Github, Rocket } from "lucide-react";

const founders = [
  {
    name: "Jal Thakor",
    image: "/jal-thakor.jpg", // Replace with actual image path
    description:
      "Competitive programming enthusiast turned entrepreneur. Jal's vision is to make coding as thrilling as your favorite video game.",
    role: "CEO & Co-founder",
  },
  {
    name: "Ajeet Kumar",
    image: "/ajeet-kumar.jpg", // Replace with actual image path
    description:
      "Full-stack wizard with a passion for creating seamless user experiences. Ajeet is the architect behind CodeRoyale's robust platform.",
    role: "CTO & Co-founder",
  },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-5xl font-bold text-center mb-20">
          Revolutionizing Competitive Programming
        </h1>

        <section className="mb-24">
          <h2 className="text-3xl font-semibold mb-8">Our Vision</h2>
          <Card className="bg-card text-card-foreground p-8">
            <p className="text-lg leading-relaxed">
              Imagine a world where coding isn't just a skill, but a thrilling
              sport. A world where programmers don't just compete, they battle
              in real-time, adrenaline pumping, fingers flying across keyboards.
              That's the world CodeRoyale is creating.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              We're not just building a platform; we're igniting a revolution in
              competitive programming. Our vision is to transform coding from a
              solitary activity into a spectator sport, complete with
              nail-biting finishes, underdog victories, and legendary comebacks.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              By 2025, we aim to be the go-to platform for coding battles,
              hosting millions of matches, nurturing the next generation of
              coding superstars, and maybe, just maybe, making 'professional
              coder' as exciting a career prospect as 'pro gamer'.
            </p>
          </Card>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-semibold mb-8">Our Mission</h2>
          <Tabs defaultValue="what" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="what">What We Do</TabsTrigger>
              <TabsTrigger value="how">How We Do It</TabsTrigger>
              <TabsTrigger value="why">Why It Matters</TabsTrigger>
            </TabsList>
            <TabsContent value="what">
              <Card className="bg-card text-card-foreground p-8">
                <p className="text-lg leading-relaxed">
                  We're turning coding into a battle royale extravaganza.
                  Picture this: 100 coders enter, only one emerges victorious.
                  It's fast, it's fierce, and it's reshaping how we think about
                  programming competitions.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  But that's not all. We're also introducing intense 1v1 duels,
                  where you can challenge a single opponent to a coding
                  showdown. Our platform isn't just about competition; it's
                  about pushing your limits, learning in real-time, and
                  experiencing the thrill of coding like never before.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="how">
              <Card className="bg-card text-card-foreground p-8">
                <p className="text-lg leading-relaxed">
                  Our platform matches you with peers at your skill level. Start
                  a game anytime, anywhere. Solve problems faster than your
                  opponents or face elimination. It's coding on steroids, and
                  it's addictively fun.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  We use advanced algorithms to ensure fair matchmaking, provide
                  real-time feedback on your code, and create an immersive
                  environment that feels more like a game than a traditional
                  coding challenge. With multiple programming languages
                  supported and a variety of problem types, every match is a new
                  adventure.
                </p>
              </Card>
            </TabsContent>
            <TabsContent value="why">
              <Card className="bg-card text-card-foreground p-8">
                <p className="text-lg leading-relaxed">
                  Because coding shouldn't be boring. Because improvement comes
                  from challenge. Because the coders of tomorrow need a training
                  ground as dynamic as the tech world they'll be shaping.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  We believe that by gamifying the coding experience, we can
                  attract more people to programming, help experienced coders
                  refine their skills under pressure, and create a community
                  that celebrates both the art and science of coding. In a world
                  where software touches every aspect of our lives, we're making
                  sure the next generation of coders is ready for anything.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-semibold mb-8">Meet the Masterminds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((founder) => (
              <Card
                key={founder.name}
                className="bg-card text-card-foreground overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <CardHeader className="flex flex-col items-center p-8 bg-primary text-primary-foreground">
                  <Avatar className="w-40 h-40 mb-6 border-4 border-background">
                    <AvatarImage src={founder.image} alt={founder.name} />
                    <AvatarFallback>
                      {founder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-3xl mb-2">
                    {founder.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    {founder.role}
                  </Badge>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-center text-lg">{founder.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <Card className="bg-card text-card-foreground p-8">
            <h2 className="text-3xl font-semibold mb-6">Join the Revolution</h2>
            <p className="text-lg mb-8">
              CodeRoyale isn't just a platform; it's a movement. And movements
              need passionate people. Whether you're a coder, a designer, or
              just someone excited about the future of programming, there's a
              place for you in our revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="https://github.com/CodeRoyale001" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg"
                >
                  <Github className="w-6 h-6 mr-2" />
                  Contribute on GitHub
                </Button>
              </Link>
              <Link href="/careers" passHref>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto text-lg"
                >
                  <Rocket className="w-6 h-6 mr-2" />
                  Join Our Team
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
