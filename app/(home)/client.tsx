"use client";

import React from "react";
import HomeLandingImage from "./landingImage";

import mailImg from "@/assets/images/mail.png";
import memberImg from "@/assets/images/becomeMember.png";
import calendarImg from "@/assets/images/ACM_Calander.png";
import Link from "next/link";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";

const MotionImage = m(Image);

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <HomeLandingImage />
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-flow-row place-items-center gap-y-2 px-6 py-10 text-center container md:grid-flow-col md:grid-rows-[repeat(4,auto)]">
          <h2 className="overflow-y-hidden text-xl font-bold text-zinc-900">
            <m.span
              className="inline-block"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -20px 0px" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0 }}
            >
              Become a Member
            </m.span>
          </h2>
          <m.p
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            Sign up below and make sure to stop by the{" "}
            <Link className="link" href="/about#office-info">
              office
            </Link>{" "}
            to say hello!
          </m.p>
          <m.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            href="https://bit.ly/join-22-23"
            className="w-fit cursor-pointer rounded-md bg-primary px-3 py-2 text-center text-zinc-50 transition-transform duration-100 ease-in-out-expo active:scale-95 hover:text-white focusable"
          >
            Sign Up
          </m.a>
          <MotionImage
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -30px 0px" }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.2,
              opacity: {
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2,
              },
            }}
            src={memberImg}
            alt="become member"
            className="grid-self-start"
          ></MotionImage>
          <h2 className="mb-2 mt-12 overflow-y-hidden text-xl font-bold text-zinc-900 md:mt-0">
            <m.span
              className="inline-block"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "0px 0px -20px 0px" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.05 }}
            >
              Subscribe to our mailing list!
            </m.span>
          </h2>
          <m.form
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            className="max-w-sm w-full"
            id="mailingListForm"
            action="https://texasacm.us11.list-manage.com/subscribe/post?u=79fed73196d8c1087cd42c541&id=88d0a26018"
            method="post"
            target="_blank"
          >
            <input
              type="email"
              className="w-full border-1 border-zinc-400 rounded-md px-3 py-1.5 text-base shadow-sm focusable"
              placeholder="Email Address"
              required
              name="EMAIL"
            />
          </m.form>
          <m.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const formRef = document.querySelector("#mailingListForm") as HTMLFormElement;
              const isValid = formRef.reportValidity();

              if (isValid) formRef.submit();
            }}
            className="w-fit cursor-pointer rounded-md bg-primary px-3 py-2 text-center text-zinc-50 transition-transform duration-100 ease-in-out-expo active:scale-95 hover:text-white focusable"
          >
            Subscribe
          </m.button>
          <MotionImage
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -30px 0px" }}
            transition={{
              duration: 1.5,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.25,
              opacity: {
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.25,
              },
            }}
            src={mailImg}
            alt="mail"
            className="mt-10"
          ></MotionImage>
        </div>
      </div>
    </LazyMotion>
  );
}
