import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, unlink, rename } from "node:fs/promises";
import { join } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import {
  resolvePath,
  pathExists,
  isFile,
  isDirectory,
} from "../utils/helper.js";

const pipelinePromise = promisify(pipeline);

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
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
      writeStream.write("");
      writeStream.end();
    });
    console.log("File created successfully");
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const createDir = async (currentDir, dirName) => {
  const resolvedDirPath = join(currentDir, dirName);
  try {
    await mkdir(resolvedDirPath, { recursive: false });
    console.log("Directory created successfully");
  } catch (error) {
    throw new Error("Error: File already exist ", error.message);
  }
};

export const doRename = async (currentDir, currFileName, newFileName) => {
  const resolvedCurrPath = resolvePath(currentDir, currFileName);
  const resolvedNewPath = resolvePath(currentDir, newFileName);

  const [currPathCheck, newPathCheck] = await Promise.all([
    (await pathExists(resolvedCurrPath)) && (await isFile(resolvedCurrPath)),
    (await pathExists(resolvedNewPath)) && (await isFile(resolvedNewPath)),
  ]);

  if (!currPathCheck) {
    throw new Error("Source file does not exist");
  }
  if (newPathCheck) {
    throw new Error("Destination file already exists");
  }

  try {
    await rename(resolvedCurrPath, resolvedNewPath);
    console.log("File renamed successfully");
  } catch (error) {
    throw new Error("Error renaming file: ", error);
  }
};

export const removeFile = async (currentDir, fileName, isShared = false) => {
  const resolvedFilePath = resolvePath(currentDir, fileName);
  try {
    await unlink(resolvedFilePath, { recursive: false });
    if (!isShared) {
      console.log("File removed successfully");
    }
  } catch (error) {
    throw new Error("Error: File does not exist ", error.message);
  }
};

export const doCopy = async (
  currentDir,
  sourceFileName,
  destDir,
  isShared = false
) => {
  const resolvedSourcePath = resolvePath(currentDir, sourceFileName);
  const resolvedDestPath = resolvePath(currentDir, destDir);

  // Check if source file and destination directory exist
  const [checkSourceFile, checkDestDir] = await Promise.all([
    pathExists(resolvedSourcePath) && isFile(resolvedSourcePath),
    pathExists(resolvedDestPath) && isDirectory(resolvedDestPath),
  ]);

  if (!checkSourceFile) {
    throw new Error("Source file does not exist");
  }
  if (!checkDestDir) {
    throw new Error("Destination directory does not exist");
  }

  const destFilePath = join(resolvedDestPath, sourceFileName);

  try {
    const readableStream = createReadStream(resolvedSourcePath);
    const writableStream = createWriteStream(destFilePath);
    await pipelinePromise(readableStream, writableStream);
    if (!isShared) {
      console.log("File copied successfully");
    }
  } catch (error) {
    throw new Error("Error copying file: ", error);
  }
};

export const doMove = async (currentDir, sourceFileName, destDir) => {
  try {
    //Since move is same as copy
    await doCopy(currentDir, sourceFileName, destDir, true);
    // After copying, remove the source file
    await removeFile(currentDir, sourceFileName, true);
    console.log("File moved successfully!");
  } catch (error) {
    throw new Error("Error moving file: ", error);
  }
};
