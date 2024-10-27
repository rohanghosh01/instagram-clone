import Footer from "@/components/footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden">
      {children}
      <Footer />
    </div>
  );
}
