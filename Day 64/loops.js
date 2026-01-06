let a = [1,2,3,4,5];

// for (let index = 0; index < a.length; index++) {
//     const element = a[index];
//     console.log(element)
// }

// a.forEach((value,index,arr)=>{
//     console.log(value,index,arr)
// })

// console.log(a.toString());

// console.log(a.join(":"));

// console.log(a.pop());

// console.log(a.push("Prasum is a Master"));

// console.log(a);

// function greaterthan5(a){
//     if (a<=5){
//         return true;
//     }
//     else{
//         return 0;
//     }
// }      

// console.log(a.filter(greaterthan5))

function factorial(a,b){
    return a*b;
}

// let factor = a.map(factorial);

// console.log(factor)

console.log(a.reduce(factorial));