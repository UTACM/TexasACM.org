"use client";

import React, { forwardRef } from "react";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import type { Variants } from "framer-motion";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import logoImg from "@/app/icon.svg";

interface LinkData {
  href: string;
  label: string;
  children?: LinkData[];
}

const links: LinkData[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/AtoZ", label: "AtoZ's" },
  { href: "/calendar", label: "Calendar" },
  { href: "/sponsorship", label: "Sponsorship" },
  {
    href: "/forms",
    label: "Forms",
    children: [
      {
        href: "/forms/signin",
        label: "Sign In",
      },
      {
        href: "/forms/join",
        label: "Join ACM",
      },
    ],
  },
];

const linkItemVariants: Variants = {
  hide: { y: -10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.19, 1, 0.22, 1], duration: 1 } },
};

function ActiveLink(props: React.ComponentPropsWithoutRef<typeof Link> & { activeClass?: string }) {
  const { activeClass, className, ...rest } = props;
  const pathname = usePathname();

  return (
    <Link
      {...rest}
      className={clsx(
        "transition duration-100",
        className,
        activeClass && {
          [activeClass]: pathname === props.href,
        },
      )}
    />
  );
}

const HeadlessLink = forwardRef(function HeadlessLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
  ref: React.Ref<HTMLAnchorElement>,
) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href} legacyBehavior passHref>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

export default function Header() {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation} strict>
      <header className="fixed left-0 right-0 top-0 z-2 h-14.5 flex flex-row items-center bg-zinc-800 px-5 text-neutral-200">
        <h1 className="flex-grow font-bold">
          <ActiveLink href="/" className="flex flex-row items-center gap-3 w-fit">
            <Image src={logoImg as StaticImageData} alt="ACM Logo" width={35} height={35} priority />
            <span>
              Association for Computing Machinery <span className="italic text-primary">at UT Austin</span>
            </span>
          </ActiveLink>
        </h1>
        <m.nav
          className="flex gap-6 text-zinc-300"
          animate="show"
          initial="hide"
          transition={{ staggerChildren: -0.03, delayChildren: 0.25 }}
        >
          {links.map(({ href, label, children }) =>
            children ? (
              <Menu key={href} as="div" className="inline-block text-left">
                <Menu.Button
                  className="group/menu"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {({ open }) => (
                    <m.a
                      className={clsx(
                        "w-full h-full flex items-center transition-colors duration-100 hover:text-white",
                        {
                          "!text-primary": pathname.startsWith(href),
                          "text-zinc-50": open,
                        },
                      )}
                      variants={linkItemVariants}
                    >
                      <m.span
                        animate={{
                          rotate: open ? 90 : 0,
                          scale: 1.5,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: [0.41, 0, 0, 1],
                        }}
                        className={clsx(
                          "i-heroicons-chevron-right-20-solid mr-1 h-4 w-4 transition-opacity duration-225 opacity-60",
                          {
                            "!opacity-85": open,
                          },
                        )}
                      />
                      {label}
                    </m.a>
                  )}
                </Menu.Button>
                <Transition
                  className="origin-top transition"
                  enter="ease-in-out-expo duration-200"
                  enterFrom="opacity-0 transform -translate-y-2 scale-[0.97]"
                  enterTo="opacity-100 transform translate-y-0"
                  leave="ease-in duration-75"
                  leaveFrom="opacity-100 transform translate-y-0"
                  leaveTo="opacity-0 transform scale-[0.97]"
                >
                  <Menu.Items className="absolute mt-2 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 -right-2 divide-y divide-gray-100 focus:outline-none">
                    <div className="p-1">
                      {children.map(({ href, label }) => (
                        <Menu.Item key={href}>
                          {({ active }) => (
                            <HeadlessLink
                              href={href}
                              className={clsx("flex w-full items-center rounded-md px-2 py-2 text-sm text-zinc-800", {
                                "relative before:w-1 before:top-1 before:-left-0 before:rounded-md text-primary before:bottom-1 before:absolute before:bg-primary":
                                  pathname === href,
                                "bg-primary !text-white": active,
                              })}
                            >
                              {label}
                            </HeadlessLink>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <ActiveLink href={href} key={href} legacyBehavior passHref>
                <m.a
                  className={clsx("transition-colors duration-100 hover:text-white", {
                    "text-primary!": pathname === href,
                  })}
                  variants={linkItemVariants}
                >
                  {label}
                </m.a>
              </ActiveLink>
            ),
          )}
        </m.nav>
      </header>
    </LazyMotion>
  );
}
