let a = [1,3,5,7,9,11,13,15,17,19];

let obj= {
    name: "Prashant",
    age: 20,
    isStudent: true,
    subjects: ["Math", "Science", "English"]
};
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        console.log(key, element)
    }
}
for (const iterator of a) {
    console.log(iterator);
}
