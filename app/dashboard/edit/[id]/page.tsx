"use client";

import { getLoggedInUserId } from "@/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface Movie {
  _id: string;
  owner: string;
  title: string;
  publishingYear: number;
  imageUrl: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const validationSchema = Yup.object({
    poster: Yup.string().required("Image is required"),
    title: Yup.string().required("Title is required"),
    publishingYear: Yup.number()
      .typeError("Publishing year must be a number")
      .required("Publishing year is required")
      .positive("Publishing year must be a positive number")
      .integer("Publishing year must be an integer"),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [editData, setEditData] = useState<Movie>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);

  useEffect(() => {
    fetch(`/api/movies/${params.id}`)
      .then((response) => response.json())
      .then((data: { message: string; movie: Movie }) =>
        setEditData(data?.movie)
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setPreviewImage(() => {
      const parts = editData?.imageUrl.split("/");
      const imageName = parts && parts[parts?.length - 1];
      const imagePath =
        process.env.NEXT_PUBLIC_BASE_URL + "/uploads/" + imageName;
      return imagePath;
    });
    setTitle(editData?.title || "");
    setPublishingYear(editData?.publishingYear?.toString() || "");
  }, [editData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0] || null;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file as any);

    setSelectedFile(file);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePublishingYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPublishingYear(event.target.value);
  };

  const onSubmit = async () => {
    if (title !== "" && publishingYear !== "") {
      try {
        let data;
        let imageUrl;
        // Upload the file and get the path
        if (selectedFile) {
          const arrayBuffer = await selectedFile?.arrayBuffer();
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/octect-stream",
              },
              body: arrayBuffer,
            }
          );
          data = await response.json();
          imageUrl = data.path;
        }

        const owner = await getLoggedInUserId();

        const createMovieData = {
          owner,
          title,
          publishingYear: Number(publishingYear),
          imageUrl,
        };

        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${params.id}`,
          {
            method: "PATCH",
            // method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              method: "PATCH",
            },
            body: JSON.stringify(createMovieData),
          }
        );
        toast.success("Movie edited successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.log("====================================");
        console.log("Error: ", error);
        console.log("====================================");
      }
    }
  };

  if (!editData)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-H2 font-montserrat px-4">
        No movie found.
        <button
          className="bg-Primary w-30 p-5 text-center text-body-regular rounded-md hover:bg-green-600 mt-5 font-montserrat font-bold text-md"
          onClick={() => router.push("/dashboard/create")}
        >
          Add a new movie
        </button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 md:mt-12 lg:mt-[120px] lg:ml-[120px] mx-4 md:mx-12 lg:mx-24  font-semibold">
        <p className="text-2xl lg:text-H2 font-montserrat">Edit</p>
        <div className="flex flex-col lg:flex-row mt-10 lg:mt-20">
          {previewImage ? (
            <div className="relative h-64 w-full lg:w-[473px] lg:h-[504px] rounded-md bg-Input flex items-center justify-center">
              <Image
                src={previewImage || (editData?.imageUrl as any)}
                alt="Upload"
                className="rounded-md"
                layout="fill"
                objectFit="cover"
                priority
              />
              <input
                {...register("poster")}
                type="file"
                onChange={handleFileChange}
                className="absolute w-full h-full bg-red-900 opacity-0"
              />
            </div>
          ) : (
            <div className="h-64 w-full lg:w-[473px] lg:h-[504px] border-2 rounded-md border-dotted border-white bg-Input flex items-center justify-center">
              <div className="relative flex flex-col items-center h-full w-full justify-center">
                <input
                  {...register("poster")}
                  type="file"
                  onChange={handleFileChange}
                  className="absolute w-full h-full bg-red-900 opacity-0"
                  required
                />
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
          )}
          <div className="flex flex-col mt-8 lg:mt-0 w-full lg:w-1/2 lg:ml-20">
            {errors.title && (
              <p className="text-red-500 text-sm mb-1">
                {errors.title.message}
              </p>
            )}
            <input
              {...register("title")}
              id="title"
              placeholder="Title"
              type="text"
              className="rounded-lg bg-Input text-white font-montserrat font-normal w-full lg:max-w-[350px] h-12 text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="mt-4">
              {errors.publishingYear && (
                <p className="text-red-500 text-sm mb-1">
                  {errors.publishingYear.message}
                </p>
              )}
              <input
                {...register("publishingYear")}
                id="publishing-year"
                placeholder="Publishing year"
                type="number"
                className="rounded-lg bg-Input text-white font-montserrat font-normal w-full lg:max-w-[216px] h-12 text-body-small pl-4 focus:bg-white focus:outline-none focus:border-Background focus:text-Background placeholder:text-white placeholder:font-montserrat "
                value={publishingYear}
                onChange={handlePublishingYearChange}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-8 lg:mt-10">
              <button
                type="button"
                className="bg-Background outline-white outline outline-1 text-body-regular w-full lg:w-[167px] h-12 rounded-md font-montserrat hover:bg-Input"
              >
                Cancel
              </button>
              <button className="bg-Primary text-body-regular w-full lg:w-[167px] h-12 rounded-md font-montserrat hover:bg-green-600 mt-4 lg:mt-0 font-bold">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
