import { Toast } from "@/components/Toast";
import { BeerListContainer } from "@/containers/BeerList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Products() {

  return (
    <>
      <Toast />
      <div className="mx-auto max-w-7xl p-0 sm:px-6 lg:px-8 ">
        <BeerListContainer />
      </div>
    </>
  );
}
