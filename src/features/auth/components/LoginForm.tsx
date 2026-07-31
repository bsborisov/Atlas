"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loginAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import FormField from "@/components/shared/FormField";
import { Text } from "@/components/ui/Text";
import { ActionError } from "@/types/action";
import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@/lib/logger";
import Link from "next/link";

export default function LoginForm() {

  const [error, setError] = useState<ActionError | null>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });

  async function onSubmit(values: LoginSchema) {

    setError(null);

    const result = await loginAction({
      email: values.email,
      password: values.password
    });

    if (!result.success) {

      setError(result.error);

    }
  }

  function loginWithGitHub() {
    console.log('LoginWIthGH')
  }

  return (
    <>
      <div className="relative w-full max-w-100 p-8 rounded-[18px] border border-atlas-main-border bg-atlas-background-light overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px border-gradient-auth"></div>
        <Text className="flex items-start self-stretch text-[19px] font-bold text-atlas-foreground leading-[140%] tracking-[-0.57px]">
          Welcome back
        </Text>
        <Text className="flex pt-1 text-[13px]">
          Sign in to your Atlas workspace.
        </Text>
        <div className="flex flex-col shrink-0 items-start pt-6 gap-[9px] self-stretch">
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-center gap-[10px] text-[13px] bg-atlas-background-blue rounded-[10px] cursor-pointer transition-colors duration-120"
          >
            <svg width="17" height="17" viewBox="0 0 18 18">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
            </svg>
            <Link href={"/api/auth/google"}>
              Continue with Google
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center justify-center gap-[10px] text-[13px] bg-atlas-background-blue rounded-[10px] cursor-pointer transition-colors duration-120"
            onClick={loginWithGitHub}
          >
            <svg width="17" height="17" viewBox="0 0 16 16" className="fill-main-text-active" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Continue with GitHub
          </Button>
        </div>
        <div className="flex items-center gap-3 pt-[18px]">
          <div className="flex-1 h-px bg-atlas-main-border" />
          <Text className="text-[11px]">or continue with email</Text>
          <div className="flex-1 h-px bg-atlas-main-border" />
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col pt-[18px] gap-[9px]">
              <FormField
                name="email"
                type="email"
                placeholder={"Email address"}
                autoComplete="email"
                tabIndex={1}
              />
              <FormField
                name="password"
                type="password"
                placeholder={"Password"}
                autoComplete="current-password"
                tabIndex={2}
              />
            </div>
            {error && (
              <Text className="flex pt-2 text-[13px] text-app-light-red">
                {
                  error?.message &&
                  <p>
                    {error.message}
                  </p>
                }
              </Text>
            )}
            <div className="flex flex-col pt-2 pb-4 items-end self-stretch">
              <Link
                href={"/forgot-password"}
                className="text-xs text-app-purple hover:text-app-purple/[80%]"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              className="w-full mb-[18px]"
              onClick={() => {
                logger.info("Login clicked");
              }}
            >
              Login
            </Button>
            <div className="flex justify-center self-stretch">
              <Text className="text-[11px] leading-[1.6]">
                {"By continuing you agree to our "}
                <Link
                  href={"/terms"}
                  className="text-app-blue hover:text-app-blue/[80%]"
                >
                  Terms
                </Link>
                {" and "}
                <Link
                  href={"/privacy-policy"}
                  className="text-app-blue hover:text-app-blue/[80%]"
                >
                  Privacy Policy
                </Link>
              </Text>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="flex justify-center self-stretch mt-6">
        <Text className="text-[13px]">
          {"Don't have an account? "}
          <Link
            href={"/register"}
            className="text-app-purple hover:text-app-purple/[80%]"
          >
            Sign up
          </Link>
        </Text>
      </div>

    </>
  )
}