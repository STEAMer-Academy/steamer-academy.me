"use client";

import { useState } from "react";
import Link from "next/link";
import { ViewIcon as Eye, ViewOffIcon as EyeOff } from "hugeicons-react";
import { GoogleIcon, GitHubIcon } from "@/components/icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthLayout } from "@/components/auth-layout";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        // @ts-ignore
        onRequest: () => {
          return toast.loading("Signing in...", {
            id: "sign-in",
          });
        },
        onSuccess: () => {
          toast.success("Signed in successfully.");
          toast.dismiss("sign-in");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error("Something went wrong. Please try again.", {
            description: ctx.error.message,
          });
        },
      },
    );
  };

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: "/",
    });
  };

  return (
    <AuthLayout>
      <div className="rounded-xl bg-[#0F1218] p-8">
        <h1 className="mb-8 text-3xl font-semibold text-white">Sign in</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="h-12 rounded-md border-gray-800 bg-[#0B0F17] text-white placeholder-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm text-gray-400">
                Password
              </Label>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="h-12 rounded-md border-gray-800 bg-[#0B0F17] pr-10 text-white placeholder-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm text-gray-400">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base font-semibold"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 hover:text-blue-300"
          >
            Sign up
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
            className="relative h-12 w-full bg-white pl-12 text-base font-semibold text-gray-900 hover:bg-gray-50"
            onClick={() => {
              handleOAuthSignIn("google");
            }}
          >
            <GoogleIcon className="absolute left-4 h-5 w-5" />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="relative h-12 w-full bg-[#24292F] pl-12 text-base font-semibold text-white hover:bg-[#24292F]/90"
            onClick={() => {
              handleOAuthSignIn("github");
            }}
          >
            <GitHubIcon className="absolute left-4 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </div>
      </div>

      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent className="border-gray-800 bg-[#0F1218] text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your account&apos;s email address, and we&apos;ll send you a
              link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                className="border-gray-800 bg-[#0B0F17]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
}
