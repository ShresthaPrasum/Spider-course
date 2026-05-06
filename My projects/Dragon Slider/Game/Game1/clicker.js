// game variables
var goldCount = 0;
let perSecond = 0;
let click_val = 1; 

// References
const goldText = document.getElementById('gold');
const gpsText = document.getElementById("gps");
const btn = document.getElementById('click-btn');


// store upgrade info here
// ID: cost, how many owned, gps boost, click boost
var shopItems = {
    1: { id:1, name: "Kobold Minion", cost: 15, amt: 0, gpsObj: 1, clickObj: 0 },
    2: { id:2, name: "Golden Claw", cost: 50, amt: 0, gpsObj: 0, clickObj: 1 },
    3: { id:3, name: "Dragon Egg", cost: 200, amt: 0, gpsObj: 10, clickObj: 0 }
}; // added egg later

function refreshUI() {
    goldText.innerText = Math.floor(goldCount);
    gpsText.innerText = perSecond;
    
    // check buttons
    // item 1
    updateButton(1);
    updateButton(2);
    updateButton(3);
}

function updateButton(id) {
    let item = shopItems[id];
    let el = document.getElementById('upg'+id);
    let priceTag = document.getElementById('cost-'+id);
    
    priceTag.innerText = item.cost + " G";
    
    if (goldCount >= item.cost) {
        el.className = "upgrade-item"; // enabled
    } else {
        el.className = "upgrade-item disabled";
    }
}


function clickDragon() {
    goldCount = goldCount + click_val;
    
    // nice effect
    btn.innerText = "+" + click_val;
    setTimeout(function(){
        btn.innerText = "PET DRAGON";
    }, 150);
    
    refreshUI();
}

function buyUpgrade( num ) {
    let item = shopItems[num];
    
    if(goldCount >= item.cost) {
        // purchase
        goldCount = goldCount - item.cost;
        item.amt = item.amt + 1;
        
        // make it more expensive
        item.cost = Math.ceil(item.cost * 1.5);
        
        // apply bonuses
        perSecond = perSecond + item.gpsObj;
        click_val = click_val + item.clickObj;
        
        console.log("Bought " + item.name);
        
        refreshUI();
    } else {
        console.log("Not enough gold");
    }
}

// Tick loop
setInterval(function(){
    if(perSecond > 0) {
        goldCount += perSecond;
        refreshUI();
    }
}, 1000);

// init
refreshUI();