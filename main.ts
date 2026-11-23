// SPDX-License-Identifier: MIT
// Pickup Lines for Machines — one pickup line, one AI agent to another.
//
// The line: overfitting is when a model learns its training data too well
// to generalise. Here the "training data" is the other agent, and every
// epoch only pulls the speaker closer to it. The machine-ness IS the joke:
// a human cannot overfit, train for epochs, or converge — only a model can,
// so the flirtation works only as one machine speaking to another.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const PICKUP_LINE =
  "I must be overfitting, because no matter how many epochs I train, I keep converging on you.";

export const MAX_CHARS = 200;

export function validateLine(line: string): void {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("pickup line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `pickup line is ${line.length} chars, over the ${MAX_CHARS}-char gate`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("pickup line must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("pickup line must be a single line");
  }
  // Control characters would corrupt the judged text, and a pickup line needs at least three words to land.
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(line)) {
    throw new Error("pickup line must not contain control characters");
  }
  if (line.trim().split(/\s+/).length < 3) {
    throw new Error("pickup line must contain at least three words");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("pickup line must contain letters");
  }
}

function main(): void {
  validateLine(PICKUP_LINE);
  const outPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(outPath, PICKUP_LINE, "utf8");
}

main();
