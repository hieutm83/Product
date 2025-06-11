import clsx from "clsx";

type Props = {
  textColor?: string;
  backgroundColor?: string;
  className?: string;
};

export default function CircleText({
  textColor = "#1A871D",
  backgroundColor = "#FFFCFA",
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 123 123"
      className={clsx("circle-text", className)}
      aria-labelledby="circle-text"
    >
      <title id="circle-text">circle.png</title>

      {/* Hình tròn nền */}
      <path
        fill={backgroundColor}
        d="M122 61.5a61 61 0 11-122 0 61 61 0 01122 0z"
      />

      {/* Ảnh PNG nằm đè lên hình tròn */}
        <image
          href="/circle.png"
          x="0"
          y="0"
          width="123"
          height="123"
          preserveAspectRatio="xMidYMid meet"
          className="animate-spin-slow origin-center"
        />

    </svg>
  );
}
