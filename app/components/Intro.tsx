import Image from "next/image";

const PC_OVERLAY =
  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), radial-gradient(ellipse 96% 54% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.66) 100%)";

const MOBILE_OVERLAY =
  "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), radial-gradient(ellipse 19.5% 42.2% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.66) 100%)";

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
      {/* PC layout (>=768px) */}
      <div className="hidden h-full w-full md:block">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: 1920,
            height: 1080,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          <Image
            src="/figma/intro-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: PC_OVERLAY }}
            aria-hidden
          />
          <div
            className="absolute"
            style={{
              left: 547.2,
              top: 308.99,
              width: 763.43,
              height: 407.74,
            }}
            aria-label="Beyond the Route"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/intro-logo.svg"
              alt="Beyond the Route"
              className="block h-full w-full"
            />
          </div>
          <p
            className="absolute font-montserrat text-primary whitespace-nowrap"
            style={{
              left: 993,
              top: 699,
              fontSize: 18.354,
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>
      </div>

      {/* Mobile layout (<768px) */}
      <div className="block h-full w-full md:hidden">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: 390,
            height: 844,
            transform: "scale(calc(100vw / 390px))",
          }}
        >
          <Image
            src="/figma/intro-bg-mobile.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: MOBILE_OVERLAY }}
            aria-hidden
          />
          <div
            className="absolute"
            style={{
              left: 30,
              top: 317,
              width: 314.6,
              height: 167.4,
            }}
            aria-label="Beyond the Route"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/intro-logo-mobile.svg"
              alt="Beyond the Route"
              className="block h-full w-full"
            />
          </div>
          <p
            className="absolute font-montserrat text-primary whitespace-nowrap"
            style={{
              left: 55,
              top: 512,
              fontSize: 15.112,
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
