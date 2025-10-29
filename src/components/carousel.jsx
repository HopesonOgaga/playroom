// import  { useState, useEffect } from "react";

// const slides = [
//   {
//     id: 1,
//     video: "/video/test.mp4",
//     title: "Modern Living",
//     subtitle: "Find your dream home with us",
//   },
//   {
//     id: 2,
//     video: "",
//     title: "Cozy Interiors",
//     subtitle: "Designed for comfort and elegance",
//   },
//   {
//     id: 3,
//     video: "",
//     title: "Luxury Villas",
//     subtitle: "Experience modern architecture",
//   },
// ];

// export default function CarouselComponents() {
//   const [current, setCurrent] = useState(0);

//   const nextSlide = () =>
//     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   const prevSlide = () =>
//     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

//   // Auto-slide every 6 seconds
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Slides */}
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             index === current ? "opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//         >
//           {/* Background video */}
//           <video
//             src={slide.video}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover"
//           />

//           {/* Overlay text */}
//           <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
//             <h1 className="text-white text-5xl font-bold mb-4 drop-shadow-lg">
//               {slide.title}
//             </h1>
//             <p className="text-white text-xl drop-shadow-md">
//               {slide.subtitle}
//             </p>
//           </div>
//         </div>
//       ))}

//       {/* Controls (bottom right) */}
//       <div className="absolute bottom-6 right-6 flex gap-3 z-20">
//         <button
//           onClick={prevSlide}
//           className="bg-black/50 text-white p-3 rounded-full hover:bg-white hover:text-black transition-transform transform hover:scale-110"
//         >
//           ◀
//         </button>
//         <button
//           onClick={nextSlide}
//           className="bg-black/50 text-white p-3 rounded-full hover:bg-white hover:text-black transition-transform transform hover:scale-110"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Dots (bottom center) */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               current === index ? "bg-white scale-125" : "bg-gray-400"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </section>
//   );
// }
