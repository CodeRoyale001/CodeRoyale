import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TypeAnimation } from "react-type-animation";
import { LoginPopup } from "../popups";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Safari from "../ui/safariView";
import AnimatedShinyText from "../ui/shinyText";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";


const FEATURES = [
	{
		title: "Battle Royale Contest",
		description: "Compete with 100 users in a battle royale.",
		content:
			"In our battle royale style contest, 100 users compete fiercely, and the last person standing wins. Experience an exciting and competitive environment that keeps you on your toes until the very end.",
		icon: "🏆",
	},
	{
		title: "Earn Real Rewards",
		description: "Win points that convert to real money.",
		content:
			"Winners earn points and in-game currency, which can be withdrawn as real money. Play and earn with tangible rewards, making your gaming experience not only fun but also rewarding in the real world.",
		icon: "💰",
	},
	{
		title: "Multi-Language Coding",
		description: "Code in various languages anytime.",
		content:
			"Our platform supports multiple programming languages including C++, JavaScript, Java, and Python. Start contests at any time, enjoying a flexible and versatile coding environment that suits your schedule.",
		icon: "💻",
	},
	{
		title: "Skill-Based Matchmaking",
		description: "Compete against users at your level.",
		content:
			"Our advanced matchmaking system ensures you're always competing against users of similar skill levels, providing a challenging yet fair experience for all participants.",
		icon: "🎯",
	},
];

const accordionItems = [
	{
		value: "item-1",
		question:
			"What is the Battle Royale Contest in CodeRoyale and how does it work?",
		answer: `The Battle Royale Contest is a competition where 100 users compete until one participant remains, who is declared the winner. Participants must solve increasingly difficult coding problems to stay in the game.`,
	},
	{
		value: "item-2",
		question:
			"How do I participate in a Battle Royale Contest on the platform?",
		answer: `Sign up for the event through the CodeRoyale platform. You'll be matched with 99 other participants and need to solve coding challenges to stay in the game. The contest continues until one person remains.`,
	},
	{
		value: "item-3",
		question:
			"What types of rewards can I earn in CodeRoyale competitions?",
		answer: `Winners earn points and in-game currency that can be converted into real money. There may also be special prizes or bonuses for top performers in certain contests.`,
	},
	{
		value: "item-4",
		question:
			"How can I withdraw my earnings from CodeRoyale after winning?",
		answer: `Request a withdrawal through the platform's withdrawal feature after accumulating enough points and in-game currency. The specific methods for withdrawing funds will be detailed in your account settings.`,
	},
	{
		value: "item-5",
		question:
			"What programming languages are supported in CodeRoyale contests?",
		answer: `CodeRoyale supports C++, JavaScript, Java, and Python. This allows you to choose the language you are most comfortable with for the challenges.`,
	},
	{
		value: "item-6",
		question: "Can I start a coding contest at any time on CodeRoyale?",
		answer: `Yes, you can participate in contests according to your own schedule, without being restricted to specific times.`,
	},
	{
		value: "item-7",
		question:
			"Is CodeRoyale suitable for programmers of all skill levels and backgrounds?",
		answer: `Yes, CodeRoyale caters to all skill levels, offering a range of contests and challenges that vary in difficulty, along with resources and tutorials for beginners.`,
	},
];

const lander = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	const router = useRouter();

	return (
		<div className="bg-background">
			<main className="mx-auto flex flex-col items-center justify-center p-3 md:p-14 space-y-20 max-w-7xl relative mb-10">
				{/* {top section} */}
				<section className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 text-center pt-28 w-full">
					

					<div className="text-5xl md:text-8xl min-h-[50px] lg:min-h-[128px] lg:text-9xl w-full font-semibold tracking-wide subpixel-antialiased text-primary ">
						<TypeAnimation
							wrapper="div"
							sequence={["CodeRoyale;", 1000]}
							speed={50}
							repeat={Infinity}
						/>
					</div>
					<h4 className="text-xl lg:text-4xl font-medium text-primary tracking-wider subpixel-antialiased">
						<span>forget 3hr long&nbsp;</span>
						<span className="text-foreground">
							competitive programming&nbsp;
						</span>
						<span>contest, now play&nbsp;</span>
						<span className="text-foreground">
							battle-royale&nbsp;
						</span>
						<span>styled contests and win prizes</span>
					</h4>

					{!isLoggedIn ? (
						<LoginPopup
							btnVaraint="default"
							btntext="Join the Battle -->"
							icon={false}
							classname="max-w-[300px] px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl"
						/>
					) : (
						<Button
							onClick={() => router.push("/contests")}
							className="max-w-[300px] px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl"
						>
							Join the Battle --{">"}
						</Button>
					)}
				</section>

				{/* image section */}
				<section className="w-full h-full max-w-7xl">
					<div className="w-full h-full drop-shadow-2xl">
						<Safari
							url="coderoyale.tech"
							className="size-full"
							src={"/image-cr.png"}
						/>
					</div>
				</section>

				{/* {middle section} */}
				<section className="w-full h-full mx-auto flex flex-col items-center justify-center gap-8 lg:gap-16 pt-24 p-1">
        <div
						className={cn(
							"group rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-base text-[hsl(var(--foreground))] transition-all ease-in hover:cursor-pointer hover:bg-[hsl(var(--popover)] -mb-5 lg:-mb-10"
						)}
					>
						<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-[hsl(var(--popover-foreground))] hover:duration-300">
							<span>✨ Introducing 1v1 Contest</span>
							<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</AnimatedShinyText>
					</div>
					<p className="text-center text-4xl md:text-5xl font-semibold tracking-wide subpixel-antialiased text-primary">
						Why Choose CodeRoyale?
					</p>
					<div className="grid grid-flow-col grid-rows-4 md:grid-rows-2 justify-center gap-10 p-5">
						{FEATURES.map((feature, index) => (
							<Card
								key={index}
								className="min-w-[340px] max-w-[500px] transform transition duration-300 hover:scale-105 bg-card"
							>
								<CardHeader>
									<CardTitle className="text-2xl md:text-3xl flex items-center text-primary">
										<span className="mr-2 text-3xl">
											{feature.icon}
										</span>
										{feature.title}
									</CardTitle>
									<CardDescription>
										{feature.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="font-light text-md lg:text-lg">
									{feature.content}
								</CardContent>
							</Card>

						))}
					</div>
				</section>

				{/* {bottom section} */}
				<section className="flex flex-col items-center w-full h-full p-3 gap-8">
					<p className="text-center text-4xl md:text-5xl font-semibold tracking-wide subpixel-antialiased text-primary">
						Frequently Asked Questions
					</p>
					<Accordion
						type="single"
						collapsible
						className="w-full max-w-[600px] md:max-w-[700px]"
					>
						{accordionItems.map((item) => (
							<AccordionItem key={item.value} value={item.value}>
								<AccordionTrigger className="text-base">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="md:text-base font-normal text-muted-foreground">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>
			</main>
		</div>
	);
};

export default lander;
