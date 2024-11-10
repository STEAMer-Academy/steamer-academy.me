import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      block: ["AUTOMATED"],
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:VERCEL",
        "CATEGORY:MONITOR",
        "CATEGORY:OPTIMIZER",
        "CATEGORY:PREVIEW",
        "CATEGORY:GOOGLE",
        "CATEGORY:TOOL",
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      capacity: 1000,
      interval: 60,
      refillRate: 50,
    }),
  ],
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|\\.js|\\.html|\\.css|\\.ico|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.pdf|\\.doc|\\.txt|\\.xml|\\.less|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.pdf|\\.doc|\\.txt|\\.ico|\\.rss|\\.zip|\\.mp3|\\.rar|\\.exe|\\.wmv|\\.doc|\\.avi|\\.ppt|\\.mpg|\\.mpeg|\\.tif|\\.wav|\\.mov|\\.psd|\\.ai|\\.xls|\\.mp4|\\.m4a|\\.swf|\\.dat|\\.dmg|\\.iso|\\.flv|\\.m4v|\\.torrent|\\.woff|\\.ttf|\\.svg|\\.webmanifest).*)",
  ],
};

export async function middleware(request) {
  const decision = await aj.protect(request, { requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Rate limited. Try again later." },
        { status: 429 },
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot detected. Access denied." },
        { status: 403 },
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 },
      );
    }
  }

  // Rest of your existing middleware logic here
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

  if (
    isPrerender ||
    !isBot ||
    (extension.length && IGNORE_EXTENSIONS.includes(extension))
  ) {
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
