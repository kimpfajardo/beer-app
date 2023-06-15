"use client";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { useAuthContext } from "@/context/UserContext";
import { deleteUser } from "@/supabase/admin";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";

export const DeleteLoadingModal = ({
  toggleLoadingModal,
}: {
  toggleLoadingModal: VoidFunction;
}) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const onDeleteError = () => {
      toast.error("Account deletion failed try again later!", {
        onClose: () => {
          toggleLoadingModal();
          router.refresh();
        },
      });
    };

    const onDeleteSuccess = async () => {
      toast.success("Account deleted successfully");
      await supabase.auth.signOut();
      router.replace("/auth");
    };
    const deleteUserAccount = async () => {
      deleteUser(user?.id as string, {
        onError: onDeleteError,
        onSuccess: onDeleteSuccess,
      });
    };
    deleteUserAccount();
  }, [router, supabase.auth, user?.id, toggleLoadingModal]);
  return (
    <>
      <Toast />

      <Modal
        visible={true}
        toggle={() => {}}
        title="Sad to see you go, Ale-buddy"
        onConfirmClick={() => {}}
        onCancelClick={() => {}}
        canCloseModal={false}
      >
        <div className="flex flex-col gap-4 sm:flex-row items-center">
          <div className="mx-auto flex relative flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0">
            <Image src="/toast_beers.gif" width={120} height={120} alt="" />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Here&apos;s a toast while we delete your account.
            </p>
            <BarLoader width={"100%"} />
          </div>
        </div>
      </Modal>
    </>
  );
};
