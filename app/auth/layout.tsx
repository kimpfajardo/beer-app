import { AuthBackgroundImg } from "@/containers/SignInForm/background";
import { inter } from "@/utils/fonts";
import { cn } from "@/utils/functions";

export const metadata = {
  title: "Alemanac | Sign in",
  description: "Alemanac",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html className="h-full">
        <body className={cn(inter.className,"bg-white")}>
          <div className="flex h-screen">
            {children}
            <AuthBackgroundImg />
          </div>
        </body>
      </html>
    </>
  );
}
