"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Spinner as Loader2 } from "@nextui-org/spinner";
import { Textarea, Input, Button } from "@/components/wrapper";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/wrapper";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
    setIsModalOpen(true);
  };

  const handleRecaptchaSubmit = async () => {
    setIsLoading(true);
    setIsModalOpen(false);

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Form submission failed");
      }

      const data = await response.json();
      toast.success(data.message || "Form submitted successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      recaptchaRef.current?.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Form submission error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

        <Button type="submit" disabled={isLoading} className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent aria-describedby="Recaptcha Modal">
          <DialogHeader>
            <DialogTitle>Verify you are human</DialogTitle>
            <DialogDescription>
              Please complete the reCAPTCHA below to submit your message.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleRecaptchaSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
