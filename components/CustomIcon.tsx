import Image from "next/image";
import React from "react";

interface CustomIconProps {
  src: string;
  size?: number;
  className?: string;
}

const CustomIcon = ({ src, size = 24, className }: CustomIconProps) => {
  return (
    <Image
      src={src}
      alt="icon"
      width={size}
      height={size}
      className={className}
    />
  );
};

export default CustomIcon;
