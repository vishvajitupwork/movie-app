"use client";
import { createCountArray } from "@/utils/helpers";
import clx from "classnames";
import React, { PropsWithChildren } from "react";

type PaginationProps = {
  count: number;
  onClickPage: (page: number) => void;
  currentPage: number;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;
const NextButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={clx("font-bold text-base disabled:text-gray-400", className)}
      {...rest}
    >
      {children}
    </button>
  );
};
const CountButton = ({
  children,
  className,
  selected = false,
  ...rest
}: ButtonProps & { selected?: boolean }) => {
  return (
    <button
      className={clx(
        "font-bold text-base h-8 w-8  ml-2 first:ml-0 rounded",
        {
          "bg-card": !selected,
          "bg-primary": selected,
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const Pagination = (props: PaginationProps) => {
  const { count, currentPage, onClickPage } = props;
  const countedArray = createCountArray(count);
  return count > 1 ? (
    <div className="flex justify-center items-center">
      <NextButton
        className="mr-4"
        disabled={currentPage <= 1}
        onClick={
          currentPage > 1 ? () => onClickPage(currentPage - 1) : undefined
        }
      >
        Prev
      </NextButton>
      {countedArray.map((c) => {
        return (
          <CountButton
            key={c}
            selected={c === currentPage}
            onClick={c !== currentPage ? () => onClickPage(c) : undefined}
          >
            {c}
          </CountButton>
        );
      })}
      <NextButton
        className="ml-4"
        disabled={currentPage >= count}
        onClick={
          currentPage <= count - 1
            ? () => onClickPage(currentPage + 1)
            : undefined
        }
      >
        Next
      </NextButton>
    </div>
  ) : null;
};

export default Pagination;
