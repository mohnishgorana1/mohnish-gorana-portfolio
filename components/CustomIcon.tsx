import Image from "next/image";
import React from "react";

interface CustomIconProps {
  src: string;
  size?: number | string;
  color?: string; // Color prop add kiya
  className?: string;
}

const CustomIcon = ({ src, size = 18, className, color }: CustomIconProps) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className || ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt="icon"
        fill
        className="object-contain"
      />
    </div>
  );
};

export default CustomIcon;