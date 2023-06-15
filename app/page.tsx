"use client";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { cn, modifyDrawerState } from "@/utils/functions";
import { useState } from "react";
import { ChevronUp } from "react-feather";
import Lottie from "react-lottie";
import spinningCan from "@/public/lotties/spinning-can.json";
import revolvingBeer from "@/public/lotties/beer-revolve.json";
import scrollDown from "@/public/lotties/scroll-down.json";
import { useRouter } from "next/navigation";
import { About, Developer } from "@/containers/Home";

export default function Home() {
  const [drawers, setDrawers] = useState<boolean[]>([
    true,
    false,
    false,
  ] as boolean[]);
  const router = useRouter();

  const toggleDrawer = (index: number) => {
    const newDrawerState = modifyDrawerState(drawers, index);
    setDrawers([...newDrawerState]);
  };

  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultOptions = (animationData: any) => ({
    loop: true,
    autoplay: true,
    isClickToPauseDisabled: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  const scrollToNextSection = (multiplier = 1) => {
    window.scrollTo({
      top: window.innerHeight * multiplier + 40,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-amber-600 min-h-screen lg:h-screen lg:px-32">
      <div
        className={cn(
          "hidden lg:flex absolute h-full transition-all duration-500 ease-in-out items-center shrink-0 top-0 left-0"
        )}
        onClick={() => {
          toggleDrawer(0);
        }}
      >
        <div className="font-bold w-32 p-4 cursor-pointer text-white">
          <div className="-rotate-90">Alemanac</div>
        </div>
      </div>
      <div className="h-full flex flex-col lg:flex-row lg:items-center ">
        <section className="mx-auto max-w-[640px] h-screen lg:h-auto lg:max-w-max lg:mx-0 relative">
          <div className="h-full flex flex-col">
            <div className="lg:max-w-[640px] p-4">
              <Logo
                className="text-center lg:text-left py-6 lg:py-0"
                inverted
                size="lg"
              />
              <hr className="border-b-2 border-white w-14 my-4 hidden lg:block" />
              <p className="text-white mb-4 text-sm lg:text-base py-10 lg:py-0 text-center lg:text-left">
                Welcome to Alemanac! Quench your thirst for knowledge while you
                sip your favorite brew with our one-of-a-kind web app, where the
                spirit of craft beer and the power of knowledge merge in an
                engaging experience.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  className="py-2 px-3 text-lg"
                  onClick={() => router.push("/auth")}
                >
                  Start exploring
                </Button>
              </div>
            </div>
            <div className="mt-24 lg:hidden mb-6 flex justify-center w-full">
              <div onClick={() => scrollToNextSection(1)}>
                <Lottie
                  options={defaultOptions(scrollDown)}
                  height={50}
                  width={50}
                  isPaused={false}
                  isClickToPauseDisabled
                />
              </div>
            </div>
          </div>
        </section>
        <div className="lg:hidden h-screen bg-amber-500 mt-10" id="about">
          <section className="mx-auto max-w-[640px] p-4">
            <div className="text-gray-800 py-6">
              <p className="text-2xl font-bold mb-10">About Alemanac</p>
              <About />
              <div
                className="w-32 relative mx-auto"
                onClick={() => scrollToNextSection(2)}
              >
                <Lottie
                  options={defaultOptions(revolvingBeer)}
                  height={128}
                  width={128}
                  isPaused={false}
                  isClickToPauseDisabled
                />
              </div>
            </div>
          </section>
        </div>
        <div className="lg:hidden bg-amber-400" id="developer">
          <section className="mx-auto max-w-[640px] p-4">
            <div className="text-gray-800 py-6">
              <p className="text-2xl font-bold mb-10">Developer</p>
              <Developer />
              <div
                className="w-32 relative mx-auto"
                onClick={() => scrollToNextSection(3)}
              >
                <Lottie
                  options={defaultOptions(spinningCan)}
                  height={128}
                  width={128}
                  isPaused={false}
                  isClickToPauseDisabled
                />
              </div>
              <button
                className="py-2 text-center flex flex-col items-center mx-auto"
                onClick={scrollToTopSmooth}
              >
                <ChevronUp />
                Back to top
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="hidden lg:block">
        <div
          className={cn(
            "absolute h-full bg-amber-500 transition-all duration-500 ease-in-out flex items-center shrink-0 top-0 right-0 shadow-lg overflow-hidden z-10 ",
            drawers[1] && "w-[calc(100vw-128px)]",
            !drawers[1] && "w-64"
          )}
        >
          <div
            className="font-bold w-32 p-4 cursor-pointer text-white shrink-0 h-full flex items-center justify-center"
            onClick={() => {
              toggleDrawer(1);
            }}
          >
            <div className="-rotate-90 text-center">About</div>
          </div>
          <div className="min-w-[500px] max-w-[500px]">
            <About />
          </div>
        </div>
        <div
          className={cn(
            "absolute h-full bg-amber-400 transition-all duration-500 ease-in-out flex items-center shrink-0 top-0 right-0 shadow-lg overflow-hidden z-20",
            drawers[2] && "w-[calc(100vw-256px)]",
            !drawers[2] && "w-32"
          )}
        >
          <div
            className="font-bold w-32 p-4 cursor-pointer text-white shrink-0 h-full flex items-center justify-center"
            onClick={() => {
              toggleDrawer(2);
            }}
          >
            <div className="-rotate-90 text-center">Developer</div>
          </div>
          <div className="min-w-[700px] max-w-[700px]">
            <Developer />
          </div>
        </div>
      </div>
    </main>
  );
}
