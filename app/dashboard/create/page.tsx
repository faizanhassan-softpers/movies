import Image from "next/image";

const page = () => {
  return (
    <div className="mt-[120px] ml-[120px] font-semibold">
      <p className="text-H2 font-montserrat">Create a new movie </p>
      <div className="flex flex-row mt-20">
        <div className="h-[504px] w-[473px] border-2 rounded-md border-dotted border-white border-1 bg-Input">
          <div className="flex flex-col h-full justify-center items-center">
            <input type="file" name="" id="" className="hidden" />
            <Image
              className=""
              src="/svgs/download.svg"
              alt="Next.js Logo"
              width={30}
              height={37}
              priority
            />
            <p className="font-montserrat font-normal mt-5">
              Drop an image here
            </p>
          </div>
        </div>
        <div className="ml-60 flex-col flex">
          <input
            id="title"
            placeholder="Title"
            type="text"
            className="rounded-[10px] max-w-xs bg-Input text-white font-montserrat font-normal w-[400px] h-[45px] text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat"
          />
          <input
            id="title"
            placeholder="Pulishing year"
            type="text"
            className="rounded-[10px] max-w-xs bg-Input text-white font-montserrat font-normal w-[200px] h-[45px] text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat mt-5"
          />
          <div className="flex flex-row gap-2 mt-20">
            <button className="bg-Background outline-white outline outline-1 text-body-regular w-1/2 h-[54px] rounded-xl font-montserrat hover:bg-green-600 mt-5">
              Cancel
            </button>
            <button className="bg-Primary text-body-regular w-1/2 h-[54px] rounded-xl font-montserrat hover:bg-green-600 mt-5 font-bold">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
