import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MailAtSign01Icon,
  SmartPhone01Icon,
  MapPinIcon,
} from "hugeicons-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(""); // To display form submission status

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const formDataRecord: Record<string, string> = {};
    data.forEach((value, key) => {
      formDataRecord[key] = value as string;
    });

    const formDataEncoded = new URLSearchParams(formDataRecord).toString();

    try {
      await fetch("/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataEncoded,
      });

      setFormStatus("Form successfully submitted");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        setFormStatus("Form submission error: " + error.message);
      } else {
        setFormStatus("Form submission error: " + error);
      }
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
            opportunity to make your mark on the canvas of existence. The only
            limit is the extent of your imagination.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <MailAtSign01Icon className="mr-2" />
              <span>steamerbangladesh@gmail.com</span>
            </div>
            <div className="flex items-center">
              <SmartPhone01Icon className="mr-2" />
              <span>+88017 7585 4054</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2" />
              <span>Mirpur-2, Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} name="contact" className="space-y-4">
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            name="email"
            type="email"
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

          <Button type="submit">Submit</Button>

          {formStatus && <p className="mt-4 text-green-500">{formStatus}</p>}
        </form>
      </div>
    </div>
  );
}
