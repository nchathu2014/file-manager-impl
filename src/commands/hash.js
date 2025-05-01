import { createHash } from "node:crypto";
import { pathExists, resolvePath, isFile } from "../utils/helper.js";
import { createReadStream, read } from "node:fs";
import { pipeline } from "node:stream";

export const calculateHash = async (currentDir, filePath) => {
  const resolvedPath = resolvePath(currentDir, filePath);
  if (!((await pathExists(resolvedPath)) || !(await isFile(resolvePath)))) {
    throw new Error("File does not exist or is not accessible");
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
          console.log('Hash calculation complete');
          console.log(`Hash: ${hashValue}`);
          resolve(hashValue);
        });
      });
 } catch (error) {
    throw new Error('Failed to calculate hash',error);
 }
};
