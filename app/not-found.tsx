import Footer from "@/components/footer";
import DesktopSidebar from "@/components/navbar/desktop-sidebar";
import MobileNav from "@/components/navbar/mobile-navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found • Instagram",
  description: "Instagram",
};

export default function NotFound() {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden flex-1">
      {/* Sidebar - always fixed on larger screens, hidden on mobile */}
      {session ? (
        <div className="hidden sm:flex fixed w-20 min-[1236px]:w-64 h-screen top-0 z-10 bg-transparent">
          <DesktopSidebar />
        </div>
      ) : (
        <header className="h-14 w-full border-b flex items-center p-2">
          <div className="flex-1 ml-[20%] max-md:ml-0">
            <Image
              src="/images/Instagram-logo-text.png"
              alt="Instagram-logo-text.png"
              className="w-[120px] h-full  dark:filter dark:invert "
              width={1000}
              height={1000}
              loading="lazy"
            />
          </div>
          <div className="flex ml-auto mr-[20%] max-md:mr-0 gap-1">
            <Link href="/accounts/login">
              <Button className="bg-sky-400 hover:bg-sky-500 text-white h-7">
                Log In
              </Button>
            </Link>

            <Link href="/accounts/signup">
              <Button className="bg-transparent hover:bg-transparent text-blue-400 dark:hover:text-white  hover:text-black h-7">
                Sign Up
              </Button>
            </Link>
          </div>
        </header>
      )}

      {/* Main content - scrollable and adjusts according to the sidebar */}
      <main
        className={cn(
          "ml-0 p-4 overflow-auto w-full flex flex-col text-center gap-8 mt-4",
          session ? " sm:ml-20 lg:ml-28" : "ml-0"
        )}
      >
        <p className="text-2xl font-semibold">
          Sorry, this page isn't available.
        </p>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to Instagram.
        </p>
      </main>

      {session && (
        <div className="sm:hidden fixed bottom-0 h-14 w-full z-10">
          <MobileNav />
        </div>
      )}

      <div className={cn("mt-auto", session ? "mr-0" : "mr-40 max-md:mr-0")}>
        <Footer />
      </div>
    </div>
  );
}
