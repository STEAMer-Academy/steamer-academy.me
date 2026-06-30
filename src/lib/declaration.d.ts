declare module "tailwindcss/lib/util/flattenColorPalette" {
  export default function flattenColorPalette(
    pallette: Record<string, string>,
  ): Record<string, string>;
}

// Global injected by the root layout for pre-loaded search data
declare global {
  interface Window {
    __SEARCH_DATA__?: unknown;
  }
}

export {};
