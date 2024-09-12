"use client";

import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Contests() {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);
	const router = useRouter();


    return (
        <>
            {isLoggedIn ? (
                <>
                    <Navbar />
                    <div className="flex flex-row items-center justify-center min-h-[calc(100vh-200px)] space-x-20">
                        {/* 1v1 Contest Card */}
                        <Card className="w-[450px]">
                            <CardHeader className="space-y-4">
                                <CardTitle className="text-2xl">1v1 Contest</CardTitle>
                                <CardDescription className="text-lg md:text-xl">
								Face off in a thrilling head-to-head challenge Prove your speed and skill as this contest waits for no one</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 text-md md:text-lg font-light">
							This is a 15-minute intense battle designed to test your speed and precision. Quick thinking and rapid execution are key.                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={() => router.push('/1v1')}  className="w-full px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl">Play 1v1  --{">"}</Button>
                            </CardFooter>
                        </Card>

                        {/* BattleRoyale Contest Card */}
                        <Card className="w-[450px]">
                            <CardHeader className="space-y-4">
                                <CardTitle className="text-2xl">BattleRoyale Contest</CardTitle>
                                <CardDescription className="text-lg md:text-xl">
								Compete against many in an intense battle Outlast everyone and rise to the top only the fastest will succeed
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 text-md md:text-lg font-light">
							Prepare for a 1-hour showdown where endurance and strategy matter most. Survive the challenges and outlast every opponent.                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={() => router.push('/battle')}className="w-full px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl">Join BattleRoyale --{">"}</Button>
                            </CardFooter>
                        </Card>
						{/* ICPC Contest Card */}
                        <Card className="w-[450px]">
                            <CardHeader className="space-y-4">
                                <CardTitle className="text-2xl">ICPC-Styled Contest</CardTitle>
                                <CardDescription className="text-lg md:text-xl">
								A competitive contest inspired by ICPC. Showcase your coding prowess against top minds in a challenging environment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 text-md md:text-lg font-light">
							A 3-hour rigorous contest featuring multiple problems of varying difficulty. Deep problem-solving skills will lead to victory.                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={() => router.push('/icpc')}className="w-full px-10 py-5 md:py-6 text-lg/3 mt-5 md:text-xl">Apply for ICPC --{">"}</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <LoginWarnPopup isLoggedIn={isLoggedIn} />
                </>
            )}
        </>
    );
}
