import { readdir } from "node:fs/promises";
import { dirname } from "node:path";

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
