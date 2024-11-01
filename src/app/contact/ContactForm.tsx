"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormStatus {
  message: string;
  type: "success" | "error" | "info" | "loading";
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ message: "Submitting...", type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          Message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Form submission failed");
      }

      const data = await response.json();
      setFormStatus({
        message: data.message || "Form submitted successfully",
        type: "success",
      });
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setFormStatus({
        message: `Form submission error: ${errorMessage}`,
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={6}
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
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </div>
      </Button>

      {formStatus && (
        <div className="mt-4 flex items-center">
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
    </form>
  );
}
