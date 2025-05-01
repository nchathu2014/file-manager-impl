import { MESSAGES } from "../common/messages.js";
import {isAbsolute,resolve} from "node:path";
import { access,stat } from "node:fs/promises";

export const createWelcomeMessage = (username) => {
  const welcomeText = `${MESSAGES.WELCOME_MSG}, ${username}!`;
  const border = "*".repeat(welcomeText.length + 4);

  console.log(border);
  console.log(`* ${welcomeText} *`);
  console.log(border);
};

export const printCurrentDir = (currentDir) => {
  console.log(`\nYou are currently in ${currentDir}`);
};

export const checkFlag = (args) => {
  const flag = args[0]?.split("--")[1];
  const isValidFlag = !(args.length === 0 || !args[0].startsWith("--"));

  return {
    flag,
    isValidFlag,
  };
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
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
};
