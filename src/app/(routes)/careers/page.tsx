"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Zap,
  Coffee,
  Rocket,
  Globe,
  TrendingUp,
  Award,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// This could be moved to a separate file and fetched from an API in the future
const jobOpenings = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "We're looking for a seasoned full-stack developer to help build and scale our innovative coding platform.",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Strong understanding of database design and optimization",
      "Experience with WebSocket for real-time applications",
      "Passion for competitive programming and game-like experiences",
    ],
  },
];

export default function Careers() {
  const openPositionsRef = useRef<HTMLElement>(null);

  const scrollToOpenPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 lg:mb-20 text-primary">
          Join the CodeRoyale Revolution
        </h1>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-primary">
            Our Mission: Redefining Competitive Programming
          </h2>
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            At CodeRoyale, we're not just building a platform; we're creating a
            new paradigm for competitive programming. Our goal is to transform
            coding challenges into thrilling, game-like experiences that push
            the boundaries of skill, strategy, and real-time problem-solving.
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-10">
            We're looking for passionate individuals who are excited about
            revolutionizing the way programmers compete and learn. Join us in
            shaping the future of coding competitions and make a lasting impact
            on the global programming community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="mailto:careers@coderoyale.com">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg"
              >
                <Rocket className="mr-2 h-5 w-5" /> Launch Your Career with Us
              </Button>
            </Link>
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg"
              onClick={scrollToOpenPositions}
            >
              See Open Positions <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-primary">
            Our Culture: Where Innovation Meets Inclusivity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: "Diversity & Inclusion",
                content:
                  "We believe that diverse teams drive innovation. At CodeRoyale, we're committed to creating an inclusive environment where all voices are heard and valued.",
              },
              {
                icon: Zap,
                title: "Innovation-Driven",
                content:
                  "Innovation is at the heart of everything we do. We encourage bold ideas, calculated risks, and continuous learning.",
              },
              {
                icon: Coffee,
                title: "Work-Life Balance",
                content:
                  "We believe in working smart, not just hard. Our flexible work hours and remote-first approach allow team members to maintain a healthy work-life balance.",
              },
              {
                icon: Briefcase,
                title: "Growth & Development",
                content:
                  "At CodeRoyale, your growth is our priority. We offer continuous learning opportunities, mentorship programs, and the chance to work on cutting-edge technologies.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-card text-card-foreground p-4 sm:p-6 transform transition duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl sm:text-2xl mb-2 sm:mb-4">
                    <item.icon className="w-6 h-6 mr-2" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24">
          <Card className="bg-card text-card-foreground p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-primary">
              Why CodeRoyale?
            </h2>
            <ul className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Globe,
                  title: "Be a Pioneer in Competitive Programming",
                  content:
                    "Join us in redefining the landscape of competitive programming. Your work will directly impact how developers around the world learn, compete, and grow their skills.",
                },
                {
                  icon: Users,
                  title: "Global Impact, Remote-First Culture",
                  content:
                    "Work from anywhere in the world. We've embraced a remote-first culture that allows us to hire the best talent globally while providing the flexibility to work where you're most productive.",
                },
                {
                  icon: TrendingUp,
                  title: "Rapid Growth and Learning",
                  content:
                    "As a fast-growing startup, we offer unparalleled opportunities for professional growth. You'll wear multiple hats, take on challenging projects, and develop a diverse skill set that will accelerate your career.",
                },
                {
                  icon: Award,
                  title: "Competitive Compensation and Equity",
                  content:
                    "We offer competitive salaries and equity packages. As an early team member, you'll have the opportunity to own a piece of the company and directly benefit from our collective success.",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <item.icon className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="mb-12 sm:mb-16 lg:mb-24" ref={openPositionsRef}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-primary">
            Open Positions
          </h2>
          {jobOpenings.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {jobOpenings.map((job, index) => (
                <Card
                  key={index}
                  className="bg-card text-card-foreground overflow-hidden"
                >
                  <CardHeader className="bg-primary text-primary-foreground p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {job.department}
                      </Badge>
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {job.location}
                      </Badge>
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm sm:text-base mb-3 sm:mb-4">
                      {job.description}
                    </p>
                    <h4 className="font-semibold text-base sm:text-lg mb-2">
                      Requirements:
                    </h4>
                    <ul className="list-disc list-inside text-sm sm:text-base">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="mb-1">
                          {req}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-4 sm:mt-6" size="lg">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card text-card-foreground p-6 sm:p-8 text-center">
              <p className="text-lg sm:text-xl mb-3 sm:mb-4">
                We don't have any open positions right now, but we're always
                looking for talented individuals.
              </p>
              <p className="text-sm sm:text-base mb-4 sm:mb-6">
                If you're passionate about revolutionizing competitive
                programming and think you'd be a great fit for CodeRoyale, we'd
                love to hear from you. Send your resume and a brief introduction
                to{" "}
                <Link
                  href="mailto:careers@coderoyale.com"
                  className="text-primary hover:underline"
                >
                  careers@coderoyale.com
                </Link>
              </p>
              <p className="text-sm sm:text-base mb-4 sm:mb-6">
                We're particularly interested in individuals with expertise in
                game development, competitive programming platforms, real-time
                systems, and scalable architecture.
              </p>
              <Button size="lg" className="text-sm sm:text-base">
                Express Interest
              </Button>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
