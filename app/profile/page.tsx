import {
  Actions,
  ProfileImage,
  ProfileNavigation,
  UserInformation,
} from "@/containers/Profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const user = await supabase.auth.getUser();
  return (
    <>
      <ProfileImage />
      <UserInformation data={user.data} />
      <ProfileNavigation />
      <Actions />
    </>
  );
}
