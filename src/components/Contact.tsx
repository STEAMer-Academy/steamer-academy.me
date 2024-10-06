import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MailAtSign01Icon,
  SmartPhone01Icon,
  MapPinIcon,
  Tick01Icon,
  MultiplicationSignIcon,
} from "hugeicons-react";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({ message: "", success: false });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const form = e.currentTarget;
    const data = new FormData(form);
    const formDataRecord = {};
    data.forEach((value, key) => {
      formDataRecord[key] = value;
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
      setFormStatus({
        message: `Form submission error: ${error.message || error}`,
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
          className="space-y-4"
        >
          {/* Hidden input for Netlify form handling */}
          <input type="hidden" name="form-name" value="feedback" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="border p-2 rounded w-full"
          ></textarea>

          <Button type="submit">Submit</Button>

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
