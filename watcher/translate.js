const fs = require('fs');
const path = require("path");
//request
//请求 谷歌翻译 接口
const request = require(path.resolve(__dirname,"./utils/requestCoogle.js"));
// TL 计算谷歌翻译 tk值
const TL = require(path.resolve(__dirname,"./utils/TL.js"))
const readjson = require(path.resolve(__dirname,"./utils/readjson.js"));
const translateUrl = require(path.resolve(__dirname,"./utils/translateUrl.js"));


let translate = async (file, lang) => {
  let url = translateUrl[lang];
  if (!url) {
    console.log(`请在/utils/translateUrl.js里配置 ${lang} 的url`)
    return false;
  }
  //解析file的路径
  let fileParse = path.parse(file);
  let fileName = fileParse.base;
  let targetDir = path.resolve(fileParse.dir, `../${lang}`)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }
  let targetSrc = path.resolve(targetDir, fileName);

  // let targetLang = readjson(targetSrc);
  let targetLang = {};
  let cnLang = readjson(file);
  for (let i in cnLang) {

    console.log(`---正在翻译---${fileName}--to--${lang}--${cnLang[i]}`)
    let str = `&tk=${TL(cnLang[i])}&q=${encodeURIComponent(cnLang[i])}`
    targetLang[i] = await request(url + str)
    if (lang == 'en' && targetLang[i].indexOf('"') > -1) {
      targetLang[i] = targetLang[i].replace(/"/g, '\\"');
    }
    console.log(`---翻译完成---${fileName}--to--${lang}--${targetLang[i]}`)

  }
  fs.writeFileSync(targetSrc, JSON.stringify(targetLang));
  return file + '--to-' + lang + "--ok---"
}
module.exports = translate