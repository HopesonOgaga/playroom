import VideoCarousel from "../components/carousel";
import FeaturedPrograms from "../components/featurd";
import Games from "../components/grid";
import FOOTER from "./footer";
import HEADER from "./header";
import { CONTRACT_ABI } from "../contractConfig";
import { Link } from "react-router-dom";

console.log(CONTRACT_ABI);

function HOME() {
  return (
    <>
      <HEADER />

      <section className="flex h-full flex-col gap-10 justify-center items-center mt-20 bg-playroom-dark text-white">
        {/* HERO SECTION */}
        <div
          className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden rounded-sm shadow-playroom"
          style={{
            backgroundImage: "url('/images/wallpaper.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Animated gradient orbs */}
          <div className="absolute -top-10 left-0 w-64 h-64 bg-playroom-gradient blur-[120px] animate-pulse opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-playroom-crimson blur-[120px] animate-bounce opacity-70"></div>

          {/* Overlay gradient for contrast */}
          <div className="absolute inset-0 bg-playroom-overlay"></div>

          {/* Hero Text */}
          <div className="z-10 flex flex-col gap-4 justify-center items-center px-4 md:px-0">
            <p className="text-5xl md:text-7xl font-extrabold capitalize tracking-wide text-glow">
              welcome to <span className="text-playroom-accent">playroom</span>
            </p>
            <p className="text-base md:text-lg font-medium text-gray-300 max-w-2xl leading-relaxed">
              Compete. Conquer. The decentralized home for gamers worldwide.
            </p>
          </div>

          {/* CTA Button */}
          <div className="z-10 mt-10">
            <Link to={"/faq"}>
              <button className="btn-playroom w-40 md:w-52 h-12 capitalize">
                learn more
              </button>
            </Link>
          </div>

          {/* Floating shapes for vibe */}
          <div className="absolute w-10 h-10 bg-red-600/50 rounded-full top-1/4 left-10 animate-bounce-slow"></div>
          <div className="absolute w-8 h-8 bg-blue-500/50 rounded-full bottom-1/3 right-12 animate-ping"></div>
        </div>

        {/* CONTENT SECTIONS */}
        <section className="w-full">
          <Games />
          <VideoCarousel></VideoCarousel>
          <FeaturedPrograms />
        </section>
      </section>

      <FOOTER />
    </>
  );
}

export default HOME;
