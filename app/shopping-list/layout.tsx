import { LayoutProps } from "@/.next/types/app/layout";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/containers/ShoppingList/Navigation";
import { ShoppingListProvider } from "@/context/ShoppingList";
import { inter } from "@/utils/fonts";
import React from "react";

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body className={inter.className}>
        <ShoppingListProvider>
          <div className="bg-slate-50 min-h-screen p-0 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-2xl h-full">
              <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <Logo />
                  <Navigation />
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </ShoppingListProvider>
      </body>
    </html>
  );
}
