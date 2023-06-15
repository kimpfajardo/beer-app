import { Toast } from "@/components/Toast";
import { BeerListContainer } from "@/containers/BeerList";
import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Products() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user as User;
  return (
    <>
      <Toast />
      <div className="mx-auto max-w-7xl p-0 sm:px-6 lg:px-8 ">
        <BeerListContainer user={user} />
      </div>
    </>
  );
}
