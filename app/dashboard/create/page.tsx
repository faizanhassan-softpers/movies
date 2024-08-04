'use client';

import { getLoggedInUserId } from "@/utils/functions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from 'react';

const Page = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [publishingYear, setPublishingYear] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0] || null;
    setSelectedFile(file);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handlePublishingYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublishingYear(event.target.value);
  }

  const handleSubmit = async () => {
    if (selectedFile !== null && title !== '' && publishingYear !== '') {
      try {
        // Upload the file and get the path
        const arrayBuffer = await selectedFile?.arrayBuffer();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/octect-stream',
            },
            body: arrayBuffer
          });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.path;

          const owner = await getLoggedInUserId();

          const createMovieData = {
            owner,
            title,
            publishingYear: Number(publishingYear),
            imageUrl
          };

          const result = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(createMovieData)
            });
        } else {
          console.log('====================================');
          console.log('Error uploading the image');
          console.log('====================================');
        }
      } catch (error) {
        console.log('====================================');
        console.log('Error: ', error);
        console.log('====================================');
      }
    }
  }

  return (
    <div className="mt-6 md:mt-12 lg:mt-[120px] lg:ml-[120px] mx-4 md:mx-12 lg:mx-24  font-semibold">
      <p className="text-2xl lg:text-H2 font-montserrat">Create a new movie</p>
      <div className="flex flex-col lg:flex-row mt-10 lg:mt-20">
        <div className="h-64 w-full lg:w-[473px] lg:h-[504px] border-2 rounded-md border-dotted border-white bg-Input flex items-center justify-center">
          <div className="flex flex-col items-center">
            <input type="file" onChange={handleFileChange} />
            <Image
              src="/svgs/download.svg"
              alt="Upload"
              width={30}
              height={37}
              priority
            />
            <p className="font-montserrat font-normal mt-5 text-center">
              Drop an image here
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8 lg:mt-0 w-full lg:w-1/2 lg:ml-20">
          <input
            id="title"
            placeholder="Title"
            type="text"
            className="rounded-lg bg-Input text-white font-montserrat font-normal w-full lg:max-w-[350px] h-12 text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            id="publishing-year"
            placeholder="Publishing year"
            type="text"
            className="rounded-lg bg-Input text-white font-montserrat font-normal w-full lg:max-w-[216px] h-12 text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat mt-4"
            value={publishingYear}
            onChange={handlePublishingYearChange}
          />
          <div className="flex flex-col lg:flex-row gap-4 mt-8 lg:mt-10">
            <button className="bg-Background outline-white outline outline-1 text-body-regular w-full lg:w-[167px] h-12 rounded-md font-montserrat hover:bg-Input">
              Cancel
            </button>
            <button
              className="bg-Primary text-body-regular w-full lg:w-[167px] h-12 rounded-md font-montserrat hover:bg-green-600 mt-4 lg:mt-0 font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
