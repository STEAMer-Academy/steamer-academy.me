import { createSerwistRoute } from "@serwist/turbopack";

export const { dynamic, dynamicParams, generateStaticParams, GET, revalidate } =
  createSerwistRoute({
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,
  });
