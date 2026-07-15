"use client";

import { useState } from "react";
import { registerAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import { ActionError } from "@/types/action";
import { FormProvider, useForm } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import { Text } from "@/components/ui/Text";
import { registerSchema, RegisterSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {

  const [error, setError] = useState<ActionError | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });

  async function onSubmit(values: RegisterSchema) {
    const result =
      await registerAction({
        name: values.name,
        email: values.email,
        password: values.password,
      });

    if (!result.success) {

      setError(result.error);
      return;

    }

    setSuccess(true);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          type="name"
          label={"Your Name"} //TODO translate
          placeholder={"Your Name"}
          autoComplete="name"
          tabIndex={1}
        />
        <FormField
          name="email"
          type="email"
          label={"Email address"} //TODO translate
          placeholder={"Email address"}
          autoComplete="email"
          tabIndex={2}
        />
        <FormField
          name="password"
          type="password"
          label={"Password"} //TODO translate
          placeholder={"Password"}
          autoComplete="current-password"
          tabIndex={3}
        />
        {error && (
          <div className="mb-4">
            <Text className="mt-2 text-red">
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
        >
          Create account
        </Button>
        {
          success &&
          <p>
            Account created
          </p>
        }
      </form>
    </FormProvider>
  );
}