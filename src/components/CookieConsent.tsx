"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CookieIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/wrapper";
import { CheckmarkCircle01Icon, UnavailableIcon } from "hugeicons-react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { useQueryState } from "nuqs";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useQueryState("cookieConsentVisible", {
    parse: (value) => value === "true",
    serialize: (value) => value.toString(),
    defaultValue: false,
  });

  const [consentGiven, setConsentGiven] = useQueryState("cookieConsentGiven", {
    parse: (value) => value === "true",
    serialize: (value) => value.toString(),
    defaultValue: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setConsentGiven(true);
    } else if (!consent) {
      setIsVisible(true);
    }
  }, [setConsentGiven, setIsVisible]);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsentGiven(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setConsentGiven(false);
    setIsVisible(false);
    window.location.reload();
  };

  return (
    <>
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
                  clicking &quot;Accept&quot;, you consent to our use of
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
      <GoogleAnalytics consentGiven={consentGiven || false} />
    </>
  );
}
