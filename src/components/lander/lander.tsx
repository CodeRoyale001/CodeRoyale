import React from "react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const lander = () => {
	return (
		<>
			<div className="m-28 pb-24">
				<div className="text-center">
					<h2 className="text-9xl w-full font-Consolas font-extralight tracking-widest subpixel-antialiased text-center">
						<TypeAnimation
							sequence={["CodeRoyale ;", 1000]}
							speed={50}
							repeat={Infinity}
						/>{" "}
					</h2>
					<h4 className="text-4xl font-semibold pt-12 pb-12 tracking-wider subpixel-antialiased text-center">
						Play to Code, Win to Rule
					</h4>
					<Button className="py-6 px-12 text-lg">
						Compete Now --&gt;
					</Button>
				</div>
				<div className="flex justify-center p-16 border-xl drop-shadow-[0_35px_35px_rgba(346.8,77.2,49.8,0.20)]">
					<div
						style={{
							width: "1344px",
							height: "676.2px",
							backgroundImage: "url(/image-cr.png)",
							backgroundSize: "cover",
							backgroundPosition: "center",
							borderRadius: "2em",
							filter: "blur(0.75px)",
							border: "3px solid hsl(20, 14.3%, 4.1%)",
						}}
					></div>
				</div>
			</div>
			<div className="pb-24">
				<p className="mx-44 my-12 text-center text-4xl font-semibold tracking-wide subpixel-antialiased">
					Features of CodeRoyale
				</p>
				<div className="flex justify-center gap-10">
					<Card className="w-[400px]">
						<CardHeader>
							<CardTitle className="text-3xl">
								Battle Royale Contest
							</CardTitle>
							<CardDescription>
								Compete with 100 users in a battle royale.
							</CardDescription>
						</CardHeader>
						<CardContent>
							In our battle royale style contest, 100 users
							compete fiercely, and the last person standing wins.
							Experience an exciting and competitive environment
							that keeps you on your toes until the very end.
						</CardContent>
					</Card>
					<Card className="w-[400px]">
						<CardHeader>
							<CardTitle className="text-3xl">
								Earn Real Rewards
							</CardTitle>
							<CardDescription>
								Win points that convert to real money.
							</CardDescription>
						</CardHeader>
						<CardContent>
							Winners earn points and in-game currency, which can
							be withdrawn as real money. Play and earn with
							tangible rewards, making your gaming experience not
							only fun but also rewarding in the real world.
						</CardContent>
					</Card>
					<Card className="w-[400px]">
						<CardHeader>
							<CardTitle className="text-3xl">
								Multi-Language Coding
							</CardTitle>
							<CardDescription>
								Code in various languages anytime.
							</CardDescription>
						</CardHeader>
						<CardContent>
							Our platform supports multiple programming languages
							including C++, JavaScript, Java, and Python. Start
							contests at any time, enjoying a flexible and
							versatile coding environment that suits your
							schedule.
						</CardContent>
					</Card>
				</div>
			</div>
			<div className="flex flex-col items-center pb-24">
				<p className="mx-44 my-12 text-center text-4xl font-semibold tracking-wide subpixel-antialiased">
					Frequently Asked Questions
				</p>
				<Accordion type="single" collapsible className="w-[1000px]">
					<AccordionItem value="item-1">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>
							Yes. It adheres to the WAI-ARIA design pattern.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>
							Yes. It comes with default styles that matches the
							other components&apos; aesthetic.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-6">
						<AccordionTrigger>Is it animated?</AccordionTrigger>
						<AccordionContent>
							Yes. It's animated by default, but you can disable
							it if you prefer.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};

export default lander;
