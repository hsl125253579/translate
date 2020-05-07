const fs=require("fs");

module.exports=function(filePath){
  if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,"")
  }
  try{
    return JSON.parse(fs.readFileSync(filePath,'utf8'));
  }catch{
    return {}
  }
}