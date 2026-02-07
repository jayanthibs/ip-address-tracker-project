// scripts/make-secret.js
import { writeFileSync } from "fs";
import { join } from "path";

// Name of your env var as set in Netlify (example: IP_API_KEY)
const apiKey = process.env.IP_API_KEY || "";

if (!apiKey) {
  console.warn("Warning: IP_API_KEY is empty");
}

const out = `export const API_KEY = "${apiKey}";\n`;

// Adjust this path to where your front-end code expects secret.js
const outPath = join(__dirname, "..", "ip-address-tracker-master", "secret.js");

writeFileSync(outPath, out);
console.log("secret.js generated");

