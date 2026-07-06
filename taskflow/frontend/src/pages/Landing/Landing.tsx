import {Navbar, Hero, Features, Showcase, Pricing, FAQ, LandingFooter} from "../../components";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Showcase />
        <Pricing />
        <FAQ />
      </main>

      <LandingFooter />
    </div>
  );
}

export default Landing;