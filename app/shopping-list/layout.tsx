import { LayoutProps } from "@/.next/types/app/layout";
import React from "react";

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl h-full">
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
