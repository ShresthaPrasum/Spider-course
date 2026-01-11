let isrunning = false;
let intervalId = null;

boy = ["Prasoon", "Pratik Adhikari", "Pratik Chalise","Prasoon"]
girl = ["Khusum", "Salisa", "Samipa", "Sona"]

function getrandomnum(){
  return Math.floor(Math.random()*4)
}


const callback = (arg) => {
  console.log(arg);
};

const loadScript = (src, callback) => {
  let sc = document.createElement("script");
  sc.src = src;
  sc.onload = callback("Script loaded!!!");
  document.body.append(sc);
};


document.body.addEventListener("keydown",function(event){
  if(event.key === "Tab"){
    event.preventDefault();
    if(!isrunning){
      intervalId = setInterval(() => {
            loadScript("src.js", callback);
            
            console.log(intervalId);
        }, 500);
        isrunning = true;
    }
    else{
      clearInterval(intervalId);
      document.querySelector("h1").innerHTML = "Please Don't Press The Tab Key"
      document.querySelector(".box").style.background = "white";
      document.querySelector(".box1").style.background = "white";
      intervalId = null;
      console.log("Script Unloaded");
      isrunning = false;
    }
  }
  let percent = Math.floor(Math.random()*100+1)

  if(event.key === "r"){
    console.log("You Just pressed R Key")
    document.querySelector(".box").innerHTML = boy[getrandomnum()];
    document.querySelector(".box1").innerHTML = girl[getrandomnum()];
    document.querySelector(".bold").innerHTML = percent+"%"
  }
})
          
