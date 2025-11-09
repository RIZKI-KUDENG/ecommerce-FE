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

export default function Register() {
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
      <form action="" className=" p-3">
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
                className="border-b border-black w-full"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <input
                type="text"
                placeholder="Name"
                className="border-b border-black w-full"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <input
                type="password"
                placeholder="Password"
                className="border-b border-black w-full"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <div className="mt-5 flex flex-col gap-3 items-center w-full">
          <Button className="bg-red-400 hover:bg-red-600 w-full">
            Create Account
          </Button>
          <Button variant="outline" className="w-full">
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
