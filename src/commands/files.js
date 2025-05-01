import { readdir } from "node:fs/promises";
import { dirname } from "node:path";
import { pathExists, isDirectory, resolvePath } from "../utils/helper.js";

export const up = (currentDir) => {
  try {
    const parentDir = dirname(currentDir);
    return parentDir;
  } catch (error) {
    throw new Error("Error navigating to parent directory: " + error.message);
  }
};

export const ls = async (currentDir) => {
  try {
    const dirEntries = await readdir(currentDir, {
      withFileTypes: true,
    });
    const folders = [];
    const files = [];

    for (const entry of dirEntries) {
      if (entry.isDirectory()) {
        folders.push({ name: entry.name, type: "directory 📂" });
      } else {
        files.push({ name: entry.name, type: "file 📄" });
      }
    }

    //sorting
    const sortedFolders = folders.sort((a, b) => a.name.localeCompare(b.name));
    const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));

    const sortedDirEntries = [...sortedFolders, ...sortedFiles];
    console.log("\n");
    console.table(sortedDirEntries);
  } catch (error) {
    throw new Error("Error reading directory: " + error.message);
  }
};

export const cd = async (currentDir, targetDir) => {
  const resolvedPath = resolvePath(currentDir, targetDir);
  console.log("resolvedPath", resolvedPath);

  if ((await pathExists(resolvedPath)) && (await isDirectory(resolvedPath))) {
    return resolvedPath;
  } else {
    console.error("Directory does not exist or is not accessible");
    return resolvedPath;
  }
};
