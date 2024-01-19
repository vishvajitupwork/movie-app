import React, { ForwardedRef, forwardRef } from "react";
import clx from "classnames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, error, helperText, ...rest } = props;
    return (
      <div>
        <input
          ref={ref}
          className={clx(
            "bg-input h-[43px] border outline-none focus:ring-0 focus-visible:ring-0 px-4 py-3 rounded-[10px] focus:border-input focus:bg-white focus:text-input transition-all duration-300",
            {
              "border-transparent": !error,
              "border-error focus:border-error text-error focus:text-error":
                error,
            },
            className
          )}
          {...rest}
        />
        {helperText ? (
          <p
            className={clx("mt-1 text-sm", {
              "text-white": !error,
              "text-error": error,
            })}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
