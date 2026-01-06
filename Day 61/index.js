let adjectives={
    1: "Crazy",
    2: "Amazing",
    3: "Fire"
}

let shopname={
    1:"Engine",
    2:"Foods",
    3:"Garments"
}

let anotherword={
    1:"Bros",
    2:"Limited",
    3:"Hub"
}

i = Math.floor((Math.random()*3)+1);
j = Math.floor((Math.random()*3)+1);
k = Math.floor((Math.random()*3)+1);

console.log(adjectives[i]+shopname[j]+anotherword[k]);

