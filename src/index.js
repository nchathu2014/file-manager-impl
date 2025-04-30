import readline from "node:readline";

import { MESSAGES } from "./common/messages.js";
import { createWelcomeMessage } from "./utils/helper.js";

const initFileManager = () => {
  const args = process.argv.slice(2);
  const username = args[0]?.split("=")[1] || MESSAGES.GUEST_USER;

  createWelcomeMessage(username);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "File Manager 📂 > ",
  });

  rl.prompt();

  rl.on("line", (input) => {
    //Handle .exit to close the readline interface
    if (input.trim() === ".exit") {
      rl.close();
      return;
    }
    rl.prompt();
  }).on("close", () => {
    console.log(
      `\n${MESSAGES.GOODBYE_START} ${username}, ${MESSAGES.GOODBYE_END}`
    );
    process.exit(0);
  });

  // Handle Ctrl+C (SIGINT) to close the readline interface
  process.on("SIGINT", () => {
    rl.close();
  });
};

initFileManager();
