import { NextResponse } from "next/server";
import arcjet, { shield } from "@arcjet/next";

// Initialize Arcjet with your API key
const aj = new arcjet(process.env.ARCJET_API_KEY);

// Define rules for Arcjet
const rules = {
  // Rate limit to 100 requests per minute
  rateLimit: {
    requests: 100,
    period: "1m",
  },
  // Block requests from known bad IP addresses
  ipBlock: true,
  // Protect against common web attacks
  webAttackBlock: true,
  // Enable Shield for advanced bot detection and protection
  shield: shield.enable({
    // Customize Shield options as needed
    mode: "LIVE",
  }),
};

export async function middleware(request) {
  const userAgent = request.headers.get("user-agent");
  const bots = [
    "googlebot",
    "yahoo! slurp",
    "bingbot",
    "yandex",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest/0.",
    "developers.google.com/+/web/snippet",
    "slackbot",
    "vkshare",
    "w3c_validator",
    "redditbot",
    "applebot",
    "whatsapp",
    "flipboard",
    "tumblr",
    "bitlybot",
    "skypeuripreview",
    "nuzzel",
    "discordbot",
    "google page speed",
    "qwantify",
    "pinterestbot",
    "bitrix link preview",
    "xing-contenttabreceiver",
    "chrome-lighthouse",
    "telegrambot",
    "integration-test", // Integration testing
  ];

  const IGNORE_EXTENSIONS = [
    ".js",
    ".css",
    ".xml",
    ".less",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".pdf",
    ".doc",
    ".txt",
    ".ico",
    ".rss",
    ".zip",
    ".mp3",
    ".rar",
    ".exe",
    ".wmv",
    ".doc",
    ".avi",
    ".ppt",
    ".mpg",
    ".mpeg",
    ".tif",
    ".wav",
    ".mov",
    ".psd",
    ".ai",
    ".xls",
    ".mp4",
    ".m4a",
    ".swf",
    ".dat",
    ".dmg",
    ".iso",
    ".flv",
    ".m4v",
    ".torrent",
    ".woff",
    ".ttf",
    ".svg",
    ".webmanifest",
  ];
  const isBot =
    userAgent && bots.some((bot) => userAgent.toLowerCase().includes(bot));
  const isPrerender = request.headers.get("X-Prerender");
  const pathname = new URL(request.url).pathname;
  const extension = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 1);

  // Skip Arcjet and prerendering for static assets
  if (extension.length && IGNORE_EXTENSIONS.includes(extension)) {
    return NextResponse.next();
  }

  // Run Arcjet protection with Shield
  try {
    const result = await aj.run(request, rules);

    if (result.action === "block") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (result.action === "throttle") {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    if (result.action === "challenge") {
      // Handle Shield challenge
      return result.response;
    }

    // For any other action, continue with the existing logic
  } catch (error) {
    console.error("Arcjet error:", error);
    // Continue with the existing logic in case of Arcjet error
  }

  if (isPrerender || !isBot) {
    return NextResponse.next();
  } else {
    // Check if request is coming from a bot
    if (isBot) {
      const newURL = `https://service.prerender.io/${request.url}`;
      const newHeaders = new Headers(request.headers);
      //Do not forget to add your Prerender token as an environment variable
      newHeaders.set("X-Prerender-Token", process.env.PRERENDER_TOKEN);
      newHeaders.set("X-Prerender-Int-Type", "NextJS");

      const res = await fetch(
        new Request(newURL, {
          headers: newHeaders,
          redirect: "manual",
        }),
      );

      const responseHeaders = new Headers(res.headers);
      responseHeaders.set("X-Redirected-From", request.url);

      return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
      });
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
