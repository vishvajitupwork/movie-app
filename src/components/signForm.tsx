"use client";
import { Button } from "@/components/Button";
import { Checkbox, Input } from "@/components/FormElements";
import React, { useId } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "@/validations/user";
import { z } from "zod";

import { toast } from "react-toastify";
import { login } from "@/api/auth";
import Cookies from "js-cookie";
import apiconfig from "@/api/apiConfig";
import { useRouter } from "next/router";
type Props = {};
const loginFields: (Record<string, any> & {
  name: keyof LoginFields;
})[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    defaultValue: "aslihaif@gmail.com",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    defaultValue: "Ankit@123",
  },
  {
    type: "checkbox",
    name: "remember_me",
    defaultValue: false,
  },
];
export type LoginFields = z.infer<typeof loginValidator>;

const SignForm = (props: Props) => {
  const router = useRouter();
  const id = useId();
  const { control, handleSubmit } = useForm<LoginFields>({
    resolver: zodResolver(loginValidator),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (e) => {
    try {
      const result = await login(e);
      if (result?.status) {
        if (result?.data.token) {
          Cookies.set(apiconfig.accessToken, result?.data.token);

          router.push("/");
        }
      } else {
        toast("Please make sure email and password are correct.", {
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
    } catch (error) {
      console.info(error);
      toast("Please make sure email and password are correct.", {
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

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {loginFields.map((fields) => {
        const key = `${fields?.name}${id}`;
        return (
          <Controller
            key={key}
            control={control}
            name={fields?.name}
            render={({ field, fieldState: { error } }) => {
              if (fields?.type === "checkbox" && field.name === "remember_me") {
                return (
                  <div className="flex justify-center items-center">
                    <Checkbox id={key} {...field} value={String(field.value)} />
                    <label
                      htmlFor={key}
                      className="inline-flex ml-2 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                );
              }
              return (
                <Input
                  {...field}
                  value={field.value as string}
                  error={Boolean(error?.message?.length)}
                  helperText={
                    Boolean(error?.message?.length) ? error?.message : undefined
                  }
                  className="w-full"
                  placeholder={fields.placeholder as string}
                  type={fields?.type as string}
                />
              );
            }}
          />
        );
      })}

      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default SignForm;
