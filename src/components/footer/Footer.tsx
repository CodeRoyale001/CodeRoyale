import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { href: "/", text: "About Us" },
        { href: "/", text: "Blogs" },
        { href: "/", text: "Careers" },
        { href: "/", text: "Contact" },
      ],
    },
    {
      title: "Courses",
      links: [
        { href: "/", text: "Advanced DSA in Java" },
        { href: "/", text: "DevOps" },
        { href: "/", text: "Java Backend" },
        { href: "/", text: "JavaScript Developer" },
      ],
    },
    {
      title: "Community",
      links: [
        { href: "/", text: "Contests" },
        { href: "/", text: "Leaderboard" },
        { href: "/", text: "Practice" },
        { href: "/", text: "Profile" },
      ],
    },
  ];

  const socialIcons = [
    { Icon: Facebook, href: "/", ariaLabel: "Facebook" },
    { Icon: X, href: "/", ariaLabel: "Twitter" },
    { Icon: Instagram, href: "/", ariaLabel: "Instagram" },
    { Icon: Linkedin, href: "/", ariaLabel: "LinkedIn" },
  ];

  return (
    <div className="bg-background">

    <footer className=" mx-auto p-3 pb-5 border-t pt-0 px-8">
      <div className="mt-8 text-center flex-1">
        <p className="text-sm">
          Interested in working as a problem setter?{" "}
          <br className="md:hidden" />
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-700 transition-colors"
          >
            Apply here
          </Link>
        </p>
      </div>
      <div className="mx-auto max-w-7xl pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
          <div className="space-y-6 mx-auto">
            <h2 className="text-2xl font-bold">Code Royale</h2>

            <div className="flex space-x-4 items-center justify-center ">
              {socialIcons.map(({ Icon, href, ariaLabel }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="transition-colors"
                  aria-label={ariaLabel}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div
              key={index}
              className="space-y-4 text-center mx-auto md:text-left"
            >
              <h3 className="text-lg font-semibold ">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-sm ">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm">
            &copy; {currentYear} Code Royale. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
