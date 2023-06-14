"use client";
import { Logo } from "@/components/Logo";
import { Toast } from "@/components/Toast";
import { SignInForm } from "@/containers/AuthForm/SignIn";
import { SignUpForm } from "@/containers/AuthForm/SignUp";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  return (
    <div className="flex flex-1 flex-col lg:justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white h-full">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Logo size="md" />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isSignIn ? "Sign in to" : "Create"} your account
          </h2>
        </div>
        <Toast />
        {isSignIn && <SignInForm setIsSignIn={setIsSignIn} />}
        {!isSignIn && <SignUpForm setIsSignIn={setIsSignIn} />}
      </div>
    </div>
  );
}

export default Page;
