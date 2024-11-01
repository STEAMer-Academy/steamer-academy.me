"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: "Subscribing...", type: "loading" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setFormStatus({
            message: data.message,
            type: "info",
          });
        } else {
          throw new Error(data.message || "Newsletter subscription failed");
        }
      } else {
        setFormStatus({
          message: data.message || "Thanks for subscribing!",
          type: "success",
        });
        setFormData({ email: "" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setFormStatus({
        message: `Subscription error: ${errorMessage}`,
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
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </div>
        </Button>
      </form>

      {formStatus && (
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
