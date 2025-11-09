"use client";
import {
  FieldSet,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/services/api/authService";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(data.identifier, data.password);
      localStorage.setItem("token", res.token);
      console.log(res);
      alert("Login Berhasil");
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message || "Terjadi kesalahan");
    }
  };
  return (
    <div className="flex justify-evenly items-center h-screen">
      <div>
        <Image
          src="/logo.jpg"
          alt="logo"
          width={100}
          height={100}
          className="w-96 h-96"
        ></Image>
      </div>
      <form action="" className=" p-3" onSubmit={handleSubmit}>
        <FieldSet>
          <h1 className="text-3xl font-bold">Log in to Exclusive</h1>
          <FieldDescription className="text-md">
            Enter your details below
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email or Phone</FieldLabel>
              <input
                type="text"
                placeholder="Email or Phone number"
                className="border-b border-black w-full outline-none"
                name="identifier"
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <input
                type="password"
                placeholder="Password"
                className="border-b border-black w-full outline-none"
                name="password"
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-5 flex flex-col gap-3 items-center w-full">
          <Button className="bg-red-400 hover:bg-red-600 w-full" type="submit">
            Log in
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Sign in with Google
          </Button>
          <div className="flex justify-between w-full">
            <h5 className="text-sm text-red-400">Forgot Password?</h5>
            <Link
              href="/register"
              className="text-sm text-red-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
