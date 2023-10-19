import React from "react";
import type { Metadata } from "next";

import Page from "./client";

export const metadata: Metadata = {
  title: "Home | Texas ACM",
};

export default function Home() {
  return <Page />;
}
