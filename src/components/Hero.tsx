import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto">
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] tracking-tight">
            CRUD Application with Next.js 15 and Prisma
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">
            Build a full-featured CRUD application using the latest Next.js 15
            features and Prisma ORM for seamless database management. Made by
            Zoel Villar.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="relative w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-screen rounded-xl lg:rounded-none overflow-hidden">
          <Image
            src="/imghero.png"
            alt="Hero image"
            fill
            className="object-cover"
            sizes="(min-width:1024px) 1000px, 100vw"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
