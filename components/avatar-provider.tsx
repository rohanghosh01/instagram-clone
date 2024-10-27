import { NextPage } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  url: string | any;
  alt: string | any;
  className?: string;
}

export const AvatarProvider: NextPage<Props> = ({ url, alt, className }) => {
  const src = url ? url : "/images/default-user.png";

  return (
    <div>
      <Avatar className={className}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{alt?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
};
