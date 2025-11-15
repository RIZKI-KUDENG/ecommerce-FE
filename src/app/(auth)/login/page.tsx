"use client";
import {
  FieldSet,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/services/api/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Email harus diisi" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const {login: loginAuth} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });


  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data.identifier, data.password);
      console.log(res);
      loginAuth(res.token);
      alert("Login Berhasil");
      router.push("/");
    }catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex justify-evenly items-center my-8 py-4">
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
              <FieldLabel htmlFor="email">Email or Phone</FieldLabel>
              <Input
                type="text"
                placeholder="Email or Phone number"
                className="border-b border-black w-full outline-none"
                {...register("identifier")}
              />
              {errors.identifier && (
                <FieldError>{errors.identifier.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                placeholder="Password"
                className="border-b border-black w-full outline-none"
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
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
