"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData, {
      callbackUrl: "http://localhost:3000/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "From actions, Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
