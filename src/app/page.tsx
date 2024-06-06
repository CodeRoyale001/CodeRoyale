"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen flex flex-col">
				<div className="flex-1">
					{/* Your page content goes here */}
					hi
				</div>
			</div>

			<Footer />
		</>
	);
}
