import { LayoutProps } from "@/.next/types/app/layout";
import { Logo } from "@/components/Logo";

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl h-full flex flex-col justify-between">
            <div className="relative pt-10 flex flex-col space-y-10">
              <Logo />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
