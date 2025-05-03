import readline from "node:readline";
import os from "node:os";

import {
  createWelcomeMessage,
  printCurrentDir,
  printInvalidOpAndHelp,
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
import { MESSAGES, ERRORS } from "./common/messages.js";
import { consoleColors } from "./utils/colors.js";

const initFileManager = () => {
  const args = process.argv.slice(2);
  const username = args[0]?.split("=")[1] || MESSAGES.GUEST_USER;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: MESSAGES.FILE_MANAGER_PROMPT,
    historySize: 10,
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
        // Navigation Commands
        case OPERATIONS.UP:
          currentDir = up(currentDir);
          break;

        case OPERATIONS.CD:
          if (args.length === 0) {
            printInvalidOpAndHelp();
            break;
          }
          currentDir = await cd(currentDir, args.join(" "));
          break;

        case OPERATIONS.LS:
          await ls(currentDir);
          break;

        // File Commands
        case OPERATIONS.CAT:
          if (args.length !== 1) {
           printInvalidOpAndHelp();
            break;
          }
          await doCat(currentDir, args.join(" "));
          break;

        case OPERATIONS.ADD:
          if (args.length !== 1) {
            printInvalidOpAndHelp();
            break;
          }
          await createFile(currentDir, args.join(" "));
          break;

        case OPERATIONS.MKDIR:
          if (args.length === 0 || args.length > 1) {
            printInvalidOpAndHelp();
            break;
          }
          await createDir(currentDir, args.join(" "));
          break;

        case OPERATIONS.RENAME:
          if (args.length !== 2) {
            printInvalidOpAndHelp();
            break;
          }
          await doRename(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.COPY:
          if (args.length !== 2) {
            printInvalidOpAndHelp();
            break;
          }
          await doCopy(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.MOVE:
          if (args.length !== 2) {
            printInvalidOpAndHelp();
            break;
          }
          await doMove(currentDir, args[0], args[1]);
          break;

        case OPERATIONS.REMOVE:
          if (args.length === 0) {
           printInvalidOpAndHelp();
            break;
          }
          await removeFile(currentDir, args.join(" "));
          break;

        // OS info commands
        case OPERATIONS.OS:
          if (args.length === 0 || !args[0].startsWith("--")) {
            printInvalidOpAndHelp();
            break;
          } else {
            const flag = args[0].substring(2);
            getOSInfo(flag);
          }
          break;

        // Hash commands
        case OPERATIONS.HASH:
          if (args.length === 0) {
            printInvalidOpAndHelp();
            break;
          } else {
            await calculateHash(currentDir, args.join(" "));
          }
          break;

        // Compression commands
        case OPERATIONS.COMPRESS:
          if (args.length !== 2) {
            printInvalidOpAndHelp();
            break;
          }
          const fileName = args[0];
          const destDir = args[1];
          await doCompress(currentDir, fileName, destDir);
          break;

        case OPERATIONS.DECOMPRESS:
          if (args.length !== 2) {
            printInvalidOpAndHelp();
            break;
          }
          await doDecompress(currentDir, args[0],  args[1]);
          break;

        case OPERATIONS.FM_HELP:
          printHelp();
          break;

        default:
          printInvalidOpAndHelp();
          break;
      }
    } catch (error) {
      console.error(consoleColors.red, `Error: ${error.message}`);
    }

    printCurrentDir(currentDir);
    rl.prompt();
  }).on("close", () => {
    console.log(
      consoleColors.cyan,
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
