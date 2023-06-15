import { AuthBackgroundImg } from "@/containers/AuthForm/background";
import supabase from "@/supabase";
import { inter } from "@/utils/fonts";
import { cn } from "@/utils/functions";

export const metadata = {
  title: "Alemanac | Authorizer",
  description: "Join us and explore the world of beers!",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={cn(inter.className, "bg-white")}>
        <div className="flex h-screen">
          {children}
          <AuthBackgroundImg />
        </div>
      </div>
    </>
  );
}
