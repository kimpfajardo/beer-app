import {
  Actions,
  ProfileImage,
  ProfileNavigation,
  UserInformation,
} from "@/containers/Profile";

export default function Page() {
  return (
    <>
      <ProfileImage />
      <UserInformation />
      <ProfileNavigation />
      <Actions />
    </>
  );
}
