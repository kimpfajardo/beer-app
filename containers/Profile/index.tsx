"use client";
import { Card } from "@/components/Card";
import { DetailFields } from "../DetailFields";
import { AvatarIcon, BeerMugIcon } from "@/components/Icons";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import {
  ExclamationTriangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import moment from "moment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserType } from "@/context/UserContext";
import { DeleteLoadingModal } from "./DeleteLoadingModal";

export const ProfileImage = () => {
  return (
    <div className="inline-block h-32 w-32 overflow-hidden mx-auto rounded-full bg-gray-100 shadow-lg border-4 border-slate-100">
      <AvatarIcon />
    </div>
  );
};

export const UserInformation = ({
  data,
}: {
  data: {
    user: User | null;
  };
}) => {
  const user = data.user as unknown as UserType;
  // const { user } = useAuthContext();

  if (!user) return <></>;
  const firstName = user?.user_metadata.first_name ?? "";
  const lastName = user?.user_metadata.last_name ?? "";
  const userEmail = user?.email ?? "";
  const birthDate = user?.user_metadata.birth_data
    ? moment(user?.user_metadata.birth_data).format("YYYY-MM-DD")
    : "";
  const joinDate =
    moment(user?.user_metadata.created_at).format("YYYY-MM-DD") ?? "";

  return (
    <Card className="grid grid-cols-2 gap-10">
      <DetailFields label="First Name" value={firstName ?? ""} />
      <DetailFields label="Last Name" value={lastName ?? ""} />

      <div className="col-span-2">
        <DetailFields label="Email" value={userEmail} />
      </div>
      <DetailFields
        label="Birth date"
        value={birthDate}
        customLabelIcon={
          <div className="group relative">
            <BeerMugIcon className="group-hover:text-lg text-amber-600 transition-all group-hover:-translate-y-1 group-hover:rotate-12" />
            <Tooltip className="w-max hidden group-hover:block transition-all absolute left-full top-0 right-0 transform translate-x-1 -translate-y-8">
              We call it Beerday!
            </Tooltip>
          </div>
        }
      />
      <DetailFields label="Date Joined" value={joinDate} />
    </Card>
  );
};

export const ProfileNavigation = () => {
  const router = useRouter();
  const goToBeerGallery = () => router.push("/beer-gallery");
  const goToShoppingList = () => router.push("/shopping-list");
  return (
    <div className="grid gap-4  sm:grid-cols-2">
      <Button
        className="py-3 px-6 h-16 rounded-lg bg-indigo-600 hover:bg-indigo-500 flex space-x-4 items-center"
        onClick={goToShoppingList}
      >
        <ShoppingBagIcon className="w-5 h-5" />
        <span>View my shopping list</span>
      </Button>
      <Button
        className="py-3 px-6 h-16 rounded-lg bg-amber-600 hover:bg-amber-500 flex space-x-4 items-center"
        onClick={goToBeerGallery}
      >
        <BeerMugIcon className="w-5 h-5" />
        <span>View beer gallery</span>
      </Button>
    </div>
  );
};

export const Actions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(
    false as boolean
  );
  const [showDeleteLoadingModal, setShowDeleteLoadingModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false as boolean);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signOut = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signOut();
    if (!error){
      router.replace("/auth");
    }
  };

  return (
    <>
      {showDeleteLoadingModal && (
        <DeleteLoadingModal
          toggleLoadingModal={() => setShowDeleteLoadingModal((prev) => !prev)}
        />
      )}
      <Modal
        visible={showDeleteModal}
        toggle={() => setShowDeleteModal((prev) => !prev)}
        title="Delete account"
        onConfirmClick={() => {
          setShowDeleteModal(false);
          setShowDeleteLoadingModal(true);
        }}
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
          className="mt-auto text-black-800 py-4 border-0 border-red-400 disabled:text-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onClick={signOut}
          disabled={loading}
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
