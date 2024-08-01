const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <p
          style={{
            fontSize: "3rem",
          }}
          className="text-center text-white mb-4"
        >
          Sign in
        </p>
        <input
          type="text"
          className="rounded-[5px] p-2 mb-3 w-full max-w-xs"
          style={{
            background: "#224957", // TODO: update with Tailwind custom colors
          }}
          placeholder="Email"
        />
        <input
          type="password"
          className="rounded-[5px] p-2 mb-3 w-full max-w-xs"
          style={{
            background: "#224957", // TODO: update with Tailwind custom colors
          }}
          placeholder="Password"
        />
        <div className="flex">
          <input
            type="checkbox"
            name=""
            id=""
            // className=""
            // style={{
            //   background: "#224957", // TODO: update with Tailwind custom colors
            //   color: "#fff", // TODO: update with Tailwind custom colors
            // }}
            className="appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"
          />
          <p className="ml-2">Remember me</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
