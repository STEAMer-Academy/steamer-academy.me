import { createAuthClient } from "better-auth/react";
import { twoFactorClient, passkeyClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  basePath: "https://api.steameracademy.me/auth",
  plugins: [twoFactorClient(), passkeyClient()],
});
