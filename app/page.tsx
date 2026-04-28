import HeroCarousel from "./components/HeroCarousel";
import { Hero1, Hero2, Hero3, Hero4, Hero5, Hero6 } from "./components/Heroes";
import IntroGate from "./components/IntroGate";
import Slide from "./components/Slide";
import Subpage1 from "./components/Subpage1";
import Subpage2 from "./components/Subpage2";
import Subpage3 from "./components/Subpage3";
import Subpage4 from "./components/Subpage4";
import Subpage5 from "./components/Subpage5";
import Subpage6 from "./components/Subpage6";

export default function Home() {
  return (
    <main>
      <IntroGate>
        <HeroCarousel>
          <Slide>
            <Hero1 />
            <Subpage1 />
          </Slide>
          <Slide>
            <Hero2 />
            <Subpage2 />
          </Slide>
          <Slide>
            <Hero3 />
            <Subpage3 />
          </Slide>
          <Slide>
            <Hero4 />
            <Subpage4 />
          </Slide>
          <Slide>
            <Hero5 />
            <Subpage5 />
          </Slide>
          <Slide>
            <Hero6 />
            <Subpage6 />
          </Slide>
        </HeroCarousel>
      </IntroGate>
    </main>
  );
}
