"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { InputError } from "@/components/InputError";
import { Checkbox } from "@/components/Checkbox";
import { Anchor } from "@/components/Anchor";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional().default(false),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const SignInForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      rememberMe: false,
    },
    resolver: zodResolver(validationSchema),
  });
  const isKeptSignedIn = watch("rememberMe");

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <>
      <div>
        <Logo size="md" />
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10">
        <div>
          <form
            action="#"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
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
                onClick={() => { setValue('rememberMe', !isKeptSignedIn)}}
              />

              <div className="text-sm leading-6">
                <Anchor href="#">Forgot password?</Anchor>
              </div>
            </div>

            <div>
              <Button type="submit" className="text-sm w-full py-1.5">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
