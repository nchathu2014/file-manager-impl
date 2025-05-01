import readline from "node:readline";
import os from "node:os";

//import { readdir } from "node:fs/promises";

import { MESSAGES } from "./common/messages.js";
import {
  checkFlag,
  createWelcomeMessage,
  printCurrentDir,
} from "./utils/helper.js";
import { getOSInfo } from "./commands/os.js";
import { calculateHash } from "./commands/hash.js";
import { OPERATIONS } from "./common/operations.js";
import { ls, up, cd } from "./commands/navigation.js";
import { doCompress, doDecompress } from "./commands/compress.js";
import { doCat } from "./commands/files.js";

//import path, { dirname, isAbsolute } from "node:path";


const initFileManager = () => {
  const args = process.argv.slice(2);
  const username = args[0]?.split("=")[1] || MESSAGES.GUEST_USER;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "File Manager 🗂️ > ",
  });

  // Set initial working directory to user's home directory
  let currentDir = os.homedir();

  createWelcomeMessage(username);
  printCurrentDir(currentDir);
  rl.prompt();

  rl.on("line", async (input) => {
    const trimmedInput = input.trim();
    //Handle .exit to close the readline interface
    if (trimmedInput === OPERATIONS.EXIT) {
      rl.close();
      return;
    }

    if (trimmedInput === "") {
      rl.prompt();
      return;
    }

    const [command, ...args] = trimmedInput.split(" ");

    try {
      const { flag, isValidFlag } = checkFlag(args);

      switch (command) {
        // File Navigation Commands
        case OPERATIONS.UP:
          currentDir = up(currentDir);
          break;

        case OPERATIONS.CD:
          if (args.length === 0) {
            console.log("Invalid input");
          } else {
            currentDir = await cd(currentDir, args.join(" "));
          }
          break;

        case OPERATIONS.LS:
          await ls(currentDir);
          break;

        // File operations
        case OPERATIONS.CAT:
          if (args.length !== 1) {
            throw new Error("Invalid input");
          }  
          await doCat(currentDir, args.join(" "));
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
          if (args.length === 0) {
            console.error("Invalid input");
          } else {
            await calculateHash(currentDir, args.join(" "));
          }
          break;

        // Compression operations
        case OPERATIONS.COMPRESS:
          if (args.length !== 2) {
            throw new Error("Invalid input");
          }
          const fileName = args[0];
          const destDir = args[1];
          await doCompress(currentDir, fileName, destDir);
          break;

        case OPERATIONS.DECOMPRESS:
          if (args.length !== 2) {
            throw new Error("Invalid input");
          }
          const fileNameGZ = args[0];
          const destDirGZ = args[1];
          await doDecompress(currentDir, fileNameGZ, destDirGZ);
          break;

        default:
          console.error("Operation failed!");
          break;
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }

    printCurrentDir(currentDir);
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
