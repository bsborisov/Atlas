"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loginAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import FormField from "@/components/shared/FormField";
import { Text } from "@/components/ui/Text";
import { colors } from "@/config/themeSettings";
import { ActionError } from "@/types/action";
import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@/lib/logger";

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
    const result = await loginAction({
      email: values.email,
      password: values.password
    });

    if (!result.success) {

      setError(result.error);

    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          type="email"
          label={"Email address"} //TODO translate
          placeholder={"Email address"}
          autoComplete="email"
          tabIndex={1}
        />
        <FormField
          name="password"
          type="password"
          label={"Password"} //TODO translate
          placeholder={"Password"}
          autoComplete="current-password"
          tabIndex={2}
        />
        {error && (
          <div className="mb-4">
            <Text className="mt-2" style={{ color: colors.alert }}>
              {
                form.formState.errors.email?.message &&
                <p>
                  {form.formState.errors.email?.message}
                </p>
              }
              {
                form.formState.errors.password?.message &&
                <p>
                  {form.formState.errors.password?.message}
                </p>
              }
              {
                error?.message &&
                <p>
                  {error.message}
                </p>
              }
            </Text>
          </div>
        )}

        <Button
          type="submit"
          //progress={isPending}
          //disabled={isPending}
          className="mt-2 w-full"
          onClick={() => {
            logger.info("Login clicked");
          }}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  )
}