j=Number(prompt("Enter a number"));

let arr = [];

for(let i=1;i<=j;i++){
    arr.push(i);
}

function factorial(a,b){
    return a*b;
}

console.log(arr.reduce(factorial));