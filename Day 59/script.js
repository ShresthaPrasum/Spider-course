function add(x,y){
  return x+y;
}
function subtraction(x,y){
  return x-y;
}
function multi(x,y){
  return x*y;
}
function division(x,y){
  return x/y;
}
function power(x,y){
  return x**y;
}

let a= Math.round(Math.random()*10)
let b= Math.round(Math.random()*10)

let c= Math.random()>0.1


if(c==true){
  console.log(a)
  console.log(b)
  console.log("Normal Mode✓")
  console.log("addition" +add(a,b))
  console.log("subtraction"+ subtraction(a,b))
  console.log("multiplication"+ multi(a,b))
  console.log("division"+ division(a,b))
  console.log("power"+ power(a,b))
}
else{
  console.log(a)
  console.log(b)
  console.log("Chaos Mode🙏")
  console.log("addition" +subtraction(a,b))
  console.log("subtraction" +division(a,b))
  console.log("multiplication"+add(a,b))
  console.log("division" +power(a,b))
  console.log("power"+ division(a,b))
}

