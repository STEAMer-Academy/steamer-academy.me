"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Button, Input } from "@/components/wrapper";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  email: string;
}

interface FormStatus {
  message: string;
  type: "success" | "error" | "info" | "loading";
}

export function NewsletterForm() {
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: "Verifying...", type: "loading" });

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setFormStatus({
        message: "Please complete the reCAPTCHA",
        type: "error",
      });
      return;
    }

    setFormStatus({ message: "Subscribing...", type: "loading" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          recaptchaToken: recaptchaValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred while subscribing");
      }

      setFormStatus({
        message: data.message || "Thanks for subscribing!",
        type: "success",
      });
      setFormData({ email: "" });
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Subscription error:", error);
      setFormStatus({
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        type: "error",
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
        />

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        />

        <Button
          type="submit"
          disabled={formStatus?.type === "loading"}
          className="relative p-[3px]"
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
            {formStatus?.type === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {formStatus.message}
              </>
            ) : (
              "Subscribe"
            )}
          </div>
        </Button>
      </form>

      {formStatus && formStatus.type !== "loading" && (
        <div className="mt-2 flex items-center">
          {formStatus.type === "success" && (
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          )}
          {formStatus.type === "error" && (
            <XCircle className="mr-2 h-5 w-5 text-red-500" />
          )}
          {formStatus.type === "info" && (
            <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
          )}
          <p
            className={`text-sm ${
              formStatus.type === "success"
                ? "text-green-500"
                : formStatus.type === "error"
                  ? "text-red-500"
                  : "text-blue-500"
            }`}
          >
            {formStatus.message}
          </p>
        </div>
      )}
    </div>
  );
}
