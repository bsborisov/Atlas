"use client";

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"
import Image from "next/image"
import { Stats } from "./Stats";


const redirectToLogin = async () => {
    console.log("Login")
}

export const MainHero = () => {
    return (
        <div className="ai-gradient-bg">
            <div className="flex flex-col justify-center home-hero-bottom-gradient-bg">
                <article className="md:py-0 md:px-6 lg:px-10">
                    <div className="mx-auto xl:w-310">
                        <div className="flex flex-col items-center justify-center text-center gap-6 md:py-8">
                            <div className="flex flex-col items-center justify-center gap-6 mbe-4 md:mbe-8 xl:mbe-20">
                                <div className="flex flex-col items-center justify-center text-center gap-6 max-w-133">
                                    <Image
                                        className="mbs-12 mbe-4 mx-auto max-w-55 invert"
                                        src="/next.svg"
                                        alt="Next.js logo"
                                        width={220}
                                        height={44}
                                        priority
                                    />
                                    <Heading size={4} className="shadow-base font-mont text-zinc-50">
                                        App Router Demo Example
                                    </Heading>
                                    <Heading size={6} className="shadow-base font-mont text-subtitle mbe-2">
                                        This is small system to demonstrate the basics of my knowledge. 
                                        In this project I used: React, Nextjs, Tailwind, Lucide, Xstate, prisma, Zod and more...
                                    </Heading>
                                    <Button
                                        size="lg"
                                        onClick={redirectToLogin}
                                    >
                                        Start now!
                                    </Button>
                                </div>
                            </div>
                            <Stats />
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}