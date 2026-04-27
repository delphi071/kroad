"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";

export default function IntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Intro visible={introVisible} />
      {children}
    </>
  );
}
