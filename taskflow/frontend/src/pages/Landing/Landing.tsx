import {Navbar, Hero, Features, Showcase, Pricing, FAQ, Footer} from "../../components";

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

      <Footer />
    </div>
  );
}

export default Landing;