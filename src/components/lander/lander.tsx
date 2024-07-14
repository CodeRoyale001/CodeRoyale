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
import { LoginPopup } from "../popups";

const lander = () => {
	return (
		<>
			<div className="m-28 pb-24">
				<div className="text-center">
					<h2 className="text-9xl w-full  font-extralight tracking-widest subpixel-antialiased text-center">
						<TypeAnimation
							sequence={["CodeRoyale ;", 1000]}
							speed={50}
							repeat={Infinity}
						/>{" "}
					</h2>
					<h4 className="text-4xl font-semibold pt-12 pb-12 tracking-wider subpixel-antialiased text-center">
						Play to Code, Win to Rule
					</h4>
					<LoginPopup btnVaraint="default"  	btntext="Compete Now -->" icon={false} classname="py-6 px-12 text-lg"  />	
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
				<p className="mx-44 my-12 text-center text-5xl font-normal tracking-wide subpixel-antialiased">
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
						<CardContent className="font-light tracking-normal">
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
						<CardContent className="font-light tracking-normal">
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
						<CardContent className="font-light tracking-normal">
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
				<p className="mx-44 my-12 text-center text-5xl font-normal tracking-wide subpixel-antialiased">
					Frequently Asked Questions
				</p>
				<Accordion type="single" collapsible className="w-[1000px]">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-2xl font-light">What is the Battle Royale Contest in CodeRoyale and how does it work?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						The Battle Royale Contest is a unique and thrilling competition where 100 users compete against each other in a coding challenge. The contest continues until only one participant remains, who is declared the winner. This format provides an adrenaline-pumping experience as users strive to outlast their competitors, pushing their coding skills to the limit in a highly competitive environment. Participants must solve increasingly difficult coding problems to stay in the game and emerge victorious.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="text-2xl font-light">How do I participate in a Battle Royale Contest on the platform?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						To participate in a Battle Royale Contest, you need to sign up for the event through the CodeRoyale platform. Once registered, you'll be matched with 99 other participants. The contest will begin at the scheduled time, and you'll need to solve coding challenges to stay in the game. The contest continues until one person remains, so be prepared to code quickly and efficiently to outlast your competitors. Make sure to check the contest rules and guidelines before participating.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="text-2xl font-light">What types of rewards can I earn in CodeRoyale competitions?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						In CodeRoyale, winners of contests earn points and in-game currency. These points can accumulate and be converted into real money, which you can withdraw. This feature adds an extra layer of excitement to the contests, as you not only get to improve your coding skills but also have the opportunity to earn tangible rewards for your efforts. Additionally, there may be special prizes or bonuses for top performers in certain contests.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger className="text-2xl font-light">How can I withdraw my earnings from CodeRoyale after winning?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						Withdrawing your earnings from CodeRoyale is straightforward. After accumulating enough points and in-game currency through your participation and victories in contests, you can request a withdrawal through the platform's withdrawal feature. The specific methods for withdrawing funds will be detailed in your account settings, ensuring a smooth and secure process to convert your virtual earnings into real money. Make sure to follow all necessary steps to verify your account for secure transactions.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5">
						<AccordionTrigger className="text-2xl font-light">What programming languages are supported in CodeRoyale contests?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						CodeRoyale supports a variety of popular programming languages, including C++, JavaScript, Java, and Python. This multi-language support allows you to choose the language you are most comfortable with or the one that best suits the particular challenge you are facing. Whether you prefer object-oriented programming, scripting, or any other style, CodeRoyale has you covered. This diversity ensures that programmers from different backgrounds can participate comfortably.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-6">
						<AccordionTrigger className="text-2xl font-light">Can I start a coding contest at any time on CodeRoyale?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						Yes, CodeRoyale offers the flexibility to start coding contests at any time. This means you can participate in contests according to your own schedule, without being restricted to specific times. Whether you are a night owl or an early bird, you can find a contest that fits your availability, allowing you to compete and improve your skills whenever it suits you best. This feature makes it convenient for users with busy or unpredictable schedules.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-7">
						<AccordionTrigger className="text-2xl font-light">Is CodeRoyale suitable for programmers of all skill levels and backgrounds?</AccordionTrigger>
						<AccordionContent className="text-lg font-light	text-muted-foreground">
						Absolutely! CodeRoyale is designed to cater to programmers of all skill levels, from beginners to experts. The platform offers a wide range of contests and challenges that vary in difficulty, ensuring that everyone can find something appropriate for their skill level. Whether you are just starting out or have years of experience, CodeRoyale provides an engaging and rewarding environment to test and improve your coding abilities. There are also resources and tutorials available to help beginners get started.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};

export default lander;
