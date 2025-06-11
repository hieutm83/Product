"use client";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";
import { Group } from "three";
import gsap from "gsap";

const SPINS_ON_CHANGE = 8;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  price: string;
}[] = [
  { flavor: "blackCherry", color: "#038d78", name: "LAGER", price: "15.000đ" },
  { flavor: "grape", color: "#df2b40", name: "PREMIUM TRẮNG", price: "22.000đ" },
  { flavor: "lemonLime", color: "#038d78", name: "CHILL", price: "15.000đ" },
  { flavor: "strawberryLemonade", color: "#df2b40", name: "PREMIUM VÀNG", price: "28.000đ" },
  { flavor: "watermelon", color: "#038d78", name: "EXPROT", price: "15.000đ" },
];

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .-wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(
        ".text-wrapper, .price-text",
        {
          duration: 0.2,
          y: -10,
          opacity: 0,
        },
        0,
      )
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(
        ".text-wrapper, .price-text",
        {
          duration: 0.2,
          y: 0,
          opacity: 1,
        },
        0.7,
      );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel grid-rows-[auto, 4fr, auto] relative grid h-screen justify-center overflow-hidden bg-white py-12 text-white"
      style={{ fontFamily: "'Baloo', sans-serif" }}
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#038d78] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#038d78]" />

      <h2 className="relative text-center text-5xl font-bold">
        CÁC HƯƠNG VỊ NỔI BẬT
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="left"
          label="Vị trước"
        />

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              ref={sodaCanRef}
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="right"
          label="Vị tiếp theo"
        />
      </div>

            <div className="text-area relative mx-auto text-center">
              <div className="text-wrapper text-2xl font-bold">
                <p 
                  style={{ 
                    color: "#ffffff", // Màu trắng
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)" // Viền đen đậm
                  }}
                >
                  {FLAVORS[currentFlavorIndex].name}
                </p>
              </div>

              <div 
                className="price-text mt-1 text-lg font-semibold"
                style={{
                  color: "#ffffff", // Màu trắng
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)" // Viền đen đậm
                }}
              >
                Giá: {FLAVORS[currentFlavorIndex].price}
              </div>
            </div>


    </section>
  );
};

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, direction = "right", onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default Carousel;