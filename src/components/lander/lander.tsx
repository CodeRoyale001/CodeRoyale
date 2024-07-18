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

const accordionItemsOrignal = [
  {
    value: "item-1",
    question:
      "What is the Battle Royale Contest in CodeRoyale and how does it work?",
    answer: `The Battle Royale Contest is a unique and thrilling competition where 100 users compete against each other in a coding challenge. The contest continues until only one participant remains, who is declared the winner. This format provides an adrenaline-pumping experience as users strive to outlast their competitors, pushing their coding skills to the limit in a highly competitive environment. Participants must solve increasingly difficult coding problems to stay in the game and emerge victorious.`,
  },
  {
    value: "item-2",
    question:
      "How do I participate in a Battle Royale Contest on the platform?",
    answer: `To participate in a Battle Royale Contest, you need to sign up for the event through the CodeRoyale platform. Once registered, you'll be matched with 99 other participants. The contest will begin at the scheduled time, and you'll need to solve coding challenges to stay in the game. The contest continues until one person remains, so be prepared to code quickly and efficiently to outlast your competitors. Make sure to check the contest rules and guidelines before participating.`,
  },
  {
    value: "item-3",
    question: "What types of rewards can I earn in CodeRoyale competitions?",
    answer: `In CodeRoyale, winners of contests earn points and in-game currency. These points can accumulate and be converted into real money, which you can withdraw. This feature adds an extra layer of excitement to the contests, as you not only get to improve your coding skills but also have the opportunity to earn tangible rewards for your efforts. Additionally, there may be special prizes or bonuses for top performers in certain contests.`,
  },
  {
    value: "item-4",
    question: "How can I withdraw my earnings from CodeRoyale after winning?",
    answer: `Withdrawing your earnings from CodeRoyale is straightforward. After accumulating enough points and in-game currency through your participation and victories in contests, you can request a withdrawal through the platform's withdrawal feature. The specific methods for withdrawing funds will be detailed in your account settings, ensuring a smooth and secure process to convert your virtual earnings into real money. Make sure to follow all necessary steps to verify your account for secure transactions.`,
  },
  {
    value: "item-5",
    question:
      "What programming languages are supported in CodeRoyale contests?",
    answer: `CodeRoyale supports a variety of popular programming languages, including C++, JavaScript, Java, and Python. This multi-language support allows you to choose the language you are most comfortable with or the one that best suits the particular challenge you are facing. Whether you prefer object-oriented programming, scripting, or any other style, CodeRoyale has you covered. This diversity ensures that programmers from different backgrounds can participate comfortably.`,
  },
  {
    value: "item-6",
    question: "Can I start a coding contest at any time on CodeRoyale?",
    answer: `Yes, CodeRoyale offers the flexibility to start coding contests at any time. This means you can participate in contests according to your own schedule, without being restricted to specific times. Whether you are a night owl or an early bird, you can find a contest that fits your availability, allowing you to compete and improve your skills whenever it suits you best. This feature makes it convenient for users with busy or unpredictable schedules.`,
  },
  {
    value: "item-7",
    question:
      "Is CodeRoyale suitable for programmers of all skill levels and backgrounds?",
    answer: `Absolutely! CodeRoyale is designed to cater to programmers of all skill levels, from beginners to experts. The platform offers a wide range of contests and challenges that vary in difficulty, ensuring that everyone can find something appropriate for their skill level. Whether you are just starting out or have years of experience, CodeRoyale provides an engaging and rewarding environment to test and improve your coding abilities. There are also resources and tutorials available to help beginners get started.`,
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
    question: "What types of rewards can I earn in CodeRoyale competitions?",
    answer: `Winners earn points and in-game currency that can be converted into real money. There may also be special prizes or bonuses for top performers in certain contests.`,
  },
  {
    value: "item-4",
    question: "How can I withdraw my earnings from CodeRoyale after winning?",
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
    <main className="mx-auto flex flex-col items-center justify-center p-3 md:p-14 space-y-20 max-w-7xl relative mb-10 ">
      {/* {top section} */}

      <section className="flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 text-center pt-28 w-full">
        <div className="text-5xl md:text-8xl min-h-[50px] lg:min-h-[128px] lg:text-9xl w-full  font-semibold tracking-wide subpixel-antialiased   ">
          <TypeAnimation
            wrapper="div"
            sequence={["CodeRoyale;", 1000]}
            speed={50}
            repeat={Infinity}
          />{" "}
        </div>
        <h4 className="text-xl  lg:text-4xl font-medium  tracking-wider subpixel-antialiased ">
          Play to Code, Win to Rule
        </h4>
        {!isLoggedIn ? (
        <LoginPopup
          btnVaraint="default"
          btntext="Join the Battle -->"
          icon={false}
          classname="max-w-[300px] px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl"
        />) : 
        <Button onClick={() => router.push('/contests')}           className="max-w-[300px] px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl"
>Join the Battle --></Button>}
      </section>

      {/* image section */}

      <section className="w-full h-full max-w-7xl">
        <div className="aspect-[1344/676.2] w-full h-full drop-shadow-[0_35px_35px_rgba(346.8,77.2,49.8,0.20)] ">
          <img
            src={"/image-cr.png"}
            alt="image-cr"
            className="rounded-2xl border-[3px] border-black   aspect-[1344/676.2] object-cover antialiased "
          />
        </div>
      </section>

      {/* {middle section} */}
      <section className="w-full h-full mx-auto flex flex-col items-center justify-center gap-8 lg:gap-16 pt-24 p-1">
        <p className=" text-center text-4xl md:text-5xl  font-semibold subpixel-antialiased">
          Why Choose CodeRoyale?
        </p>
        <div className="grid grid-flow-col grid-rows-4 md:grid-rows-2  justify-center gap-10 p-5">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="min-w-[340px] max-w-[500px] dark:bg-zinc-900/30 transform transition duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center">
                  <span className="mr-2 text-3xl">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="font-light text-md lg:text-lg">
                {feature.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* {bottom section} */}

      <section className="flex flex-col items-center w-full h-full p-3 gap-8 ">
        <p className="text-center text-2xl md:text-4xl font-bold tracking-wide subpixel-antialiased">
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
  );
};

export default lander;
