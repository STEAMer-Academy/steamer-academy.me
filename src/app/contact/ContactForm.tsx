"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  UserIcon,
  Mail01Icon,
  MessageEdit02Icon,
} from "hugeicons-react";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Form submission failed");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      toast.success(data.message || "Form submitted successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Form submission error: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative">
          <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
        <div className="relative">
          <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="relative">
        <Mail01Icon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="pl-10"
          required
        />
      </div>

      <div className="relative">
        <MessageEdit02Icon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="pl-10"
          required
          rows={6}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="relative p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500" />
        <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </div>
      </Button>
    </form>
  );
}
