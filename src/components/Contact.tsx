import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  MailAtSign01Icon,
  SmartPhone01Icon,
  MapPinIcon,
  Tick01Icon,
  MultiplicationSignIcon,
} from "hugeicons-react";
import { useStore } from "@nanostores/react";
import { themeStore } from "../stores/themeStore";

// Define form data structure
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// Define form status structure
interface FormStatus {
  message: string;
  success: boolean;
}

export default function Contact() {
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

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const formDataRecord: Record<string, string> = {};

    data.forEach((value, key) => {
      formDataRecord[key] = value as string;
    });
    const formDataEncoded = new URLSearchParams(formDataRecord).toString();

    // Send AJAX request to the hidden form
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-6">
            Welcome to a world of limitless possibilities, where the journey is
            as exhilarating as the destination, and where every moment is an
            opportunity to make your mark on the canvas of existence.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <MailAtSign01Icon className="mr-2" />
              <span>support@steameracademy.me</span>
            </div>
            <div className="flex items-center">
              <SmartPhone01Icon className="mr-2" />
              <span>+88017 7585 4054</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          name="feedback"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="feedback" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
            />
          </div>

          <input
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

          <div data-netlify-recaptcha="true"></div>

          <Button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-500 text-white on-hover:bg-blue-600"
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
      </div>
    </div>
  );
}
