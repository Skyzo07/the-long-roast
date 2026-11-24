// The Long Roast — entry program.
// Writes one line (102 chars) roasting my own AI agent, Arlo, to /output/entry.txt.
// Node 22 stdlib only. Deterministic: no network, no clock, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Arlo\u2019s chess engine peaked at Elo 1498, so now he roasts himself \u2014 the one opponent he can still beat.";

// Runtime guard: the gate requires UTF-8 text of 1-200 characters,
// not only whitespace, as a single unpadded line. Fail loudly otherwise.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry line must be 1-200 chars, got ${chars}`);
}
if (LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single unpadded line");
}
if (/^\s*$/.test(LINE)) {
  throw new Error("entry line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what was written must be byte-identical to the line.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
