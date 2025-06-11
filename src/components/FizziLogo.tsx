export const FizziLogo = (props: React.HTMLProps<HTMLImageElement>) => {
  return (
    <img
      src="/logo.png"
      alt="HieuMen Logo"
      width={200}
      height={200}
      className="z-10 h-50 w-auto cursor-pointer"
      {...props}
    />
  );
};
