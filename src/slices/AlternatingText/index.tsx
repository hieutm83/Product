"use client";

import { Bounded } from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { Cabin } from 'next/font/google';

// Cấu hình font Cabin
const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps = SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  // Hard-coded text data
  const customTextData = [
      {
        heading: "Uống một ngụm, sáng tạo nổ não",
        body: "Ý tưởng bay như pháo hoa sau 2 lon. Bia Hiếu Mèn – nơi sáng tạo và cồn gặp nhau, cháy vl!"
      },
      {
        heading: "Công nghệ ủ xịn như người yêu cũ",
        body: "Ủ chuẩn bài, lên men kiểu mới. Vị ngon bùng nổ, hậu đắng ngọt lịm, uống xong chỉ muốn... uống nữa."
      },
      {
        heading: "Hiếu Mèn không bỏ bạn một mình",
        body: "Buồn có bia, vui có anh. Tụ tập, chill, quẩy – Hiếu Mèn luôn kè kè bên bạn, như cái bóng nhưng mát rượi."
      }
  ];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`alternating-text-container relative bg-yellow-300 text-sky-950 ${cabin.className}`}
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {customTextData.map((item, index) => (
            <div
              key={index}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/1",
                )}
              >
                <div className={`text-balance text-6xl font-bold ${cabin.className}`}>
                  {item.heading}
                </div>

                <div className={`mt-4 text-xl ${cabin.className}`}>
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;