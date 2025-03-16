import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

interface Config {
  forbiddenBranches: string[];
  pattern?: string;
}

const DEFAULT_CONFIG: Config = {
  forbiddenBranches: ["main", "master", "develop", "release", "bugfix"],
  pattern: "^(feat|fix|chore|docs|style|refactor|perf|test|ci|build)/[a-z]+(-[a-z]+)*$",
};

async function loadConfig(configPath?: string): Promise<any> {
    let configFilePath = configPath || path.resolve(process.cwd(), "gitbranchrc.config.mjs");
    console.log("\x1b[34m%s\x1b[0m", `Loading config from: ${configFilePath}`);
  
    if (existsSync(configFilePath)) {
        console.log("\x1b[32m%s\x1b[0m", "✅ Config file found");
        try {
            const moduleUrl = pathToFileURL(configFilePath).href;
            const configModule = await import(moduleUrl);
            console.log("\x1b[32m%s\x1b[0m", "✅ Config file loaded\n", configModule.default);

            return configModule.default;
        } catch (error) {
          console.error("\x1b[31m ❌ Error loading config:\x1b[0m", error);
        }
    } else {
        console.log("\x1b[33m%s\x1b[0m", "⚠️ Config file not found. Using default configuration\n", DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
    }
}

export async function checkBranch(configPath?: string) {
  let branch = "";
  try {
    branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch (error) {
    console.error("\x1b[31m❌ Error: Not inside a Git repository!\x1b[0m");
    process.exit(1);
  }

  const config = await loadConfig(configPath);
  console.log("\x1b[34m%s\x1b[0m", `Current branch: ${branch}`);

  // Forbidden branch check
  if (config.forbiddenBranches.includes(branch)) {
    console.error("\x1b[31m%s\x1b[0m", `❌ Forbidden branch: ${branch}"`);
    process.exit(1);
  }

  // Regex check
  if (config.pattern && !new RegExp(config.pattern).test(branch)) {
    console.error("\x1b[33m%s\x1b[0m", `⚠️ Branch name does not match the required pattern: ${config.pattern}`);
    process.exit(1);
  }

  console.log("\x1b[32m%s\x1b[0m", "✅ Branch name is valid");
}
