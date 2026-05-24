import Header            from "@/components/layout/Header";
import Footer            from "@/components/layout/Footer";
import Hero              from "@/components/sections/Hero";
import Experience        from "@/components/sections/Experience";
import NoWifiSection     from "@/components/sections/NoWifiSection";
import FeaturedGames     from "@/components/sections/FeaturedGames";
import ChooseYourMind    from "@/components/sections/ChooseYourMind";
import WhyPeopleComeBack from "@/components/sections/WhyPeopleComeBack";
import Gallery           from "@/components/sections/Gallery";
import DoodleDivider     from "@/components/ui/DoodleDivider";

export default function Home() {
  return (
    <main>
      <Header />

      <Hero id="home" />
      <DoodleDivider className="px-6" />

      <Experience />
      <DoodleDivider className="px-6" flip />

      <NoWifiSection />
      <DoodleDivider className="px-6" />

      <FeaturedGames />
      <DoodleDivider className="px-6" flip />

      <ChooseYourMind />
      <DoodleDivider className="px-6" />

      <WhyPeopleComeBack />
      <DoodleDivider className="px-6" flip />

      <Gallery />

      <Footer />
    </main>
  );
}
