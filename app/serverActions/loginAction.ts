"use server";

import { login } from "@/lib";
import { redirect } from "next/navigation";

export async function loginAction(
  state: { message: string },
  formData: FormData
) {
  const response = await login(formData);
  if (response.error) {
    return {
      error: true,
      message: "Invalid email or password.",
    };
  }

  redirect("/dashboard");
  return {
    error: false,
    message: "Logged in successfully.",
  };
}
