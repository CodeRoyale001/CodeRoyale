import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "CodeRoyale - Coding Contests",
  description = "Join the battle-royale styled coding contests and compete to win amazing prizes. Forget the traditional 3-hour long contests; it's time for something more intense!",
  image = "/coderoyale-thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "CodeRoyale - Battle Royale Coding Contests",
        },
      ],
      siteName: "CodeRoyale",
      type: "website",
    },
    icons,
    metadataBase: new URL("https://coderoyale.tech/"),
    alternates: {
      canonical: "https://coderoyale.vercel.app/",
    },
    keywords: [
      "coding contest",
      "battle royale",
      "competitive programming",
      "coding challenge",
      "programming competition",
      "win prizes",
      "developer contest",
      "1v1 coding",
      "competitive programmers",
      "dsa",
      "algorithms",
      "data structures"
    ],
    authors: [{ name: "CodeRoyale" }],
    category: "Technology",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}