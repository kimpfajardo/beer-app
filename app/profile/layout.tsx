import { Logo } from "@/components/Logo";
import { Navigation } from "@/containers/Profile/Navigation";
import { inter } from "@/utils/fonts";

export const metadata = {
  title: "Alemanac | Profile",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <div className="bg-slate-50 min-h-screen p-0 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl p-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <Logo />
            <Navigation />
          </div>
          <div className="flex flex-col space-y-10">{children}</div>
        </div>
      </div>
    </body>
  );
}
