import { resolvePath, pathExists, isFile } from "../utils/helper.js";
import { createReadStream, createWriteStream } from "node:fs";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

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

export const createFile = async (currentDir, fileName) => {
  const resolvedFilePath = resolvePath(currentDir, fileName);
  const writeStream = createWriteStream(resolvedFilePath, {
    utf8: true,
    flags: "wx",
  });

  try {
    writeStream.write("");
    writeStream.end();
    console.log("File created successfully");
  } catch (error) {
    throw new Error("Error creating file: ", error);
  }
};

export const createDir = async (currentDir, dirName) => {
  const resolvedDirPath = join(currentDir, dirName);
  console.log("###", resolvedDirPath);
  try {
    await mkdir(resolvedDirPath, { recursive: false });
    console.log("Directory created successfully");
  } catch (error) {
    throw new Error("Error: File already exist ", error.message);
  }
};

export const doRename = async (currentDir, fileName) => {
  const resolvedFilePath = resolvePath(currentDir, fileName);
};
