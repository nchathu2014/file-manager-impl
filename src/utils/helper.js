import { MESSAGES,ERRORS } from "../common/messages.js";
import { isAbsolute, resolve } from "node:path";
import { access, stat } from "node:fs/promises";
import { consoleColors } from "./colors.js";

export const createWelcomeMessage = (username) => {
  const welcomeText = `${MESSAGES.WELCOME_MSG}, ${username}!`;
  const border = "*".repeat(welcomeText.length + 4);

  console.log(consoleColors.yellow, border);
  console.log(consoleColors.yellow, `* ${welcomeText} *`);
  console.log(consoleColors.yellow, border);
};

export const printCurrentDir = (currentDir) => {
  console.log(consoleColors.gray, `\nYou are currently in ${currentDir}`);
};

export const resolvePath = (currentDir, pathToResolve) => {
  if (isAbsolute(pathToResolve)) {
    return pathToResolve;
  }
  return resolve(currentDir, pathToResolve);
};

export const pathExists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export const isDirectory = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

export const isFile = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
};

export const printInvalidOpAndHelp = () => {
  console.log(consoleColors.red, `\n${ERRORS.OPERATION_FAILED}`);
  console.log(consoleColors.yellow, MESSAGES.HELP);
};
