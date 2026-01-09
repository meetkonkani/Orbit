const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = "all-project-paths.txt";

const IGNORED_DIRS = [
  "node_modules",
  ".git",
  ".vscode",
  ".idea",
  ".next",
  ".prisma",
  "dist",
  "build",
  "coverage",
  "__pycache__",
  "venv",
  ".cache",
  ".turbo",
  ".vercel",
  "logs",
  "tmp",
  "temp"
];

const ALLOWED_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".prisma",
  ".py",
  ".md",
  ".env",
  ".css",
  ".sql"
];

function getAllFilePaths() {
  const results = [];
  const rootDir = process.cwd();

  function scan(dir, depth = 0) {
    if (depth > 15) return;

    let items;
    try {
      items = fs.readdirSync(dir);
    } catch {
      return;
    }

    for (const item of items) {
      const full = path.join(dir, item);
      let stat;

      try {
        stat = fs.statSync(full);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        if (!IGNORED_DIRS.includes(item)) scan(full, depth + 1);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ALLOWED_EXTENSIONS.includes(ext)) {
          results.push(full.replace(rootDir, ""));
        }
      }
    }
  }

  scan(rootDir);
  return results;
}

function createPathsFile() {
  console.log("🔍 Scanning clean project structure...");

  const files = getAllFilePaths();

  let content = `PROJECT STRUCTURE\n`;
  content += `Generated: ${new Date().toLocaleString()}\n`;
  content += `Project Root: ${process.cwd()}\n`;
  content += `Total Source Files: ${files.length}\n`;
  content += "================================================\n\n";

  files.forEach((file, i) => {
    content += `${i + 1}. ${file}\n`;
  });

  fs.writeFileSync(OUTPUT_FILE, content, "utf8");
  console.log(`✅ Clean project structure exported to ${OUTPUT_FILE}`);
}

createPathsFile();
