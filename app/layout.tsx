import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/UserContext";
import supabase from "@/supabase";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alemanac",
  description:
    "Beer exploration Web App to help you discover different sorts of beers from around the world!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = supabase.auth.getSession();
  if (!session) {
    redirect("/auth");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
