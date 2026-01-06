let arr=[1,2,3,4,5,6,7,8,9,10];
// let newarr=[];
// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     newarr.push(element*2);
    
// }
// console.log(newarr); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
let newarr=arr.map((x)=>{
    return x*2;
});

newarr.filter((x)=>{
    return x>10;
});
