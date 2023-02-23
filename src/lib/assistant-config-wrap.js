const fs = require("fs");
const path = require("path");

const getAsstConfigStrWrap = () => {
  const filenames = fs.readdirSync(path.join(process.cwd(), "/build/assets"));
  const assetsFilename = filenames.find((name) =>
    name.includes("assistant-config")
  );
  const asstConfigStr = fs
    .readFileSync(path.join(process.cwd(), "/build/assets", assetsFilename), {
      encoding: "utf8",
      flag: "r",
    })
    .toString();

  return {
    preffix: asstConfigStr.slice(0, asstConfigStr.indexOf("{")),
    suffix: asstConfigStr.slice(asstConfigStr.indexOf(";export")),
  };
};

module.exports = {
  getAsstConfigStrWrap,
};
