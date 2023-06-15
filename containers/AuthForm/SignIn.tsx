"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { InputError } from "@/components/InputError";
import { Checkbox } from "@/components/Checkbox";
import { Anchor } from "@/components/Anchor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty("This field is required"),
  rememberMe: z.boolean().optional().default(false),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const SignInForm = ({
  setIsSignIn,
}: {
  setIsSignIn: (value: boolean) => void;
}) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      rememberMe: false,
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });
  const { rememberMe: isKeptSignedIn, email, password } = watch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    setLoading(true);
    signIn();
  };

  const signIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!res.error) {
      // const handleShoppingList = await supabase
      //   .from("shopping_list")
      //   .select("*")
      //   .eq("user_id", res?.data?.user.id);

      // if (!handleShoppingList.error) {
      //   const hasShoppingList = handleShoppingList.data.length > 0;
      //   if (!hasShoppingList) {
      //     await supabase
      //       .from("shopping_list")
      //       .insert({ user_id: res?.data?.user.id });
      //   }
      // }
      await toast.success(
        `Welcome back, ${res.data.user.user_metadata.first_name}!`,
        {
          icon: "👋",
          autoClose: 1000,
          pauseOnHover: false,
          async onClose(props) {
            router.push("/beer-gallery");
          },
        }
      );

      return;
    }
    toast.error(
      res.error.message || "An error occurred. Please try again later.",
      {
        autoClose: 1000,
        onClose() {
          router.refresh();
        },
      }
    );
    setLoading(false);
  };

  return (
    <>
      <div className="mt-10">
        <div>
          <form
            action="#"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
              />
              <InputError
                className="mt-2"
                message={errors.email?.message}
                id="email-error"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                autoComplete="password"
                required
                {...register("password")}
              />
              <InputError
                className="mt-2"
                message={errors.password?.message}
                id="email-error"
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                {...register("rememberMe")}
                label="Remember me"
                onClick={() => {
                  setValue("rememberMe", !isKeptSignedIn);
                }}
              />

              <div className="text-sm leading-6">
                <Anchor href="#">Forgot password?</Anchor>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="text-sm w-full py-1.5 disabled:opacity-50"
                disabled={loading}
              >
                Sign in
              </Button>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <b
                  className="text-amber-600 cursor-pointer"
                  onClick={() => !loading && setIsSignIn(false)}
                >
                  Let&apos;s create one.
                </b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
