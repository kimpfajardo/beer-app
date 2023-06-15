import { LayoutProps } from "@/.next/types/app/layout";
import { Navigation } from "@/containers/Layouts/Navigation";
import { BeerProvider } from "@/context/BeersContext";
import { inter } from "@/utils/fonts";

export const metadata = {
  title: "Alemanac | Beer gallery",
  description: "Explore the best beers in the world",
};


export default async function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <div className={inter.className}>
        <BeerProvider>
          <div className="bg-slate-50 h-screen overflow-y-scroll">
            <Navigation />
            <main>{children}</main>
          </div>
        </BeerProvider>
      </div>
    </>
  );
}