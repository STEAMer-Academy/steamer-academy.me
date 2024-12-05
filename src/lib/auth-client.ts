import { createAuthClient } from "better-auth/react";
import { twoFactorClient, passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://www.steameracademy.me"
      : "http://localhost:3000",
  plugins: [twoFactorClient(), passkeyClient()],
});
