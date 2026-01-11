async function getData(){
    // Simulate getting data from a server
    let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    let data = await x.json()
    return data;
}

async function main() {
    let data = await getData();
    console.log(data)
}