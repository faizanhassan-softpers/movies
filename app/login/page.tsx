const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <p className="text-center text-white mb-4 font-montserrat font-semibold text-H1">
          Sign in
        </p>
        <input
          type="text"
          className="rounded-[10px] p-2 mb-3 max-w-xs bg-Input text-white placeholder:text-white font-montserrat font-normal w-[300px] h-[45px] text-body-small pl-4 focus:outline-none focus:border-transparent"
          placeholder="Email"
        />
        <input
          type="password"
          className="rounded-[10px] p-2 mb-3 max-w-xs bg-Input text-white placeholder:text-white font-montserrat font-normal w-[300px] h-[45px] text-body-small pl-4 focus:outline-none focus:border-transparent"
          placeholder="Password"
        />
        <div className="flex">
          <input
            type="checkbox"
            name=""
            id=""
            className="appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none"
          />
          <p className="ml-2">Remember me</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
