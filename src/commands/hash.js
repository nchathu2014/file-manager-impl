import { createHash } from "node:crypto";
import { pathExists, resolvePath, isFile, isDirectory } from "../utils/helper.js";
import { createReadStream, read } from "node:fs";
import { pipeline } from "node:stream";
import { consoleColors } from "../utils/colors.js";

export const calculateHash = async (currentDir, filePath) => {
  const resolvedPath = resolvePath(currentDir, filePath);
  if (!((await pathExists(resolvedPath)) || !(await isFile(resolvePath)))) {
    console.log(consoleColors.red, "File does not exist or is not accessible");
  }

  if(isDirectory(resolvedPath)){
    console.log(consoleColors.red, "Path is a directory, not a file");
  }

  const hash = createHash("sha256");
  const readbleStream = createReadStream(resolvedPath);

 try {
    return new Promise((resolve, reject) => {
        readbleStream.on("data", (chunk) => {
          hash.update(chunk);
        });
    
        readbleStream.on("error", (error) => {
            reject(new Error('Failed to calculate hash',error));
        });
    
        readbleStream.on("end", (data) => {
          const hashValue = hash.digest("hex");
          console.log(consoleColors.green,'\nHash calculation complete ✅');
          console.log(consoleColors.green,`Hash: ${hashValue}`);
          resolve(hashValue);
        });
      });
 } catch (error) {
    throw new Error('Failed to calculate hash',error.message);
 }
};
