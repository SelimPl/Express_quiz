// import { json } from "express"
const question = document.querySelector('#question')
// const ans1 = document.querySelector('#ans1')
// const ans2 = document.querySelector('#ans2')
// const ans3 = document.querySelector('#ans3')
// const ans4 = document.querySelector('#ans4')
const gameBoard = document.querySelector('#game-board')
const h2 = document.querySelector('h2');

function fillQuestionElements(data) {

    if (data.winner === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "Zwycięstwo ! <3";
        return;
    }


    if (data.loser === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "Wróć gdy nabieżesz więcej punktów dośiadczenia";
        return;
    }

    question.innerText = data.question
    // ans1.innerText = data.answers[0]
    // ans2.innerText = data.answers[1]
    // ans3.innerText = data.answers[2]
    // ans4.innerText = data.answers[3]
    for (const i in data.answers) {

        const answerEl = document.querySelector(`#ans${Number(i) + 1}`)
        answerEl.innerText = data.answers[i]
    }

}

function showNextQuestion() {
    fetch('/question', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            fillQuestionElements(data);
        });

}

showNextQuestion();


const goodAnswersSpan = document.querySelector('#good-answer')

function handleAnswerFeedback(data) {

    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();


}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
            method: 'POST',
        })
        .then(r => r.json())
        .then(data => {
            handleAnswerFeedback(data);
        });
}

const buttons = document.querySelectorAll('.answer-btn');

for (const button of buttons) {
    button.addEventListener('click', (e) => {
        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);




    })
}

const tipDiv = document.querySelector('#tip');

function handleFriendAnswer(data) {
    tipDiv.innerText = data.text
}


function callToAFriend() {
    fetch('/help/friend', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleFriendAnswer(data);
        });

}




function handleHalfOnHalf(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text
    } else {
        for (const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';
            }
        }
    }
}


function halfOnHalfUsed() {
    fetch('/help/half', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleHalfOnHalf(data);
        });






}

function handleCrowdAnswer(data) {
    if(typeof data.text === 'string'){
        tipDiv.innerText = data.text;

    }else {
    data.chart.forEach((percent, index) =>{

            buttons[index].innerText = buttons[index].innerText + ':' + percent + '%';

    })
    }
}


function questionToTheCrowd() {
    fetch('/help/crowd', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleCrowdAnswer(data);
        });






}

document.querySelector('#questionToTheCrowdUsed').addEventListener('click', questionToTheCrowd);

document.querySelector('#callToAFriendUsed').addEventListener('click', callToAFriend);

document.querySelector('#halfOnHalfUsed').addEventListener('click', halfOnHalfUsed);