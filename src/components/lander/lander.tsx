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
import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
	Trophy,
	DollarSign,
	Code,
	Target,
	Users,
	Zap,
	Clock,
	Gamepad2,
} from "lucide-react";

const FEATURES = [
	{
		title: "Battle Royale Contest",
		description: "Compete with 100 users in a battle royale.",
		content:
			"In our battle royale style contest, 100 users compete fiercely, and the last person standing wins. Experience an exciting and competitive environment that keeps you on your toes until the very end.",
		icon: Trophy,
	},
	{
		title: "Earn Real Rewards",
		description: "Win points that convert to real money.",
		content:
			"Winners earn points and in-game currency, which can be withdrawn as real money. Play and earn with tangible rewards, making your gaming experience not only fun but also rewarding in the real world.",
		icon: DollarSign,
	},
	{
		title: "Multi-Language Coding",
		description: "Code in various languages anytime.",
		content:
			"Our platform supports multiple programming languages including C++, JavaScript, Java, and Python. Start contests at any time, enjoying a flexible and versatile coding environment that suits your schedule.",
		icon: Code,
	},
	{
		title: "Skill-Based Matchmaking",
		description: "Compete against users at your level.",
		content:
			"Our advanced matchmaking system ensures you're always competing against users of similar skill levels, providing a challenging yet fair experience for all participants.",
		icon: Target,
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
			<main className="mx-auto flex flex-col items-center justify-center p-3 md:p-14 space-y-16 max-w-7xl relative mb-10">
				{/* {top section} */}
				<section className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 text-center pt-12 w-full">
					<div className="text-5xl md:text-8xl min-h-[50px] lg:min-h-[128px] lg:text-9xl w-full font-semibold tracking-wide subpixel-antialiased text-primary ">
						<TypeAnimation
							wrapper="div"
							sequence={["CodeRoyale;", 1000]}
							speed={50}
							repeat={Infinity}
						/>
					</div>
					<h4 className="text-lg md:text-2xl lg:text-4xl font-medium text-primary tracking-wider subpixel-antialiased">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
							<LoginPopup
								btnVaraint="default"
								btntext="Join the Battle"
								icon2={true}
								icon={false}
								classname="w-full px-10 py-4 md:py-6 text-lg/3 mt md:text-xl"
							/>
							<Button
								variant="outline"
								className="w-full px-10 py-4 md:py-6 text-lg/3 mt md:text-xl"
								onClick={() => router.push("/about")}
							>
								Learn More{" "}
								<ChevronRightIcon className="ml-2 h-5 w-5" />
							</Button>
						</div>
					) : (
						<Button
							onClick={() => router.push("/contests")}
							className=" w-full md:max-w-[350px] px-10 py-4 md:py-6 text-lg/3 mt md:text-xl"
						>
							 <Gamepad2 className="mr-2 h-5 w-5" /> Start Competing Now<ChevronRightIcon className="ml-2 h-5 w-5" />
						</Button>
					)}
				</section>

				<section className="w-full py-12 rounded-lg bg-card">
					<div className="container mx-auto text-center">
						<h3 className="text-2xl md:text-3xl font-semibold mb-8 text-primary">
							Empowering Programmers Worldwide
						</h3>
						<div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
							<div className="flex flex-col items-center">
								<Users className="w-12 h-12 mb-3 text-primary" />
								<p className="text-3xl md:text-4xl font-bold mb-1">
									10,000+
								</p>
								<p className="text-sm md:text-base text-muted-foreground">
									Active Users
								</p>
							</div>
							<div className="flex flex-col items-center">
								<Zap className="w-12 h-12 mb-3 text-primary" />
								<p className="text-3xl md:text-4xl font-bold mb-1">
									50,000+
								</p>
								<p className="text-sm md:text-base text-muted-foreground">
									Contests Completed
								</p>
							</div>
							<div className="flex flex-col items-center">
								<Clock className="w-12 h-12 mb-3 text-primary" />
								<p className="text-3xl md:text-4xl font-bold mb-1">
									1M+
								</p>
								<p className="text-sm md:text-base text-muted-foreground">
									Coding Hours
								</p>
							</div>
						</div>
					</div>
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
										<feature.icon className="w-8 h-8 mr-3 text-primary" />
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

				{/* {faq section} */}
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

				{/* {bottom cta section} */}
				<section className="w-full bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 md:p-12">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
							Ready to Elevate Your Coding Skills?
						</h2>
						<p className="text-base sm:text-lg md:text-xl mb-8">
							Join CodeRoyale today and start your journey to
							becoming a coding champion!
						</p>
						<Button
							size="lg"
							className="bg-background text-foreground hover:bg-background/90 text-lg sm:text-xl font-semibold px-6 py-4"
							onClick={() =>
								!isLoggedIn
									? router.push("/signup")
									: router.push("/contests")
							}
						>
							{isLoggedIn
								? "Battle Now"
								: "Sign Up for Free"}
								<ChevronRightIcon className="ml-2 h-5 w-5" />
						</Button>
					</div>
				</section>
			</main>
		</div>
	);
};

export default lander;
