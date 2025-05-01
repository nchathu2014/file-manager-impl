import {
  resolvePath,
  pathExists,
  isFile,
  isDirectory,
} from "../utils/helper.js";
import { createReadStream, createWriteStream } from "node:fs";
import { basename, join, dirname } from "node:path";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pipelinePromise = promisify(pipeline);

export const doCompress = async (currentDir, fileName, destDir) => {
  const resolvedFilePath = resolvePath(currentDir, fileName);
  const resolvedDestPath = resolvePath(currentDir, destDir);

  try {
    // Check if source file exists
    if (
      !(await pathExists(resolvedFilePath)) ||
      !(await isFile(resolvedFilePath))
    ) {
      throw new Error("Source file does not exist or is not accessible");
    }

    console.log("@@@", await pathExists(resolvedFilePath));

    // Determine the final destination path
    let finalDestPath;
    if (await isDirectory(resolvedDestPath)) {
      const sourceFileName = basename(resolvedFilePath);
      finalDestPath = join(resolvedDestPath, `${sourceFileName}.br`);
    } else {
      // Use the provided destination path
      finalDestPath = resolvedDestPath;

      const destDir = dirname(finalDestPath);
      if (!(await pathExists(destDir)) || !(await isDirectory(destDir))) {
        throw new Error("Destination directory does not exist");
      }
    }

    if (await pathExists(finalDestPath)) {
      throw new Error("Destination file already exists");
    }

    const readStream = createReadStream(resolvedFilePath);
    const brotliStream = createBrotliCompress();
    const writeStream = createWriteStream(finalDestPath);

    // I used promised based pipllien stream instead of syncronous pipleine stream
    await pipelinePromise(readStream, brotliStream, writeStream);
    console.log("File compressed successfully");
  } catch (error) {
    throw new Error("Failed to compress file: " + error.message);
  }
};
