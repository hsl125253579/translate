const { watch } = require('gulp');
const fs = require("fs");
const path = require("path");
const translateUrl = require(path.resolve("./utils/translateUrl.js"));
const translate = require(path.resolve("./translate.js"));
const walk = require(path.resolve("./utils/walk.js"));

let cnPath = path.resolve(__dirname, "../lang/cn");
if (!fs.existsSync(cnPath)) {
  fs.mkdirSync(cnPath);
}
let files = walk(cnPath);
files = files.filter(file => {
  let filePath = path.parse(file)
  if (filePath.ext == ".json") {
    return file
  }
})
// 监听 文件夹内 的json 文件
const watcher = watch("../lang/cn/*.json");
let working = false;
const worker = async (fileArr) => {
  if (!fileArr[0]) {
    working = false;
    console.log("all ok")
    return
  } else {
    working = true;
    for (i in translateUrl) {
      let str = await translate(fileArr[0], i)
      // console.log(str)
    }
    fileArr.shift();
    worker(fileArr)
  }
};
watcher.on("change", (path, stats) => {
  console.log(123)
  files.push(path)
  if (!working) {
    worker(files)
  }
});
watcher.on("add", (path, stats) => {
  files.push(path)
  if (!working) {
    worker(files)
  }
});
worker(files)