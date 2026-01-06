document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE OF QUESTIONS AND ANSWERS ---
    const quizData = [
        { question: "What comes next: 3, 9, 27, 81, ?", answer: "243" },
        { question: "Find the missing number: 1, 4, 9, 16, ?, 36", answer: "25" },
        { question: "If TWO + TWO = FOUR, what number does FOUR represent?", answer: "9786 (based on a specific letter-to-number cipher)" },
        { question: "A clock shows 12:50. What is the angle between the hour and minute hand?", answer: "115°" },
        { question: "You are in a room with 3 light switches. Only one switch turns on a bulb in another room. You can enter the bulb room only once. How do you find the switch?", answer: "Turn on one switch, wait a few minutes, turn it off. Turn on a second switch and enter the room. If the bulb is on, it's the second switch. If it's off but warm, it's the first. If it's off and cold, it's the third." },
        { question: "I have three digits. All are odd. The sum is 15. I am greater than 500. What number could I be?", answer: "753 (or 951, 915, 735, 573, etc.)" },
        { question: "If ALLIGATOR is coded as BMMJHBUPS, what is CROCODILE?", answer: "DSPDPEJMF" },
        { question: "Which number when squared gives 12321?", answer: "111" },
        { question: "In a certain language, TREE is coded as UVGG. How is LEAF coded?", answer: "NGCF" },
        { question: "How many squares are there in a 4x4 grid?", answer: "30" },
        { question: "If 3x – 7 = 2x + 8, what is x?", answer: "x = 15" },
        { question: "A puzzle box has 5 buttons: only one opens it. If you press 2 wrong buttons, you get locked out. What’s the best strategy to maximize chances in 2 tries?", answer: "Press one button. If it doesn't open, press a second one. This gives a 2/5 chance of success. There's no guaranteed strategy." },
        { question: "4 people can build 4 walls in 4 days. How long would it take 8 people to build 8 walls?", answer: "4 days" },
        { question: "A cube has a surface area of 150 cm². What is the length of one edge?", answer: "5 cm" },
        { question: "What is the 12th term in the Fibonacci sequence (starting 0, 1...)?", answer: "144" },
        { question: "A palindrome number is multiplied by 11 and gives 5335. What was the number?", answer: "485" },
        { question: "If x² + x = 132, find the positive value of x.", answer: "x = 11" },
        { question: "Divide Rs. 750 among A, B, and C in the ratio 2:3:5. How much does B get?", answer: "Rs. 225" },
        { question: "What is the LCM of 3x², 6xy, 9x³y²?", answer: "18x³y²" },
        { question: "Factorize: x³ + 27", answer: "(x + 3)(x² - 3x + 9)" },
        { question: "If a² + b² = 100 and ab = 30, find (a + b)².", answer: "160" },
        { question: "The average of 10 numbers is 32. Two numbers are 20 and 24. What is the average of the remaining 8?", answer: "34" },
        { question: "Simplify: (3x² - 12x) ÷ 3x", answer: "x - 4" },
        { question: "What is the cube root of 3375?", answer: "15" },
        { question: "If sin A = 3/5, and A is acute, find cos A.", answer: "4/5" },
        { question: "A train travels 240 km in 3 hours. How long will it take to travel 560 km at the same speed?", answer: "7 hours" },
        { question: "A rectangle has a perimeter of 60 cm and a length of 18 cm. What is its area?", answer: "216 cm² (width is 12, 18*12=216)" },
        { question: "Solve for x: 2x² + 7x + 3 = 0", answer: "x = -3, x = -0.5" },
        { question: "Simplify: (2x² + 3x - 2) / (x + 2)", answer: "2x - 1" },
        { question: "What is the derivative of x² + 3x + 7?", answer: "2x + 3" },
        { question: "A number increases by 25%, then decreases by 20%. What is the net percent change?", answer: "0% (No change)" },
        { question: "If water boils at 100°C and freezes at 0°C, what is 25°C in Fahrenheit?", answer: "77°F" },
        { question: "How many neutrons are there in an oxygen atom (O-16)?", answer: "8" },
        { question: "Which organ in humans is responsible for maintaining balance?", answer: "The inner ear" },
        { question: "Which body part produces bile?", answer: "The liver" },
        { question: "What happens to your weight on the moon compared to Earth?", answer: "It becomes 1/6th of your weight on Earth" },
        { question: "Which gas is released during photosynthesis?", answer: "Oxygen" },
        { question: "Which subatomic particle has no electric charge?", answer: "Neutron" },
        { question: "What is the function of white blood cells?", answer: "To fight infection" },
        { question: "Which vitamin helps blood clot?", answer: "Vitamin K" },
        { question: "Name the hormone responsible for growth in humans.", answer: "Growth Hormone (GH)" },
        { question: "How many bones does an adult human have?", answer: "206" },
        { question: "What device is used to measure electric current?", answer: "Ammeter" },
        { question: "What causes day and night?", answer: "Earth’s rotation on its axis" },
        { question: "Why does a compass needle always point north?", answer: "It aligns with Earth’s magnetic field" },
        { question: "Which part of the eye controls the amount of light entering it?", answer: "The iris" },
        { question: "Who developed the theory of general relativity?", answer: "Albert Einstein" },
        { question: "Which color has the shortest wavelength in the visible spectrum?", answer: "Violet" },
        { question: "What kind of lens is used to correct short-sightedness (myopia)?", answer: "Concave lens" },
        { question: "A glass prism splits white light into how many colors?", answer: "7 (The colors of the rainbow)" },
        { question: "What is the chemical symbol for gold?", answer: "Au" },
        { question: "Who wrote the C programming language?", answer: "Dennis Ritchie" },
        { question: "What does 'int main()' mean in C?", answer: "It's the main function where program execution begins." },
        { question: "Which function is used to print output in C?", answer: "printf()" },
        { question: "How do you write a single-line comment in C?", answer: "// This is a comment" },
        { question: "What is the output of this code: int a = 10; printf(\"%d\", ++a);", answer: "11" },
        { question: "What is the typical size of an integer (int) in C (in bytes)?", answer: "4 bytes (commonly, but can vary)" },
        { question: "What does 'scanf' do in C?", answer: "It reads formatted input from the standard input (like the keyboard)." },
        { question: "What is the keyword to declare a constant in C?", answer: "const" },
        { question: "What does 'break' do inside a loop in C?", answer: "It immediately terminates the loop." },
        { question: "Who is the first king of unified Nepal?", answer: "Prithvi Narayan Shah" },
        { question: "What year was Nepal declared a republic?", answer: "2008 AD" },
        { question: "How many articles are there in the Constitution of Nepal 2072?", answer: "308" },
        { question: "What is the height of Mount Everest according to the latest data?", answer: "8,848.86 meters" },
        { question: "Which Nepalese place is listed as a UNESCO world heritage site?", answer: "Lumbini (birthplace of Buddha), Sagarmatha National Park, etc." },
        { question: "Who was the first elected Prime Minister of Nepal?", answer: "B.P. Koirala" },
        { question: "What is the deepest lake in Nepal?", answer: "Rara Lake" },
        { question: "What is the script used in Nepali currency?", answer: "Devanagari" },
        { question: "What is the full name of NCP (a major political party)?", answer: "Nepal Communist Party" },
        { question: "Which river forms the deepest gorge in Nepal?", answer: "Kali Gandaki River" },
        { question: "Who was the 2nd President of Nepal?", answer: "Bidhya Devi Bhandari" },
        { question: "Which is the largest province of Nepal by area?", answer: "Karnali Province" },
        { question: "What is Nepal's national game?", answer: "Volleyball" },
        { question: "A man is found murdered on a Sunday morning. His wife says she was sleeping, the cook was preparing breakfast, the gardener was picking vegetables, and the maid was getting the mail. Who did it?", answer: "The maid. There is no mail on Sunday." },
        { question: "Find the next numbers: 10, 13, 16, 19, ?, ?", answer: "22, 25" },
        { question: "Which word is always spelled incorrectly in every dictionary?", answer: "Incorrectly" },
        { question: "Forward I am heavy, backward I am not. What am I?", answer: "Ton" },
        { question: "What has hands but can’t clap?", answer: "A clock" },
        { question: "If 6 cats can catch 6 rats in 6 minutes, how many cats are needed to catch 100 rats in 100 minutes?", answer: "6 cats" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "The letter 'M'" },
        { question: "A man buys a watch for Rs. 1000 and sells it for Rs. 1200. Then buys it back for Rs. 1300 and sells it again for Rs. 1500. How much profit did he make?", answer: "Rs. 400" },
        { question: "I am an odd number. Take away one letter and I become even. What number am I?", answer: "Seven" },
        { question: "The more you take, the more you leave behind. What are they?", answer: "Footsteps" },
        { question: "What five-letter word becomes shorter when you add two letters to it?", answer: "Short" },
        { question: "What comes next: J, F, M, A, M, J, ?", answer: "J (for July)" },
        { question: "How many 9s are there between 1 and 100?", answer: "20" },
        { question: "What 3 positive numbers give the same result when multiplied and added together?", answer: "1, 2, and 3" },
        { question: "What am I? If you multiply me by any number, the answer is always the same.", answer: "The number 0" },
        { question: "What gets wetter the more it dries?", answer: "A towel" },
        { question: "A man has 53 socks in a drawer: 21 black, 15 blue, and 17 red. The lights are out. How many socks must he take out to be absolutely sure he has a matching pair?", answer: "4 socks" },
        { question: "Which has more value: 1kg of gold or 1kg of cotton?", answer: "They have the same weight (1kg), but gold has more monetary value." },
        { question: "How many seconds are there in 1 day?", answer: "86,400" },
        { question: "A car travels 120 km in 2 hours and returns along the same route in 3 hours. What is the average speed for the whole journey?", answer: "48 km/h" },
        { question: "If a boy is twice as old as his sister, and the sister is 10, how old will the boy be in 5 years?", answer: "25 years old" },
        { question: "If 5 workers can build a wall in 12 hours, how long would it take 10 workers to build the same wall?", answer: "6 hours" },
        { question: "What is the sum of the first 50 natural numbers?", answer: "1275" },
        { question: "How many diagonals does a hexagon have?", answer: "9" },
        { question: "What is the square root of 1024?", answer: "32" },
        { question: "In a party of 15 people, each person shakes hands with every other person exactly once. How many handshakes are there in total?", answer: "105" },
        { question: "What is the value of 0! (zero factorial)?", answer: "1" }
    ];

    // --- STATE MANAGEMENT ---
    let scores = { A: 0, B: 0, C: 0 };
    let selectedTeam = null;
    let currentQuestionIndex = null;
    let timer;
    let timerCount;

    // --- DOM ELEMENTS ---
    const nextBtn = document.getElementById('next-btn');
    const teamSection = document.getElementById('team-section');
    const teamButtons = document.querySelectorAll('.team-btn');
    const gotoQuestionsBtn = document.getElementById('goto-questions-btn');
    const questionPickerSection = document.getElementById('question-picker-section');
    const questionGrid = document.getElementById('question-grid');
    const quizSection = document.getElementById('quiz-section');
    const questionTitle = document.getElementById('question-title');
    const questionText = document.getElementById('question-text');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const timerDisplay = document.getElementById('timer');
    const answerButtonsContainer = document.getElementById('answer-buttons');
    const correctBtn = document.getElementById('correct-btn');
    const wrongBtn = document.getElementById('wrong-btn');
    const modal = document.getElementById('answer-modal');
    const correctAnswerText = document.getElementById('correct-answer-text');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const currentTeamDisplay = document.getElementById('current-team-display');

    // --- INITIALIZATION ---
    function initializeQuiz() {
        createQuestionGrid();
        addEventListeners();
    }

    function createQuestionGrid() {
        questionGrid.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const box = document.createElement('div');
            box.classList.add('question-box');
            box.textContent = i + 1;
            box.dataset.index = i;
            questionGrid.appendChild(box);
        }
    }

    // --- EVENT LISTENERS ---
    function addEventListeners() {
        nextBtn.addEventListener('click', () => {
            teamSection.scrollIntoView({ behavior: 'smooth' });
        });

        gotoQuestionsBtn.addEventListener('click', () => {
            questionPickerSection.scrollIntoView({ behavior: 'smooth' });
        });

        teamButtons.forEach(button => {
            button.addEventListener('click', handleTeamSelection);
        });

        questionGrid.addEventListener('click', handleQuestionSelection);
        startTimerBtn.addEventListener('click', startTimerAndShowQuestion);
        correctBtn.addEventListener('click', handleAnswerCorrect);
        wrongBtn.addEventListener('click', handleAnswerWrong);
        closeModalBtn.addEventListener('click', hideModal);
    }

    // --- HANDLER FUNCTIONS ---
    function handleTeamSelection(e) {
        selectedTeam = e.target.dataset.team;
        teamButtons.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        gotoQuestionsBtn.disabled = false;
        currentTeamDisplay.textContent = `Team ${selectedTeam}`;
    }

    function handleQuestionSelection(e) {
        if (e.target.classList.contains('question-box') && !e.target.classList.contains('disabled')) {
            currentQuestionIndex = parseInt(e.target.dataset.index);
            e.target.classList.add('disabled');
            quizSection.scrollIntoView({ behavior: 'smooth' });
            prepareQuestion();
        }
    }
    
    function prepareQuestion() {
        questionTitle.textContent = `Question ${currentQuestionIndex + 1}`;
        questionText.textContent = ""; // Hide question text initially
        startTimerBtn.classList.remove('hidden');
        answerButtonsContainer.classList.add('hidden');
        timerDisplay.textContent = "30";
    }

    function startTimerAndShowQuestion() {
        startTimerBtn.classList.add('hidden');
        questionText.textContent = quizData[currentQuestionIndex].question;
        answerButtonsContainer.classList.remove('hidden');

        timerCount = 30;
        timerDisplay.textContent = timerCount;
        timer = setInterval(() => {
            timerCount--;
            timerDisplay.textContent = timerCount;
            if (timerCount <= 0) {
                handleTimeUp();
            }
        }, 1000);
    }
    
    function handleTimeUp() {
        clearInterval(timer);
        showAnswer();
    }
    
    function handleAnswerCorrect() {
        if (selectedTeam) {
            scores[selectedTeam]++;
            updateScoreboard();
        }
        clearInterval(timer);
        showAnswer();
    }

    function handleAnswerWrong() {
        clearInterval(timer);
        showAnswer();
    }
    
    function showAnswer() {
        correctAnswerText.textContent = quizData[currentQuestionIndex].answer;
        modal.classList.add('show');
    }

    function hideModal() {
        modal.classList.remove('show');
        questionPickerSection.scrollIntoView({ behavior: 'smooth' });
    }

    function updateScoreboard() {
        document.getElementById(`score-A`).textContent = scores.A;
        document.getElementById(`score-B`).textContent = scores.B;
        document.getElementById(`score-C`).textContent = scores.C;
    }

    // --- START THE QUIZ ---
    initializeQuiz();
});