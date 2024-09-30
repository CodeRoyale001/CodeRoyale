import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { href: "/about", text: "About Us" },
        { href: "/", text: "Blog" },
        { href: "/careers", text: "Careers" },
        { href: "/", text: "Contact" },
      ],
    },
    {
      title: "Contests",
      links: [
        { href: "/battle", text: "Battle Royale" },
        { href: "/1v1", text: "1v1 Duels" },
        { href: "/", text: "Weekly Challenges" },
        { href: "/leaderboard", text: "Leaderboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/problems", text: "Practice Problems" },
        { href: "/", text: "Tutorials" },
        { href: "/", text: "API Documentation" },
        { href: "/", text: "FAQs" },
      ],
    },
  ];

  const socialIcons = [
    { Icon: Facebook, href: "/", ariaLabel: "Facebook" },
    { Icon: Twitter, href: "/", ariaLabel: "Twitter" },
    { Icon: Instagram, href: "/", ariaLabel: "Instagram" },
    { Icon: Linkedin, href: "/", ariaLabel: "LinkedIn" },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-sm sm:text-base">
            Interested in working as a problem setter?{" "}
            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Apply here
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200">CodeRoyale</h2>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, ariaLabel }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={ariaLabel}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4 text-center md:text-left">
              <h3 className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-200">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} CodeRoyale. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
