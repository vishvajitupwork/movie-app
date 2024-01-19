"use client";
import { Movie, createMovie, updateMovie, uploadImage } from "@/api/movie";
import { Button } from "@/components/Button";
import { Input } from "@/components/FormElements";
import { MoviePayload, movieValidator } from "@/validations/movie";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useCallback, useId, useMemo, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import InfiniteLoadingIcon from "./LoadingIcon";
import Image from "next/image";
export type AddressFromType = "ADD" | "EDIT";
type Props =
  | {
      type: "ADD";
    }
  | {
      type: "EDIT";
      defaultValues: Movie;
    };

const fields = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
  },
  {
    name: "publishYear",
    type: "text",
    placeholder: "Publishing year",
  },
];
const baseStyle = {
  display: "flex",
  flexDirection: "column" as React.CSSProperties["flexDirection"],
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  //   backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  background: "#224957",
  height: "500px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const MovieForm = (props: Props) => {
  const router = useRouter();
  const id = useId();
  const [files, setFiles] = useState<{ file?: File; preview?: string }>({
    file: undefined,
    preview: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { control, getValues, setValue, handleSubmit } = useForm({
    resolver: zodResolver(movieValidator),
    defaultValues:
      props.type === "EDIT" && props.defaultValues?.title
        ? {
            title: props.defaultValues?.title,
            posterUrl: props.defaultValues?.posterUrl,
            publishYear: props.defaultValues.publishYear,
          }
        : undefined,
  });
  const onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const a = {
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      };

      setFiles(a);
      setValue("posterUrl", URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, ...rest } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(rest?.isFocused ? focusedStyle : {}),
      ...(rest?.isDragAccept ? acceptStyle : {}),
      ...(rest?.isDragReject ? rejectStyle : {}),
    }),
    [rest.isFocused, rest.isDragAccept, rest.isDragReject]
  );
  const onSubmit = async () => {
    const values = getValues();
    setIsLoading(true);
    const createPost = async (posterUrl: string) => {
      try {
        const result = await createMovie({
          title: values?.title,
          publishYear: values?.publishYear,
          posterUrl,
        } as MoviePayload);
        toast("Movie has been created", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,

          type: "success",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        router.push("/").then(() => {
          router.reload();
        });
      } catch (error) {
        console.info(error);
        setIsLoading(false);
        toast("Something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,

          type: "error",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    };
    const updatePostInternal = async (posterUrl: string) => {
      if (props.type === "EDIT" && props.defaultValues?._id) {
        try {
          const result = await updateMovie(
            {
              title: values?.title,
              publishYear: values?.publishYear,
              posterUrl,
            } as MoviePayload,
            props.defaultValues._id
          );

          toast("Movie has been updated", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,

            type: "success",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setIsLoading(false);
          router.reload();
        } catch (error) {
          console.info(error);
          setIsLoading(false);
          toast("Something went Wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,

            type: "error",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      }
    };
    try {
      if (files?.file) {
        const formData = new FormData();
        formData.append("image", files?.file as File);
        const result = await uploadImage(formData);
        if (props.type === "ADD") {
          await createPost(result?.data.fileUrl);
        } else {
          await updatePostInternal(result?.data.fileUrl);
        }
      } else {
        if (props.type === "EDIT") {
          await updatePostInternal(values?.posterUrl);
        }
      }
    } catch (error) {
      console.info(error);
      if (props.type === "ADD") {
        await createPost(values?.posterUrl);
      } else {
        await updatePostInternal(values?.posterUrl);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 grid-flow-row">
        <div className="md:col-span-6 md:row-start-1 md:row-end-5 col-span-12 flex justify-center md:justify-start items-center">
          <Controller
            control={control}
            name="posterUrl"
            render={({ field }) => {
              return (
                <div className="md:max-w-[80%] w-full">
                  {field?.value?.length ? (
                    <div className="relative">
                      <Image
                        className=" w-full max-h-[500px] rounded-[10px] object-cover"
                        src={field?.value}
                        alt={files.file?.name as string}
                        height={500}
                        width={300}
                      />
                      <button
                        className="text-black absolute right-3 top-2"
                        onClick={() => {
                          setFiles({});
                          setValue("posterUrl", "");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="currentColor"
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m1.41-1.41A8 8 0 1 0 15.66 4.34A8 8 0 0 0 4.34 15.66m9.9-8.49L11.41 10l2.83 2.83l-1.41 1.41L10 11.41l-2.83 2.83l-1.41-1.41L8.59 10L5.76 7.17l1.41-1.41L10 8.59l2.83-2.83z"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      {...getRootProps({ style })}
                      //    className="w-full h-[500px] border border-white border-dashed max-w-[80%] rounded-[10px] flex justify-center items-center flex-col"
                    >
                      <input {...getInputProps()} />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_3_346)">
                          <path
                            d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3_346">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="text-sm mt-2">Drop an image here</p>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
        <div className="md:col-span-4 row-start-1 md:row-end-2 col-span-12">
          {fields?.map((el) => {
            return (
              <Controller
                control={control}
                key={`${el?.name}${id}`}
                name={el?.name as keyof MoviePayload}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="mb-6">
                      <Input
                        type={el?.type}
                        placeholder={el?.placeholder}
                        className={
                          field?.name === "publishYear"
                            ? "md:w-1/2 w-full"
                            : "w-full"
                        }
                        error={Boolean(error?.message?.length)}
                        helperText={
                          Boolean(error?.message?.length)
                            ? error?.message
                            : undefined
                        }
                        {...field}
                        onChange={
                          el?.name === "publishYear"
                            ? (e) => field.onChange(Number(e?.target?.value))
                            : field.onChange
                        }
                      />
                    </div>
                  );
                }}
              />
            );
          })}
        </div>
        <div className="md:col-span-4 flex md:row-start-2 md:row-end-4 col-span-12 mt-7">
          <Button
            type="button"
            variant="secondary"
            className="w-1/2"
            disabled={isLoading}
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>

          <Button
            disabled={isLoading}
            type="submit"
            className="ml-3 w-1/2 text-center"
          >
            {isLoading ? <InfiniteLoadingIcon /> : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MovieForm;
