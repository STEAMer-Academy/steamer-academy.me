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

    const form = e.currentTarget;
    const data = new FormData(form);
    const formDataRecord: Record<string, string> = {};

    data.forEach((value, key) => {
      formDataRecord[key] = value as string;
    });

    const formDataEncoded = new URLSearchParams(formDataRecord).toString();

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataEncoded,
      });

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
      <form
        className="space-y-2"
        onSubmit={handleSubmit}
        method="POST"
        data-netlify="true"
        name="newsletter"
      >
        <input type="hidden" name="form-name" value="newsletter" />
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

        <Button
          type="submit"
          className="w-full bg-gray-500 text-white hover:bg-gray-600"
        >
          Subscribe
        </Button>
      </form>

      {formStatus.message && (
        <div className={`mt-2 flex items-center ${formStatus.success ? 'text-green-500' : 'text-red-500'}`}>
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
