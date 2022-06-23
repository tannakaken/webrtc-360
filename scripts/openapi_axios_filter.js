console.log("open api post-processing for axios");
const fs = require("fs");
const filePath1 = "../src/generated/base.ts";
const text1 = fs.readFileSync(filePath1, "utf8");
const lines1 = text1.toString().split("\n");
const targetLine =
  "export const BASE_PATH = \"http://localhost:8000\".replace(/\\/+$/, \"\");";
let newText1 = "";
for (const line of lines1) {
  if (line === targetLine) {
    newText1 +=
      "export const BASE_PATH = process.env.REACT_APP_SERVER_URL || \"http://localhost:8000\";\n";
  } else {
    newText1 += line + "\n";
  }
}
fs.writeFileSync(filePath1, newText1);

const filePath2 = "../src/generated/api.ts";
const text2 = fs.readFileSync(filePath2, "utf8");
const lines2 = text2.toString().split("\n");
let newText2 = "";
let first_import = true;
for (const line of lines2) {
  if (first_import && line.startsWith("import")) {
    newText2 += "import {asyncLog} from '../helpers/log.helper';\n";
    first_import = false;
  }
  newText2 += line
      .replace("    public", "    @asyncLog()\n    public")
      .replace(/([a-zA-Z_]*)\?: ([a-zA-Z_]*);/g, "$1: $2 | null;") + "\n";
}

fs.writeFileSync(filePath2, newText2);
