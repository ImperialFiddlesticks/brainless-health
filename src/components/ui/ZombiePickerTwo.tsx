// import { useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/react-router";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
//   type CarouselApi,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";

// const zombies = [
//   { id: 1, src: "/zombieTwo.png", name: "Rotsy", enabled: false },
//   { id: 2, src: "/happyZombie.png", name: "Bob", enabled: true },
//   { id: 3, src: "/zombieThree.png", name: "Grimble", enabled: false },
// ];

// export default function ZombiePicker() {
//   const [api, setApi] = useState<CarouselApi>();
//   const [active, setActive] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!api) return;
//     api.scrollTo(1);

//     api.on("select", () => {
//       setActive(api.selectedScrollSnap());
//     });
//   }, [api]);

//   const handleSelect = (index: number) => {
//     if (index !== active) {
//       api?.scrollTo(index);
//       return;
//     }
//     if (!zombies[index].enabled) return;
//     navigate({ to: "/zombieScreen" });
//   };

//   return (
//     <div className="flex flex-col items-center gap-8 w-full py-12">
//       <h1 className="text-white text-3xl font-bold tracking-widest uppercase">
//         Choose Your Zombie
//       </h1>

//       <Carousel
//         setApi={setApi}
//         opts={{ align: "center", loop: true }}
//         className="w-full"
//       >
//         <CarouselContent className="-ml-4">
//           {zombies.map((zombie, index) => {
//             const isCenter = index === active;
//             return (
//               <CarouselItem
//                 key={zombie.id}
//                 className="pl-4 basis-1/3 flex justify-center"
//               >
//                 <button
//                   onClick={() => handleSelect(index)}
//                   className={cn(
//                     "flex flex-col items-center rounded-2xl transition-all duration-300",
//                     isCenter ? "scale-110 p-6" : "scale-90 opacity-50 p-4",
//                     isCenter && !zombie.enabled
//                       ? "cursor-not-allowed"
//                       : "cursor-pointer",
//                   )}
//                 >
//                   <img
//                     src={zombie.src}
//                     alt={zombie.name}
//                     className={cn(
//                       "object-contain transition-all duration-300",
//                       isCenter ? "w-40 h-40" : "w-24 h-24",
//                     )}
//                   />
//                   <span
//                     className={cn(
//                       "mt-3 font-bold tracking-wide",
//                       isCenter
//                         ? "text-green-400 text-lg"
//                         : "text-white/40 text-sm",
//                     )}
//                   >
//                     {zombie.name}
//                   </span>
//                   {isCenter && (
//                     <span className="mt-2 text-xs animate-pulse">
//                       {zombie.enabled ? "🧠 Tap to choose" : "Coming soon"}
//                     </span>
//                   )}
//                 </button>
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>
//         <CarouselPrevious className="left-2 text-white/60 hover:text-green-400 border-none bg-transparent" />
//         <CarouselNext className="right-2 text-white/60 hover:text-green-400 border-none bg-transparent" />
//       </Carousel>

//       <div className="flex gap-2">
//         {zombies.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => api?.scrollTo(i)}
//             className={cn(
//               "h-2 rounded-full transition-all duration-300",
//               i === active ? "bg-green-400 w-4" : "bg-white/30 w-2",
//             )}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
