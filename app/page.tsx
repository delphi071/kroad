import HeroCarousel from "./components/HeroCarousel";
import { Hero1, Hero2, Hero3, Hero4, Hero5, Hero6 } from "./components/Heroes";
import IntroGate from "./components/IntroGate";
import Slide from "./components/Slide";
import Subpage1 from "./components/Subpage1";
import SubpagePlaceholder from "./components/SubpagePlaceholder";

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
            <SubpagePlaceholder title="같은 길, 다른 시선" />
          </Slide>
          <Slide>
            <Hero3 />
            <SubpagePlaceholder title="우리가 걷는 길" />
          </Slide>
          <Slide>
            <Hero4 />
            <SubpagePlaceholder title="함께 걷는 사람들" />
          </Slide>
          <Slide>
            <Hero5 />
            <SubpagePlaceholder title="알리는 이야기" />
          </Slide>
          <Slide>
            <Hero6 />
            <SubpagePlaceholder title="마음잇기" />
          </Slide>
        </HeroCarousel>
      </IntroGate>
    </main>
  );
}
