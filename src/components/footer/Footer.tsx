import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
	return (
		<footer className="position-fixed bottom-0 w-full h-25 p-5">
			<div className="emoji flex justify-center  items-center">
				<div className="flex-shrink-0 w-100 mx-auto text-center md:mx-0 md:text-left ">
					<p className="leading-7 [&:not(:first-child)]:mt-6 w-full pb-5">
						Intrested to work as a problem setter ?{" "}
						<Link className="underline" href={"/"}>
							Apply here
						</Link>
					</p>
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight  flex justify-center  items-center">
						Keep in Touch
					</h3>
					<div className="flex  mt-4 space-x-4 lg:mt-2">
						<div className="flex w-full gap-20 p-5">
							<Link href={""}>
								<Facebook className="text-blue-500" />
							</Link>
							<Link href={""}>
								<Twitter className="text-sky-300" />
							</Link>
							<Link href={""}>
								<Instagram className="text-pink-500" />
							</Link>
							<Link href={""}>
								<Linkedin className="text-blue-400" />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div
				className="
        container
        flex flex-col flex-wrap
        px-4
        py-5
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
			>
				<div className="justify-between w-full mt-4 text-center lg:flex ">
					<div className="w-full px-4 lg:w-1/3 md:w-1/2">
						<div className="w-3/4 mx-auto">
							<h3 className="mb-2 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
								Company
							</h3>
						</div>
						<ul className="mb-8 space-y-2 text-sm list-none">
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>About Us</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Blogs</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Work with us</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Careers</p>
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full px-4 lg:w-1/3 md:w-1/2">
						<div className="w-3/4 mx-auto">
							<h3 className="mb-2 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
								Courses
							</h3>
						</div>
						<ul className="mb-8 space-y-2 text-sm list-none">
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Advanced DSA in Java</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Devops</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Java Backend Development</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Javascript Developer</p>
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-full px-4 lg:w-1/3 md:w-1/2 justify-end">
						<div className="w-3/4 mx-auto">
							<h3 className="mb-2 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 ">
								Pages
							</h3>
						</div>
						<ul className="mb-8 space-y-2 text-sm list-none">
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Contests</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Leaderboard</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Practice</p>
								</Link>
							</li>
							<li className="hover:font-bold">
								<Link href={"/"} className="">
									<p>Profile</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="flex justify-center -mt-10">
				<p className="text-center  pb-2 text-lg font-semibold">
					@2024 All rights reserved by Code Royale.
				</p>
			</div>
		</footer>
	);
}
