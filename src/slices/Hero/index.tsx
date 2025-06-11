"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";

import { useStore } from "@/hooks/useStore";
import { Cabin } from 'next/font/google';

const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '700'],
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);

  useGSAP(() => {
    if (!ready) return;

    const introTL = gsap.timeline();

    introTL
      .set(".hero", { opacity: 1 })
      .from(".hero-header-word", {
        scale: 4,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 0.8,
      })
      .from(".hero-subheading", {
        opacity: 0,
        y: 30,
      }, "+=.8")
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .fromTo("body", {
        backgroundColor: "#FDE047",
      }, {
        backgroundColor: "#D9F99D",
        overwrite: "auto",
      }, 1.5)
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(3)",
        duration: 0.5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      });
  }, [ready]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero relative opacity-0"
    >
      {/* Hiệu ứng WebGL trên mọi thiết bị */}
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] h-screen w-screen">
          <Scene />
          <Bubbles speed={2} />
        </View>


      {/* Nội dung chính */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4">
        <div className="grid min-h-[100dvh] place-content-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header w-full text-4xl sm:text-6xl md:text-[9rem] lg:text-[13rem] font-black uppercase leading-tight text-orange-500">
              <TextSplitter
                text="BEER HIEUMEN"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>

            <div className={`${cabin.className} hero-subheading mt-8 text-2xl sm:text-4xl font-semibold text-sky-950`}>
              BIA ĐỈNH CAO VL
            </div>

            <div className={`${cabin.className} hero-body mt-4 text-base sm:text-xl font-normal text-sky-950`}>
              uống là phê luôn
            </div>

            <Button
              buttonLink={slice.primary.button_link}
              className="hero-button mt-8"
            >
              {slice.primary.button_text}
            </Button>

          </div>
        </div>

        {/* Phần mô tả thứ hai */}
        <div className="text-side relative z-[80] grid min-h-[100dvh] items-center gap-6 md:grid-cols-2">
          <div className={`${cabin.className}`}>
            <h2 className="text-side-heading text-balance text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-sky-950">
              <TextSplitter text="THIÊN ĐƯỜNG VỊ BIA" />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-base sm:text-lg text-slate-950">
              Không phải khen quá lời, nhưng bia này mà không ngon thì tao nhịn nhậu cả tháng. Mỗi ngụm là một cú tát vào lưỡi – tỉnh, phê, và thèm vl luôn!
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
