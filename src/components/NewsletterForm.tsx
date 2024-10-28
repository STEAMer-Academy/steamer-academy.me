"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";

interface FormData {
  email: string;
}

interface FormStatus {
  message: string;
  success: boolean;
}

export function NewsletterForm() {
  const $theme = useStore(themeStore);
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    success: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/data-api/rest/NewsletterSubscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.email }),
      });

      if (!response.ok) {
        throw new Error("Newsletter subscription failed");
      }

      setFormStatus({
        message: "Thanks for subscribing!",
        success: true,
      });
      setFormData({ email: "" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setFormStatus({
        message: `Subscription error: ${errorMessage}`,
        success: false,
      });
    }
  };

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full ${
            $theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-900"
          }`}
        />

        <Button type="submit" className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
            Subscribe
          </div>
        </Button>
      </form>

      {formStatus.message && (
        <div
          className={`mt-2 flex items-center ${formStatus.success ? "text-green-500" : "text-red-500"}`}
        >
          {formStatus.success ? (
            <CheckmarkCircle02Icon className="mr-2 h-4 w-4" />
          ) : (
            <AlertCircleIcon className="mr-2 h-4 w-4" />
          )}
          <p className="text-sm">{formStatus.message}</p>
        </div>
      )}
    </div>
  );
}
