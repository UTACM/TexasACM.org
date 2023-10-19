import React from "react";

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-x-6 gap-y-2 bg-zinc-800 p-6 md:flex-row">
      <p className="text-center text-primary">
        © Association for Computing Machinery at the University of Texas at Austin 2023
      </p>
      <div className="flex flex-row gap-3 text-zinc-300">
        <a
          href="https://www.facebook.com/groups/texas.acm"
          className="relative cursor-pointer transition duration-100 ease-out active:scale-95 hover:text-accent"
          after="absolute left-0.4 right-0.4 h-2px scale-x-95 bg-accent opacity-0 transition duration-250 ease-out-expo content-empty -translate-y-0.5 -bottom-1.25"
          hover-after="opacity-100 !translate-y-0 !scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="i-fa6-brands-square-facebook block h-6 w-6"></span>
        </a>
        <a
          href="https://twitter.com/utexasACM"
          className="relative cursor-pointer transition duration-100 ease-out active:scale-95 hover:text-accent"
          after="absolute left-0.4 right-0.4 h-2px scale-x-95 bg-accent opacity-0 transition duration-250 ease-out-expo content-empty -translate-y-0.5 -bottom-1.25"
          hover-after="opacity-100 !translate-y-0 !scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="i-fa6-brands-square-x-twitter block h-6 w-6"></span>
        </a>
        <a
          href="https://github.com/UTACM"
          className="relative cursor-pointer transition duration-100 ease-out active:scale-95 hover:text-accent"
          after="absolute left-0.4 right-0.4 h-2px scale-x-95 bg-accent opacity-0 transition duration-250 ease-out-expo content-empty -translate-y-0.5 -bottom-1.25"
          hover-after="opacity-100 !translate-y-0 !scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="i-fa6-brands-github block h-5.5 w-5.5"></span>
        </a>
        <a
          href="https://discord.gg/tspJCpFFKx"
          className="relative cursor-pointer transition duration-100 ease-out active:scale-95 hover:text-accent"
          after="absolute left-0.4 right-0.4 h-2px scale-x-95 bg-accent opacity-0 transition duration-250 ease-out-expo content-empty -translate-y-0.5 -bottom-1.25"
          hover-after="opacity-100 !translate-y-0 !scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="i-fa6-brands-discord block h-6 w-6"></span>
        </a>
      </div>
    </div>
  );
}
