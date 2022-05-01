const fs = require("fs");
const path = require("path");

const defaultExcluded = [
  "node_modules",
  ".next",
  "locales",
  "README.md",
  /.svg/,
  /.ico/,
  /.jpeg/,
  /.jpg/,
  /.png/,
  /config/,
  /^\./,
  /\.json$/,
  /\.lock/,
];

const isExcluded = (s, excluded) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const exception of excluded) {
    if (typeof exception === "string" && s === exception) return true;
    if (typeof exception !== "string" && exception.test(s)) return true;
  }

  return false;
};

const getFiles = (dirPath, exceptions) => {
  const fileNames = fs.readdirSync(dirPath);

  const files = fileNames
    .filter((file) => !isExcluded(file, exceptions))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const recursionFiles = getFiles(filePath, exceptions);
        return recursionFiles;
      }

      return filePath;
    });

  return files;
};

const getLinesCount = (filesArray) => {
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const file of filesArray) {
    if (Array.isArray(file)) {
      const newCount = getLinesCount(file);

      count += newCount;
    } else if (typeof file === "string") {
      const data = fs.readFileSync(file);

      count += data.toString().split("\n").length - 1;
    }
  }

  return count;
};

const main = () => {
  const dirPath = process.argv[1];

  if (!dirPath) throw Error('Argument for "directory path" was not provided');

  const files = getFiles(process.argv[2], defaultExcluded);
  const linesCount = getLinesCount(files);

  console.log(
    `Total lines count (excluding automatically generated code and configuration files): ${linesCount}`
  );
};

main();
