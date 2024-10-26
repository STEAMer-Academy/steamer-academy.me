"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CookieIcon } from "lucide-react";
import { CheckmarkCircle01Icon, UnavailableIcon } from "hugeicons-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="whitespace-nowrap text-lg font-semibold">
                  <CookieIcon size={24} className="h-5 w-5" />
                  <span>We Use Cookies</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVisible(false)}
                >
                  <X size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-left text-sm">
              <p>
                We use cookies to enhance your browsing experience, serve
                personalized ads or content, and analyze our traffic. By
                clicking &quot;Accept All&quot;, you consent to our use of
                cookies.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDecline}
                className="bg-red-500 text-black dark:bg-red-400"
              >
                <UnavailableIcon size={24} className="mr-2" />
                <span>Decline</span>
              </Button>
              <Button
                className="bg-green-500 text-black dark:bg-green-400"
                size="sm"
                onClick={handleAccept}
                variant="secondary"
              >
                <CheckmarkCircle01Icon size={24} className="mr-2" />
                <span>Accept</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
