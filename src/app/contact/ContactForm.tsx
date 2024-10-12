"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Tick01Icon, MultiplicationSignIcon } from "hugeicons-react";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import { Input } from "@/components/ui/input";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface FormStatus {
  message: string;
  success: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const $theme = useStore(themeStore);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    success: false,
  });

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

      setFormStatus({ message: "Form submitted successfully", success: true });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setFormStatus({
        message: `Form submission error: ${errorMessage}`,
        success: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="feedback"
      method="POST"
      data-netlify="true"
      data-netlify-recaptcha="true"
      className="space-y-6"
    >
      <Input type="hidden" name="form-name" value="feedback" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
        />
      </div>

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
      />

      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={6}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
      ></textarea>

      <Button
        type="submit"
        className="on-hover:bg-blue-600 w-full rounded-md bg-blue-500 px-4 py-2 text-white sm:w-auto"
      >
        Submit
      </Button>

      {formStatus.message && (
        <div className="mt-4 flex items-center">
          {formStatus.success ? (
            <>
              <Tick01Icon className="text-green-500" />
              <p className="ml-2 text-green-500">{formStatus.message}</p>
            </>
          ) : (
            <>
              <MultiplicationSignIcon className="text-red-500" />
              <p className="ml-2 text-red-500">{formStatus.message}</p>
            </>
          )}
        </div>
      )}
    </form>
  );
}
