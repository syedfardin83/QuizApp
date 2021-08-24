//console.log("Hello Player from Game!");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score =0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: 'Which country operationalized world’s largest radio telescope?',
        choice1: 'USA',
        choice2: 'China',
        choice3: 'Russia',
        choice4: 'India',
        answer: 2,
    },
    {
        question: 'Which of the following is the capital of Arunachal Pradesh?',
        choice1: 'Itanagar',
        choice2: 'Dispur',
        choice3: 'Imphal',
        choice4: 'Panaji',
    answer: 1,
    },
    {
        question: 'Katerina Sakellaropoulou was elected the first woman President of',
        choice1: 'Greece',
        choice2: 'Spain',
        choice3: 'Finland',
        choice4: 'Netherland',
    answer: 1,
    },
    {
        question: 'Which one among the following radiations carries maximum energy?',
        choice1: 'UV rays',
        choice2: 'Gamma rays',
        choice3: 'X-rays',
        choice4: 'Infrared rays',
    answer: 2,
    },
    {
        question: 'What is India’s rank on EIU’s Global Democracy Index 2019?',
        choice1: '1st rank',
        choice2: '89th rank',
        choice3: '53rd rank',
        choice4: '51st rank',
    answer: 4,
    },
    {
        question: 'Bokaro Steel Limited was established with the assistance of',
        choice1: 'Germany',
        choice2: 'Soviet Union',
        choice3: 'UK',
        choice4: 'USA',
    answer: 2,
    },
    {
        question: 'In which state is the main language Khasi?',
        choice1: 'Mizoram',
        choice2: 'Nagaland',
        choice3: 'Meghalaya',
        choice4: 'Tripura',
    answer: 3,
    },
    {
        question: 'The head quarters of world trade organization is in',
        choice1: 'Montreal',
        choice2: 'Seattle',
        choice3: 'Geneva',
        choice4: 'the Hague',
    answer: 3,
    },
    {
        question: 'Which is the largest coffee producing state of India?',
        choice1: 'Kerala',
        choice2: 'Tamil Nadu',
        choice3: 'Karnataka',
        choice4: 'Arunachal Pradesh',
    answer: 3,
    },
    {
        question: 'The 2014 football world cup was held in',
        choice1: 'China',
        choice2: 'Australia',
        choice3: 'Japan',
        choice4: 'Brazil',
    answer: 4,
    },
    {
        question: 'The Second Italian Satellite launched from Soviet Union was',
        choice1: 'Rohini',
        choice2: 'Aryabhatta',
        choice3: 'Bhaskar-1',
        choice4: 'Apsara',
    answer: 4,
    },
    {
        question: ' The language spoken by the people by Pakistan is ?',
        choice1: 'Hindi',
        choice2: 'Pauluan',
        choice3: 'Sindhi',
        choice4: 'Nauruan',
    answer: 3,
    },
    {
        question: 'Galileo was an astronomer who',
        choice1: 'developed the telescope',
        choice2: 'discovered four satellites of Jupiter',
        choice3: ' discovered that the movement of pendulum produces a regular time measurement',
        choice4: 'All of these',
    answer: 3,
    },
    {
        question: 'The metal whose salts are sensitive to light is',
        choice1: 'Silver',
        choice2: 'Zinc',
        choice3: 'Copper',
        choice4: 'Gold',
    answer: 1,
    },
    {
        question: 'Who is the father of geometry?',
        choice1: 'Aristotle',
        choice2: 'Euclid',
        choice3: 'Pythagoras',
        choice4: 'Kepler',
    answer: 2,
    },
    {
        question: 'Indian player Jude Felix is popular for which sports?',
        choice1: 'Volleyball',
        choice2: 'Football',
        choice3: 'Hockey',
        choice4: 'Tennis',
    answer: 3,
    },
    {
        question: ' Country that has the highest in Barley Production ?',
        choice1: 'China',
        choice2: 'India',
        choice3: 'France',
        choice4: 'Russia',
    answer: 4,
    },
    {
        question: 'Film and TV institute of India is located at',
        choice1: ' Pune (Maharashtra)',
        choice2: 'Rajkot (Gujarat)',
        choice3: 'Pimpri (Maharashtra)',
        choice4: 'Mumbai(Maharastra)',
    answer: 1,
    },
    {
        question: 'Guwahati High Court is the judicature of',
        choice1: 'Nagaland',
        choice2: 'Arunachal Pradesh',
        choice3: 'Assam',
        choice4: 'All of the above',
    answer: 4,
    },
    {
        question: 'Fire temple is the place of worship of which of the following religion?',
        choice1: 'Taoism',
        choice2: 'Judaism',
        choice3: 'Zoroastrianism (Parsi Religion)',
        choice4: 'Shintoism',
    answer: 3,
    },
    


]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    //console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //Got to end page
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('/end.html');

    }
    questionCounter++;
    progressText.innerText = `Question:${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer == currentQuestion.answer);

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect';
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
startGame();