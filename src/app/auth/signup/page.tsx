"use client";

import { useState } from "react";
import Link from "next/link";
import { ViewIcon as Eye, ViewOffIcon as EyeOff } from "hugeicons-react";
import { GoogleIcon, GitHubIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthLayout } from "@/components/auth-layout";
import { authClient } from "@/lib/authClient";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: undefined,
      },
      {
        onRequest: () => {
          <Loader />;
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  const signUpWithSocial = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/",
    });
  };

  return (
    <AuthLayout>
      <div className="rounded-xl bg-[#0F1218] p-8">
        <h1 className="text-2xl font-semibold text-white">Sign up</h1>

        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-400">
              Full name
            </Label>
            <Input
              id="name"
              placeholder="Jon Snow"
              className="border-gray-800 bg-[#0B0F17] text-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="border-gray-800 bg-[#0B0F17] text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-400">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="border-gray-800 bg-[#0B0F17] pr-10 text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="updates" />
            <Label htmlFor="updates" className="text-gray-400">
              I want to receive updates via email.
            </Label>
          </div>

          <Button type="submit" className="w-full" onClick={signUp}>
            Sign up
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#0F1218] px-2 text-gray-400">or</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Button
            variant="outline"
            className="relative w-full bg-white pl-12 hover:bg-gray-50"
            onClick={() => {
              signUpWithSocial("google");
            }}
          >
            <GoogleIcon className="absolute left-4 h-5 w-5" />
            <span className="text-gray-600">Sign up with Google</span>
          </Button>
          <Button
            variant="outline"
            className="relative w-full bg-[#24292F] pl-12 text-white hover:bg-[#24292F]/90"
            onClick={() => {
              signUpWithSocial("github");
            }}
          >
            <GitHubIcon className="absolute left-4 h-5 w-5" />
            <span>Sign up with GitHub</span>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
