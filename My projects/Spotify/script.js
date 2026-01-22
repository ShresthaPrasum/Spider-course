const musicContainer = document.querySelector('#musicContainer');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const scrollAmount = 220; // 180px card width + 20px gap + padding

leftBtn.addEventListener('click', () => {
    musicContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

rightBtn.addEventListener('click', () => {
    musicContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Update button states based on scroll position
function updateButtonStates() {
    leftBtn.disabled = musicContainer.scrollLeft === 0;
    rightBtn.disabled = 
        musicContainer.scrollLeft >= 
        musicContainer.scrollWidth - musicContainer.clientWidth - 10;
}

musicContainer.addEventListener('scroll', updateButtonStates);

// Initial button state
updateButtonStates();
const musicContainer1 = document.querySelector('#musicContainer1');
const leftBtn1 = document.getElementById('leftBtn1');
const rightBtn1 = document.getElementById('rightBtn1');

leftBtn1.addEventListener('click', () => {
    musicContainer1.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

rightBtn1.addEventListener('click', () => {
    musicContainer1.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Update button states based on scroll position
function updateButtonStates1() {
    leftBtn1.disabled = musicContainer1.scrollLeft === 0;
    rightBtn1.disabled = 
        musicContainer1.scrollLeft >= 
        musicContainer1.scrollWidth - musicContainer1.clientWidth - 10;
}

musicContainer1.addEventListener('scroll', updateButtonStates1);

// Initial button state
updateButtonStates1();