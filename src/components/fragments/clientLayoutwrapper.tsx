"use client";

import { usePathname } from "next/navigation";
import ClientNavbar from "./clientNavbar";
import Footer from "./footer";
import { AuthProvider } from "@/context/AuthContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hiddenPath = [
    "/dashboard",
    "/dashboard/add-product",
    "/dashboard/add-variant",
    "/dashboard/add-stock",
  ];
  const shouldHide = hiddenPath.some((path) => path === pathname);
  return (
    <AuthProvider>
      {!shouldHide && <ClientNavbar />}
      {children}
      {!shouldHide && <Footer />}
    </AuthProvider>
  );
}
