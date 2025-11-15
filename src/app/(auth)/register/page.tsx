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
import { register as registerAPI } from "@/services/api/authService";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Username harus diisi" }),
  email: z.string().min(1, { message: "Email/Nomor Handphone harus diisi" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

type FormData = z.infer<typeof registerSchema>;

export default function Register() {

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FormData) => {
    const isEmail = data.email.includes("@");
    const payload = {
      username: data.username,
      email: isEmail ? data.email : "",
      phone: !isEmail ? data.email : "",
      password: data.password,
    };
    try {
      const res = await registerAPI(
        payload.username,
        payload.email,
        payload.phone,
        payload.password
      );
      console.log(res);
      alert("Register Berhasil");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-evenly items-center my-8">
      <div>
        <Image
          src="/logo.jpg"
          alt="logo"
          width={100}
          height={100}
          className="w-96 h-96"
        ></Image>
      </div>
      <form action="" className="p-3" onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Email or Phone number"
                className="border-b border-black w-full outline-none"
                {...register("email")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <input
                type="text"
                placeholder="Name"
                className="border-b border-black w-full outline-none"
                {...register("username")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <input
                type="password"
                placeholder="Password"
                className="border-b border-black w-full outline-none"
                {...register("password")}
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
