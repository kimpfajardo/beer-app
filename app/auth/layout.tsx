import { AuthBackgroundImg } from "@/containers/SignInForm/background";

export const metadata = {
  title: "Alemanac | Sign in",
  description: "Alemanac",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html className="h-full">
        <body className="bg-white">
          <div className="flex h-screen">
            {children}
            <AuthBackgroundImg />
          </div>
        </body>
      </html>
    </>
  );
}
