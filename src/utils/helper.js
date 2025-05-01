import { MESSAGES } from "../common/messages.js";

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
