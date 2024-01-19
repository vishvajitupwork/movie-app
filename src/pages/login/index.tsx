import SignForm from "@/components/signForm";
import React, { useEffect } from "react";
import { Montserrat } from "next/font/google";
import clx from "classnames";
import Cookies from "js-cookie";
import apiconfig from "@/api/apiConfig";
import { useRouter } from "next/router";
const font = Montserrat({ subsets: ["latin"] });

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const accessToken = Cookies.get(apiconfig.accessToken);
  useEffect(() => {
    if (accessToken) {
      router.push("/");
    }
  }, [accessToken]);
  return (
    <section
      className={clx(
        "flex min-h-[calc(100vh-117px)] flex-col items-center justify-center md:p-24 sm:p-10 p-5",
        font.className
      )}
    >
      <div className="max-w-[300px] w-full">
        <h2 className=" text-[64px] font-semibold mb-10 text-center">
          Sign in
        </h2>
        <SignForm />
      </div>
    </section>
  );
};

export default Login;
