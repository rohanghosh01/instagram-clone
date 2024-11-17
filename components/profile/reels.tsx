import { NextPage } from "next";
import { Card } from "../ui/card";
import Image from "next/image";

interface Props {}

const ProfileReels: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1 ">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="aspect-square overflow-hidden rounded-none">
            <Image
              src="/images/my-pic.jpg"
              alt={`Post ${i + 1}`}
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileReels;
