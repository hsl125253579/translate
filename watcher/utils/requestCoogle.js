const request = require('request');
// request("https://translate.google.cn/translate_a/single?client=webapp&sl=zh-CN&tl=ar&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&source=bh&ssel=0&tsel=0&kc=1&tk=912020.777952&q=%E4%BA%92%E8%81%94%E7%BD%91%2B%E5%9B%BD%E9%99%85%E6%95%99%E8%82%B2%E4%BA%91%E5%B9%B3%E5%8F%B0", (error, response, body) => {
//   if (error) {
//     console.log(error)
//   }
//   console.log(body)
// })

let randomNumber = function() {
  var num = Math.random();
  num = num * 8 + 3;
  return parseInt(num * 300)
}

let myrequest = function(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      request(url, (error, response, body) => {
        if (error) {
          console.log(456)
          reject('error');
        }else{
          resolve(JSON.parse(body)[0][0][0]);
        }
        
      });
    }, randomNumber());
  });
};
module.exports = myrequest;