"use client";
import { Card } from "@/components/Card";
import { DetailFields } from "../DetailFields";
import { BeerMugIcon } from "@/components/Icons";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import { Modal } from "@/components/Modal";
import { useState } from "react";

export const UserInformation = () => {
  return (
    <Card className="grid grid-cols-2 gap-10">
      <DetailFields label="Name" value="Kim Fajardo" />
      <DetailFields label="Gender" value="M" />
      <DetailFields label="Email" value="kim.p.fajardo@gmail.com" />
      <div></div>
      <DetailFields
        label="Birth date"
        value="09/24/1998"
        customLabelIcon={
          <div className="group relative">
            <BeerMugIcon className="group-hover:text-lg text-amber-600 transition-all group-hover:-translate-y-1 group-hover:rotate-12" />
            <Tooltip className="w-max hidden group-hover:block transition-all absolute left-full top-0 right-0 transform translate-x-1 -translate-y-8">
              We call it Beerday!
            </Tooltip>
          </div>
        }
      />
      <DetailFields label="Date Joined" value="06/09/2023" />
    </Card>
  );
};

export const ProfileNavigation = () => {
  const router = useRouter();
  const goToBeerGallery = () => router.push("/beer-gallery");
  const goToShoppingList = () => router.push("/shopping-list");
  return (
    <div className="grid gap-4 grid-cols-2">
      <Button
        className="py-3 px-6 h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 flex space-x-4 items-center"
        onClick={goToShoppingList}
      >
        <ShoppingBagIcon className="w-5 h-5" />
        <span>View my shop list</span>
      </Button>
      <Button
        className="py-3 px-6 h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 flex space-x-4 items-center"
        onClick={goToBeerGallery}
      >
        <BeerMugIcon className="w-5 h-5" />
        <span>View beer gallery</span>
      </Button>
    </div>
  );
};

export const Actions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <Modal
        visible={showDeleteModal}
        toggle={() => setShowDeleteModal((prev) => !prev)}
        title="Delete account"
        onConfirmClick={() => alert("Account deleted")}
        onCancelClick={() => setShowDeleteModal(false)}
        // canCloseModal={false}
      >
        <div className="flex space-x-4">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-gray-500">
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed from our servers forever. This action
            cannot be undone.
          </p>
        </div>
      </Modal>
      <div className="space-y-6 grid grid-cols-1">
        <Button
          variant={"secondary"}
          className="mt-auto text-black-800 py-4 border-0 border-red-400"
        >
          Sign out
        </Button>
        <Button
          variant={"ghost"}
          className="text-red-500 py-4"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account...
        </Button>
      </div>
    </>
  );
};
