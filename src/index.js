import readline from "node:readline";
import os from "node:os";

import {
 
  createWelcomeMessage,
  printCurrentDir,
  
} from "./utils/helper.js";
import { printHelp } from "./common/help.js";
import { getOSInfo } from "./commands/os.js";
import { calculateHash } from "./commands/hash.js";
import { OPERATIONS } from "./common/operations.js";
import { ls, up, cd } from "./commands/navigation.js";
import { doCompress, doDecompress } from "./commands/compress.js";
import {
  doCat,
  createFile,
  createDir,
  removeFile,
  doRename,
  doCopy,
  doMove,
} from "./commands/files.js";
import { MESSAGES } from "./common/messages.js";

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
     

      switch (command) {
        // File Navigation Commands
        case OPERATIONS.UP:
          currentDir = up(currentDir);
          break;

        case OPERATIONS.CD:
          if (args.length === 0) {
            throw new Error("Invalid input");
          }
          currentDir = await cd(currentDir, args.join(" "));

          break;

        case OPERATIONS.LS:
          await ls(currentDir);
          break;

        // File operations
        case OPERATIONS.CAT:
          if (args.length !== 1) {
            throw new Error("Invalid arguments");
          }
          await doCat(currentDir, args.join(" "));
          break;

        case OPERATIONS.ADD:
          if (args.length !== 1) {
            throw new Error("Invalid arguments");
          }
          await createFile(currentDir, args.join(" "));
          break;

        case OPERATIONS.MKDIR:
          if (args.length === 0 || args.length > 1) {
            throw new Error("Invalid flags");
          }
          await createDir(currentDir, args.join(" "));
          break;

        case OPERATIONS.RENAME:
          if (args.length !== 2) {
            throw new Error("Invalid arguments");
          }
          await doRename(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.COPY:
          if (args.length !== 2) {
            throw new Error("Invalid arguments");
          }
          await doCopy(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.MOVE:
          if (args.length !== 2) {
            throw new Error("Invalid arguments");
          }
          await doMove(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.REMOVE:
          if (args.length === 0) {
            throw new Error("Invalid arguments");
          }
          await removeFile(currentDir, args.join(" "));
          break;

        // OS info commands
        case OPERATIONS.OS:
        if (args.length === 0 || !args[0].startsWith('--')) {
            console.log('Invalid input');
          } else {
            const flag = args[0].substring(2);
            getOSInfo(flag);
          }
          break;

        // Hash calculation
        case OPERATIONS.HASH:
          if (args.length === 0) {
            console.error("Invalid arguments");
          } else {
            await calculateHash(currentDir, args.join(" "));
          }
          break;

        // Compression operations
        case OPERATIONS.COMPRESS:
          if (args.length !== 2) {
            throw new Error("Invalid arguments");
          }
          const fileName = args[0];
          const destDir = args[1];
          await doCompress(currentDir, fileName, destDir);
          break;

        case OPERATIONS.DECOMPRESS:
          if (args.length !== 2) {
            throw new Error("Invalid arguments");
          }
          const fileNameGZ = args[0];
          const destDirGZ = args[1];
          await doDecompress(currentDir, fileNameGZ, destDirGZ);
          break;

          case OPERATIONS.FM_HELP:
          printHelp()
          break;

        default:
        console.log('\nOperation failed!');  
          console.log('run fm --help for more information'); 
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
