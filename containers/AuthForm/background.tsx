import Image from "next/image";

export const AuthBackgroundImg = () => {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src={
          "https://www.popsci.com/uploads/2022/07/05/three-glasses-of-beer-on-table.jpg?auto=webp&width=1440&height=1080"
        }
        alt=""
        fill
        sizes="100vh"
        priority
      />
    </div>
  );
};
