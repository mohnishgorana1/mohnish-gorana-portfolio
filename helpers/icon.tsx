// helpers/icon.tsx
import CustomIcon from "@/components/CustomIcon";

export const imgIcon = (src: string) => {
  // 1. Anonymous function ko ek naam de diya
  const IconComponent = (props: any) => <CustomIcon src={src} {...props} />;
  
  // 2. Display name set kar diya (Warning fixed!)
  IconComponent.displayName = "CustomImgIcon"; 
  
  return IconComponent;
};