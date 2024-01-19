import React, { ForwardedRef, forwardRef, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <label className="h-[18px] w-[18px]">
        <input type="checkbox" ref={ref} className="peer hidden" {...rest} />
        <div className="w-full h-full bg-input cursor-pointer rounded-[5px]  peer-checked:bg-primary peer-checked:text-white flex justify-center items-center transition-all duration-75 text-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10px"
            height="auto"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        </div>
      </label>
    );
  }
);
Input.displayName = "Input";
export default Input;
