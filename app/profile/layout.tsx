"use client";
import { LayoutProps } from "@/.next/types/app/layout";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AvatarIcon, BeerMugIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { Modal } from "@/components/Modal";
import { Tooltip } from "@/components/Tooltip";
import { DetailFields } from "@/containers/DetailFields";
import { Actions, ProfileNavigation, UserInformation } from "@/containers/Profile";
import { ArchiveBoxIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileLayout({ children }: LayoutProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const goToBeerGallery = () => router.push("/beer-gallery");
  const goToShoppingList = () => router.push("/shopping-list");
  return (
    <html>
      <body>
        
        <div className="bg-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl h-full flex flex-col justify-between">
            <div className="relative pt-10 flex flex-col space-y-10">
              <Logo />
              <span className="inline-block h-32 w-32 overflow-hidden mx-auto rounded-full bg-gray-100 shadow-lg border-4 border-slate-100">
                <AvatarIcon />
              </span>
              <UserInformation />
              <ProfileNavigation />
              <Actions />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
