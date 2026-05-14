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
          backgroundImage: "url(/figma/intro-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "35% bottom",
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

      {/* Mobile content — logo + caption stacked so the caption always sits
          directly below the logo regardless of viewport aspect ratio */}
      <div className="absolute inset-0 lg:hidden">
        <div
          className="absolute flex flex-col items-center"
          style={{ left: "7.69%", top: "37.56%", width: "80.66%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/intro-logo-mobile.svg"
            alt="Beyond the Route"
            className="block w-full"
            style={{ aspectRatio: "314.557 / 167.475" }}
          />
          <p
            className="font-montserrat text-primary whitespace-nowrap"
            style={{
              marginTop: "clamp(8px, 3vw, 22px)",
              fontSize: "clamp(12px, 3.87vw, 17px)",
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>
      </div>

      {/* Desktop content — logo + caption stacked so the caption always sits
          directly below the logo regardless of viewport aspect ratio */}
      <div className="absolute inset-0 hidden lg:block">
        <div
          className="absolute flex flex-col items-center"
          style={{ left: "28.5%", top: "28.6%", width: "39.76%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/intro-logo.svg"
            alt="Beyond the Route"
            className="block w-full"
            style={{ aspectRatio: "764.069 / 406.801" }}
          />
          <p
            className="font-montserrat text-primary whitespace-nowrap"
            style={{
              marginTop: "clamp(12px, 1.4vw, 32px)",
              fontSize: "clamp(14px, 0.96vw, 22px)",
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>
      </div>
    </div>
  );
}
