import { spawn } from "child_process";

const args = process.argv.slice(2);
const nextArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--host") {
    nextArgs.push("-H");
  } else {
    nextArgs.push(arg);
  }
}

// Port constraints on container/sandboxed environment require port 3000
if (!nextArgs.includes("-p") && !nextArgs.includes("--port")) {
  nextArgs.push("-p", "3000");
}

console.log("Starting Next.js Dev with command: next dev", nextArgs.join(" "));

const child = spawn("npx", ["next", "dev", ...nextArgs], {
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => {
  process.exit(code || 0);
});
