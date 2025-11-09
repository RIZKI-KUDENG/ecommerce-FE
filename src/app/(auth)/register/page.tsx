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
import { useState } from "react";
import { register } from "@/services/api/authService";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      alert("Username dan password wajib diisi");
      return;
    }
    if (!data.email) {
      alert("Masukkan email atau nomor HP");
      return;
    }
    const isEmail = data.email.includes("@");
    const payload = {
      username: data.username,
      email: isEmail ? data.email : "",
      phone: !isEmail ? data.email : "",
      password: data.password,
    };
    try {
      const res = await register(
        payload.username,
        payload.email,
        payload.phone,
        payload.password
      );
      console.log(res);
      alert("Register Berhasil");
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message || "Terjadi kesalahan");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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
      <form action="" className="p-3" onSubmit={handleSubmit}>
        <FieldSet>
          <h1 className="text-3xl font-bold">Log in to Exclusive</h1>
          <FieldDescription className="text-md">
            Enter your details below
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                type="text"
                name="email"
                placeholder="Email or Phone number"
                className="border-b border-black w-full"
                value={data.email}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <input
                type="text"
                placeholder="Name"
                name="username"
                className="border-b border-black w-full"
                value={data.username}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="border-b border-black w-full"
                value={data.password}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-5 flex flex-col gap-3 items-center w-full">
          <Button className="bg-red-400 hover:bg-red-600 w-full" type="submit">
            Create Account
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Sign up with Google
          </Button>
          <div className="flex justify-between w-full">
            <h5 className="text-sm text-red-400">Already have an account?</h5>
            <Link
              href="/login"
              className="text-sm text-red-400 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
