import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const GetAppComponent: NextPage<Props> = async ({}) => {
  return (
    <div className="flex flex-col mt-4 justify-center items-center">
      <span className="text-sm">Get the app.</span>
      <div className="mt-4 flex  justify-center items-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.instagram.android"
          className="mr-2"
          target="_blank"
          rel="nofollow noreferrer"
          tabIndex={0}
          role="link"
        >
          <Image
            src="/images/googleplay.png"
            alt="Google Play"
            className="h-10 w-full"
            width={1000}
            height={1000}
            loading="lazy"
          />
        </a>
        <a
          href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1020"
          target="_blank"
          tabIndex={0}
          rel="nofollow noreferrer"
          role="link"
        >
          <Image
            src="/images/microsoft.png"
            alt="Microsoft Store"
            className="h-10 w-full"
            width={1000}
            height={1000}
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
};

export default GetAppComponent;
