"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Navbar({ pathname }: { pathname: string }) {
  const [isloggedIn, setIsloggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsloggedIn(!!token);
  }, []);
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
            {pathname === "/login" ? (
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            ) : (
              <li>
                <Link href="/login">Sign In</Link>
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
            {isloggedIn &&
              ["/favorit.png", "/cart.png", "/user.png"].map((item, index) => (
                <Image
                  src={item}
                  alt={item}
                  width={100}
                  height={100}
                  className="w-6 h-6"
                  key={index}
                />
              ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
