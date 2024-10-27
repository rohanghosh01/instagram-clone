import { NextPage } from "next";
import { TagProps, tags } from "@/configs/footer-tags";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Footer: NextPage<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        "p-0 m-0 flex sm:ml-20 lg:ml-64 max-sm:mb-5 flex-col shrink-0 px-4 items-stretch align-baseline order-5 box-border text-[100%] z-0",
        className
      )}
    >
      <div className="flex flex-col grow-0 relative mb-14 overflow-visible bg-transparent rounded-none justify-center items-center self-auto ">
        <div className="flex flex-wrap grow-0 relative overflow-visible bg-transparent rounded-none justify-center items-baseline self-auto text-center ">
          {tags.map((tag: TagProps, index: number) => (
            <div className="mx-2" key={index}>
              <Link
                href={tag.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="hover:underline no-underline decoration-1"
              >
                <span className="m-0 overflow-visible min-w-0 break-words whitespace-pre-line text-xs text-muted-foreground">
                  {tag.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col grow-0 relative mt-5 overflow-visible bg-transparent rounded-none justify-center items-baseline self-auto ">
          <div className="mx-1 flex gap-4">
            <span className="m-0 overflow-visible min-w-0 break-words whitespace-pre-line text-xs text-muted-foreground">
              English
            </span>
            <span className="m-0 overflow-visible min-w-0 break-words whitespace-pre-line text-xs text-muted-foreground">
              &copy; 2024 Instagram from Meta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
