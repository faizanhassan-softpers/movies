"use client";

import { authenticate } from "@/app/lib/actions";
import Input from "@/components/Input";
import { useFormState } from "react-dom";

const Page = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center flex-1"
    >
      <div className="flex flex-col items-center">
        <p className="text-center text-white mb-4 font-montserrat font-semibold text-H1">
          Sign in
        </p>
        <Input
          id="emailInput"
          label="Email"
          placeholder="Enter your email"
          type="email"
          containerClass="mb-6"
          name="email"
        />
        <Input
          id="passwordInput"
          label="Password"
          placeholder="Enter your email"
          type="password"
          containerClass="mb-5"
          name="password"
        />
        <div className="flex">
          <input type="checkbox" name="" id="" />
          <p className="ml-2 font-montserrat text-body-small">Remember me</p>
        </div>
        <button className="bg-Primary text-body-regular min-w-full h-[54px] rounded-xl font-montserrat hover:bg-green-600 mt-5">
          Login
        </button>
      </div>
    </form>
  );
};

export default Page;
