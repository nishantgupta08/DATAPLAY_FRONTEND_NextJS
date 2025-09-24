import React from "react";
import cx from "classnames";
import { Icon } from "@iconify/react";

const Button = ({
  title,
  icon = " ",
  className = "",
  variant = "darkOrange",
  isLink = false,
  href = "#",
}: {
  title?: string;
  icon?: string;
  className?: string;
  variant?: "darkOrange" | "lightOrange";
  isLink?: boolean;
  href?: string;
}) => {
  const classes = cx(
    className,
    ` text-white px-6 lg:px-8 py-2 lg:py-3 rounded-full text-base lg:text-lg font-semibold transition-all flex items-center gap-2 cursor-pointer active:translate-y-1  `,
    {
      [`bg-orange hover:bg-darkOrange drop-shadow-[0px_4px_0_#FF4C3D] active:drop-shadow-[0px_2px_0_#FF6464]`]:
        variant === "lightOrange",
    },
    {
      [`bg-darkOrange hover:bg-orange drop-shadow-[0px_4px_0_black] active:drop-shadow-[0px_2px_0_black]`]:
        variant === "darkOrange",
    }
  );

  return isLink ? (
    <a href={href} className={classes}>
      {title}
      {icon && <Icon icon={icon} className="size-6" />}
    </a>
  ) : (
    <>
      <button className={classes}>
        {title}
        {icon && <Icon icon={icon} className="size-6" />}
      </button>
    </>
  );
};

export default Button;
