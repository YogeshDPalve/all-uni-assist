import { About } from "@/components/about";
import { WorldMapDemo } from "@/components/connectivity";
import { GoogleGeminiEffectDemo } from "@/components/gemini-effect";
import { Herosection } from "@/components/hero-section";
import Pricing from "@/components/pricing";
import TestimonialsCarousel from "@/components/testimonials";
export default async function Home() {
  return (
    <div className="md:mx-5 ">
      <div>
        <Herosection />
      </div>
      <div>
        <h3 className="md:text-6xl text-3xl text-primary m-4 font-bold ">
          Features
        </h3>
        <About />
      </div>
      <div>
        <WorldMapDemo />
      </div>
      <div>
        <GoogleGeminiEffectDemo />
      </div>
      <div>
   
        <TestimonialsCarousel />
      </div>
      <div className="flex items-center justify-center "></div>
    </div>
  );
}
