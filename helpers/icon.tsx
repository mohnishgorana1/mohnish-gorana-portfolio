import CustomIcon from "@/components/CustomIcon";

export const imgIcon = (src: string) => {
  return (props: any) => <CustomIcon src={src} {...props} />;
};
