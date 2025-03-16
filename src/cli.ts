#!/usr/bin/env ts-node

import { checkBranch } from "./checker.js";

async function main() {
  const args = process.argv.slice(2);
  const configArgIndex = args.indexOf("--config");
  const configPath = configArgIndex !== -1 ? args[configArgIndex + 1] : undefined;

  try {
    await checkBranch(configPath);
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", `❌ Something went wrong:\x1b[0m ${error}`);
    process.exit(1);
  }
}

main();
