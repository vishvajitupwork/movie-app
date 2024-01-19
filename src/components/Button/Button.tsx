import clx from "classnames";
import React, { PropsWithChildren } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    variant?: "primary" | "secondary";
  };

const Button = (props: ButtonProps) => {
  const { children, className, variant = "primary", ...rest } = props;
  return (
    <button
      className={clx(
        "py-4 px-8 text-base rounded-[10px] font-bold",
        {
          "bg-primary": variant === "primary",
          "border border-white": variant === "secondary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
