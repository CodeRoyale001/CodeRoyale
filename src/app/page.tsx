"use client";
import Lander from "@/components/lander";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Navbar />
      <Lander />
      <Footer />
    </>
  );
}
