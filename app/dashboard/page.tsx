import { signOut } from "@/auth";

const page = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="">Sign Out</button>
    </form>
  );
};

export default page;
