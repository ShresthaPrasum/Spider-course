let colors = ["red", "green", "aqua", "pink", "wheat"];


let box = document.querySelectorAll(".box")

for(i=0;i<=box.length;i++){
    let rand =  Math.floor(Math.random()*5);
    box[i].style.backgroundColor = colors[rand]
}

console.log(rand)