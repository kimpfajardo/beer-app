import { SignInForm } from "@/containers/SignInForm";
import React from "react";

function Page() {
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white h-full">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <SignInForm />
      </div>
    </div>
  );
}

export default Page;
