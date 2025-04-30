import readline from "node:readline";
import os from "node:os";

import { MESSAGES } from "./common/messages.js";
import {
  checkFlag,
  createWelcomeMessage,
  printCurrentDir,
} from "./utils/helper.js";
import { getOSInfo } from "./commands/os.js";
import { OPERATIONS } from "./common/operations.js";

const initFileManager = () => {
  const args = process.argv.slice(2);
  const username = args[0]?.split("=")[1] || MESSAGES.GUEST_USER;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "File Manager 📂 > ",
  });

  // Set initial working directory to user's home directory
  const currentDir = os.homedir();

  createWelcomeMessage(username);
  rl.prompt();

  rl.on("line", (input) => {
    //Handle .exit to close the readline interface
    if (input.trim() === OPERATIONS.EXIT) {
      rl.close();
      return;
    }

    const [command, ...args] = input.trim().split(" ");

    try {
      const { flag, isValidFlag } = checkFlag(args);
      switch (command) {
        // File Navigation Commands
        case OPERATIONS.UP:
          console.log("Moving up a directory...");
          printCurrentDir(currentDir);
          break;

        case OPERATIONS.CD:
          console.log("Changing directory...");
          break;

        case OPERATIONS.LS:
          console.log("Listing files...");
          break;

        // File operations
        case OPERATIONS.CAT:
          console.log("Reading file...");
          break;

        case OPERATIONS.ADD:
          console.log("Adding file...");
          break;

        case OPERATIONS.MKDIR:
          console.log("Creating directory...");
          break;

        case OPERATIONS.RENAME:
          console.log("Renaming file...");
          break;

        case OPERATIONS.COPY:
          console.log("Copying file...");
          break;

        case OPERATIONS.MOVE:
          console.log("Moving file...");
          break;

        case OPERATIONS.REMOVE:
          console.log("Removing file...");
          break;

        // OS info commands
        case OPERATIONS.OS:
          if (!isValidFlag) {
            console.log("Please provide a valid flag: ", args[0]);
            return;
          }
          getOSInfo(flag);

          break;

        // Hash calculation
        case OPERATIONS.HASH:
          console.log("Calculating hash...");
          break;

        // Compression operations
        case OPERATIONS.COMPRESS:
          console.log("Compressing file...");
          break;

        case OPERATIONS.DECOMPRESS:
          console.log("Decompressing file...");
          break;

        default:
          console.error(`Invalid command: ${command}`);
          break;
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }

    rl.prompt();
  }).on("close", () => {
    console.log(
      `\n${MESSAGES.GOODBYE_START} ${username}, ${MESSAGES.GOODBYE_END}`
    );
    process.exit(0);
  });

  // Handle Ctrl+C (SIGINT) to close the readline interface
  process.on(OPERATIONS.SIGINT, () => {
    rl.close();
  });
};

initFileManager();
