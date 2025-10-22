import { NextResponse, NextRequest } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:OPTIMIZER",
        "CATEGORY:PREVIEW",
        "CATEGORY:GOOGLE",
        "CATEGORY:TOOL",
        "CATEGORY:SOCIAL",
        "CATEGORY:ARCHIVE",
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

const isPublicRoute = createRouteMatcher([
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/auth/user-profile(.*)",
]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|\\.js|\\.html|\\.css|\\.ico|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.pdf|\\.doc|\\.txt|\\.xml|\\.less|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.pdf|\\.doc|\\.txt|\\.ico|\\.rss|\\.zip|\\.mp3|\\.rar|\\.exe|\\.wmv|\\.doc|\\.avi|\\.ppt|\\.mpg|\\.mpeg|\\.tif|\\.wav|\\.mov|\\.psd|\\.ai|\\.xls|\\.mp4|\\.m4a|\\.swf|\\.dat|\\.dmg|\\.iso|\\.flv|\\.m4v|\\.torrent|\\.woff|\\.ttf|\\.svg|\\.webmanifest).*)",
    "/(api|trpc)(.*)",
  ],
};

export async function proxy(request: NextRequest) {
  clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  });

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

  return NextResponse.next();
}
