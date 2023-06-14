import {
  Actions,
  ProfileImage,
  ProfileNavigation,
  UserInformation,
} from "@/containers/Profile";
import { useAuthContext } from "@/context/UserContext";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {

  return (
    <>
      <ProfileImage />
      <UserInformation />
      <ProfileNavigation />
      <Actions />
    </>
  );
}
