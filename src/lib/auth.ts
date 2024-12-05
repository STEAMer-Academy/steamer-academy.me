import { config } from "@/auth.config";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  ...config,
});
