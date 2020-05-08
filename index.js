const work=require("./watcher/index")
function fn(){
    try{
        work(__dirname)
    }catch{
        fn()
    }
}
fn() 