"use client"

import { usePathname } from "next/navigation"
import ClientNavbar from "./clientNavbar"
import Footer from "./footer"

export default function ClientLayoutWrapper({ children } : { children: React.ReactNode }) {
    const pathname = usePathname();
    const hiddenPath = ["/dashboard"]
    const shouldHide = hiddenPath.some((path) => path === pathname);
    return (
        <>
           {!shouldHide && <ClientNavbar />}
            {children}
            {!shouldHide && <Footer />}
        </>
    );
}