import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const lander = () => {
  const txt = "(#)";
  return (
    <>
      <div className="grid grid-cols-2 gap-52 p-44 h-full ">
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">
            Lorem ipsum dolor sit amet,
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
          </h4>
          <Button className="my-5 bg-black">Login/SignUp</Button>
          <p className="leading-7 pt-5">
            Know more{" "}
            <Link href="/about" className="underline">
              About us .
            </Link>
          </p>
        </div>
        <div className="animate-bounce  text-red-500 scroll-m-20 text-9xl font-extrabold tracking-tight ">
          {txt}
        </div>
      </div>
      {/* <div className="text-center text-2xl font-semibold bg-primary h-15 p-5 marquee">
            <span>Upto 40% off on Certification Courses</span>
        </div> */}

    </>
  );
};

export default lander;
