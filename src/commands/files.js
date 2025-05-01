import { resolvePath, pathExists, isFile } from "../utils/helper.js";
import { createReadStream } from "node:fs";

export const doCat = async (currentDir, fileName) => {
  const resolvedFilePath = resolvePath(currentDir, fileName);

  //   if (
  //     !(await pathExists(resolvedFilePath)) ||
  //     !(await isFile(resolvedFilePath))
  //   ) {
  //     throw new Error("File does not exist or is not accessible");
  //   }

  const readStream = createReadStream(resolvedFilePath, {
    encoding: "utf-8",
    flags: "r",
  });

  try {
    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    return new Promise((resolve, reject) => {
      readStream.on("end", () => {
        console.log("");
        resolve();
      });

      readStream.on("error", (err) => {
        reject(new Error("Failed to read file"));
      });
    });
  } catch (error) {
    throw new Error("Error reading file: ", error);
  }
};
