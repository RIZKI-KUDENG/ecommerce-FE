"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CustomJwtPayload {
  username: string;
}

export default function Navbar({ pathname }: { pathname: string }) {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
 

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const username = decodedToken ? decodedToken.username : null;
  return (
    <div className="border-b">
      <nav className="flex justify-around items-center h-17">
        <div>
          <h1 className="text-3xl font-bold">Exclusive</h1>
        </div>
        <div>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#">Contact</Link>
            </li>
            <li>
              <Link href="/#">About</Link>
            </li>
            {pathname === "/register" ? (
              <li>
                <Link href="/login">Sign In</Link>
              </li>
            ) : (
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input type="text" className="border rounded bg-slate-100 " />
            <Image
              src="/search.png"
              alt="search"
              width={100}
              height={100}
              className="w-6 h-6 border bg-slate-100"
            />
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn &&
              ["/favorit.png", "/cart.png"].map((item, index) => (
                <Image
                  src={item}
                  alt={item}
                  width={100}
                  height={100}
                  className="w-6 h-6"
                  key={index}
                />
              ))}
            {isLoggedIn && (
              <div className="flex items-center gap-2 ">
                <Image
                  src="/user.png"
                  alt="profile"
                  width={100}
                  height={100}
                  className="w-6 h-6 cursor-pointer"
                />
                <ul className="flex gap-2">
                  <li>{username}</li>
                  <li className="cursor-pointer hover:underline" onClick={handleLogout}>logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
