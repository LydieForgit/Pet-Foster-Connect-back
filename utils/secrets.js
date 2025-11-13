import fs from "fs";

export const getSecrets = (path) => {
  fs.existsSync(path) ? fs.readFileSync(path, "utf-8"): null;
};