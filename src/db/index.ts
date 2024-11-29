import { drizzle } from "drizzle-orm/xata-http";
import { getXataClient } from "@/xata"; // Generated client

async function main() {
  const xata = getXataClient();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const db = drizzle(xata);
}

main();
