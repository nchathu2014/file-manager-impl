import { MESSAGES } from "../common/messages.js";

export const createWelcomeMessage = (username) => {
  const welcomeText = `${MESSAGES.WELCOME_MSG}, ${username}!`;
  const border = "*".repeat(welcomeText.length + 4);

  console.log(border);
  console.log(`* ${welcomeText} *`);
  console.log(border);
};

