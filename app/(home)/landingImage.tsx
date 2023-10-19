"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import landingImg from "@/assets/images/LandingMinimal.gif";
import type { MotionValue } from "framer-motion";
import { LazyMotion, domAnimation, m, useScroll, useSpring, useTransform } from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const MotionImage = m(Image);

export default function HomeLandingImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => scrollY.on("change", (v) => console.log(v)));

  const y = useTransform(scrollYProgress, [0, 1], [400, -400], {
    clamp: false,
  });

  return (
    <div
      className="backface-hidden h-[calc(100vh-3.625rem)]"
      ref={ref}
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          style={{
            transformOrigin: "top center",
            position: useTransform(scrollY, (v) => (v > 0 || isSafari ? "fixed" : "absolute")),
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            opacity: {
              duration: 0.9,
              ease: "easeOut",
            },
            duration: 1,
            ease: [0.11, 0.37, 0.05, 1],
          }}
          className="backface-hidden top-0 h-full w-full"
        >
          <MotionImage
            style={{ y, transformOrigin: "center center" }}
            initial={{
              rotateX: -45,
              scale: 0.96,
            }}
            animate={{
              rotateX: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.11, 0.37, 0.05, 1],
              scale: {
                duration: 1,
                ease: [0.11, 0.37, 0.02, 1],
              },
            }}
            className="h-full w-full object-cover"
            src={landingImg}
            width="0"
            height="0"
            sizes="100vw"
            alt="ACM: Texas Association of Computing Machinery"
            priority
          ></MotionImage>
          {/* <m.img
            style={{ y }}
            src={landingImg.src}
            className="h-full w-full object-cover"
            alt="ACM: Texas Association of Computing Machinery"
          /> */}
          {/* <m.div style={{ y }} className="h-15 w-15 rounded-xl bg-red-600"></m.div> */}
        </m.div>
        {/* <m.div style={{ y }} className="h-15 w-15 rounded-xl bg-red-600"></m.div> */}
      </LazyMotion>
    </div>
  );
}
