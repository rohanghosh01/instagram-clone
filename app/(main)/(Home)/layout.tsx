import DesktopSidebar from "@/components/navbar/desktop-sidebar";
import MobileNav from "@/components/navbar/mobile-navbar";
import Header from "@/components/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row h-screen z-10">
      <Header />

      {/* Sidebar - always fixed on larger screens, hidden on mobile */}
      <div className="hidden sm:flex fixed w-20 min-[1236px]:w-64 h-screen top-0 z-10 bg-transparent">
        <DesktopSidebar />
      </div>

      {children}

      {/* Mobile navigation for smaller screens */}
      <div className="sm:hidden fixed bottom-0 h-14 w-full z-10">
        <MobileNav />
      </div>
    </div>
  );
}
