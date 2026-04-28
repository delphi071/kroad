import Image from "next/image";

const OVERLAY_PC =
  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), radial-gradient(ellipse 96% 54% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.66) 100%)";

const OVERLAY_MOBILE =
  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), radial-gradient(ellipse 50% 35% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.66) 100%)";

export default function Intro({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black transition-opacity duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      {/* Background image — separate asset for mobile vs desktop */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          backgroundImage: "url(/figma/intro-bg-mobile.png)",
          backgroundSize: "100% 100%",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: "url(/figma/intro-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      {/* Overlay (radial+linear) — different gradient stops per breakpoint */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ backgroundImage: OVERLAY_MOBILE }}
        aria-hidden
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ backgroundImage: OVERLAY_PC }}
        aria-hidden
      />

      {/* Mobile content — Figma values translated to % of 390×844 frame */}
      <div className="absolute inset-0 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/intro-logo-mobile.svg"
          alt="Beyond the Route"
          className="absolute block"
          style={{
            left: "7.69%",
            top: "37.56%",
            width: "80.66%",
            height: "19.83%",
          }}
        />
        <p
          className="absolute font-montserrat text-primary whitespace-nowrap"
          style={{
            left: "14.1%",
            top: "60.66%",
            fontSize: "clamp(12px, 3.87vw, 17px)",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          Korean Trails and Culture Foundation
        </p>
      </div>

      {/* Desktop content — Figma values translated to % of 1920×1080 frame */}
      <div className="absolute inset-0 hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/intro-logo.svg"
          alt="Beyond the Route"
          className="absolute block"
          style={{
            left: "28.5%",
            top: "28.6%",
            width: "39.76%",
            height: "37.75%",
          }}
        />
        <p
          className="absolute font-montserrat text-primary whitespace-nowrap"
          style={{
            left: "51.7%",
            top: "64.7%",
            fontSize: "clamp(14px, 0.96vw, 22px)",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          Korean Trails and Culture Foundation
        </p>
      </div>
    </div>
  );
}
