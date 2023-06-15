"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { InputError } from "@/components/InputError";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { cn, createShoppingList } from "@/utils/functions";
import { useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Toast } from "@/components/Toast";
import { toast } from "react-toastify";
import supabaseAdmin from "@/supabase/admin";

const validationSchema = z.object({
  firstName: z.string().nonempty("This field is required"),
  lastName: z.string().nonempty("This field is required"),
  email: z.string().email(),
  password: z.string().nonempty("This field is required"),
  confirmPassword: z.string(),
  birthDate: z.string().nonempty("This field is required"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const yearsDifference = (date1: string, date2: string): number => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const diffInMilliseconds = Math.abs(
    secondDate.getTime() - firstDate.getTime()
  );
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // number of milliseconds in a year considering leap years

  return Math.floor(diffInYears);
};

export const SignUpForm = ({
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
    reset,
    setError,
  } = useForm<ValidationSchema>({
    defaultValues: {},
    resolver: zodResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const passwordStrength = (password: string) => {
    const result = zxcvbn(password ?? "");
    return result.score;
  };

  const {
    password: passwordValue,
    firstName,
    lastName,
    password,
    email,
    birthDate,
  } = watch();
  const supabase = createClientComponentClient();
  const passwordStrengthResult = useMemo(() => {
    return passwordStrength(passwordValue);
  }, [passwordValue]);

  const showPasswordStrength = useMemo(() => {
    return passwordValue;
  }, [passwordValue]);

  const signUp = async () => {
    const res = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          birth_data: birthDate,
        },
      },
    });


    if (!res.error && res.data.user) {
      await createShoppingList(
        res.data.user.id as string,
        supabaseAdmin,
        () => {
          toast.success(
            "Sign up successful! Check your email for confirmation."
          );
          reset();
          setLoading(false);
          setIsSignIn(true);
        }
      );

      setLoading(false);
      return;
    }
    toast.error("An error occurred! Please try again later.");
    setLoading(false);
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    setLoading(true);
    const { confirmPassword, password, birthDate } = data;
    const currentDate = new Date();
    const dateOfBirth = new Date(birthDate);
    const age = yearsDifference(
      dateOfBirth.toISOString(),
      currentDate.toISOString()
    );
    const passwordStrengthResult = passwordStrength(password);
    let hasError = false;
    if (age < 18) {
      setError("birthDate", {
        type: "custom",
        message: "You must be 18 years old to register",
      });
      hasError = true;
    }
    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "custom",
        message: "Password does not match",
      });
      hasError = true;
    }
    if (passwordStrengthResult < 3) {
      setError("password", {
        type: "custom",
        message: "Password is weak",
      });
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    signUp();
  };

  return (
    <>
      <Toast />
      <div className="mt-10">
        <div>
          <form
            action="#"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex gap-4">
              <div>
                <Input
                  label="First Name"
                  autoComplete="firstName"
                  required
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                />
                <InputError
                  className="mt-2"
                  message={errors.firstName?.message}
                  id="first-name-error"
                />
              </div>
              <div>
                <Input
                  label="Last Name"
                  autoComplete="lastName"
                  required
                  {...register("lastName")}
                />
                <InputError
                  className="mt-2"
                  message={errors.lastName?.message}
                  id="last-name-error"
                />
              </div>
            </div>
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
                label="Birth Date"
                type="date"
                autoComplete="birth_date"
                required
                {...register("birthDate")}
              />{" "}
              <InputError
                className="mt-2"
                message={errors.birthDate?.message}
                id="email-error"
              />
            </div>

            <div className="group">
              <div className="relative">
                <Input
                  className="pr-10"
                  label="Password"
                  type={revealPassword ? "text" : "password"}
                  autoComplete="password"
                  required
                  {...register("password", {
                    required: "You must specify a password",
                  })}
                />
                <span
                  className="w-4 h-4 absolute right-2 bottom-[10px] z-10 cursor-pointer"
                  onClick={() => setRevealPassword((prev) => !prev)}
                >
                  {!revealPassword ? (
                    <EyeSlashIcon className="text-gray-400" />
                  ) : (
                    <EyeIcon />
                  )}
                </span>
              </div>

              {showPasswordStrength && (
                <div className="w-full flex gap-2 mt-2">
                  {[1, 2, 3, 4].map((_, index) => {
                    let color = "bg-none";
                    switch (passwordStrengthResult) {
                      case 0:
                        color = "bg-gray-500";
                        break;
                      case 1:
                        color = "bg-gray-500";
                        break;
                      case 2:
                        color = "bg-red-500";
                        break;
                      case 3:
                        color = "bg-yellow-500";
                        break;
                      case 4:
                        color = "bg-green-500";
                        break;
                      default:
                        color = "bg-none";
                        break;
                    }
                    return (
                      <div
                        className={cn(
                          "h-2 w-full transition-[background] ease-in-out rounded-full",
                          passwordStrengthResult === index &&
                            !index &&
                            "bg-gray-500",
                          index < passwordStrengthResult &&
                            passwordStrengthResult > 0 &&
                            color
                        )}
                        key={index}
                      />
                    );
                  })}
                </div>
              )}
              <InputError
                className="mt-2"
                message={errors.password?.message}
                id="email-error"
              />
            </div>
            <div>
              <Input
                label="Confirm Password"
                type="password"
                autoComplete="password"
                required
                {...register("confirmPassword")}
              />
              <InputError
                className="mt-2"
                message={errors.confirmPassword?.message}
                id="email-error"
              />
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="text-sm w-full py-1.5"
                disabled={loading}
              >
                Create account
              </Button>
              <p className="text-sm">
                Already have an account?{" "}
                <b
                  className="text-amber-600 cursor-pointer"
                  onClick={() => !loading && setIsSignIn(true)}
                >
                  Sign in here
                </b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
