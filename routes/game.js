function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;
    let callToAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;


    const questions = [{
            question: 'Gdzie są rzeki bez wody ?',
            answers: ['Na mapie', 'w Afryce', 'w Chinach', 'w Polsce'],
            correctAnswer: 0,
        },
        {
            question: 'Jakiego koloru jest czerwony maluch ?',
            answers: ['Biały', ' Zielony', 'Zółty', 'Czerwony'],
            correctAnswer: 3,
        },
        {
            question: 'W jakiej wodzie ryby nie pływają',
            answers: ['Słonej', 'Mokrej', 'Gotowanej', 'Słodkiej'],
            correctAnswer: 2,
        },
        {
            question: 'Jeśli 5 maszyn w ciągu 5 minut produkuje 5 urządzeń, to ile czasu zajmie 100 maszynom zrobienie 100 urządzeń?',
            answers: ['5', ' 100', '50', 'żadne nie jest prawidłowe'],
            correctAnswer: 0,
        },
        {
            question: 'Mama Kasi ma pięć córek. Jeśli imiona jego córek to odpowiednio Klara, Karolina, Klaudia, Kinga to jakie będzie imię piątej córki?',
            answers: ['Kasia', ' Klaudia', 'Karolina', 'Kinga'],
            correctAnswer: 0,
        },
        {
            question: 'Pan Blue mieszka w niebieskim domu, Pani Pink mieszka w różowym domu, a Pan Brown w domu brązowym. Kto mieszka w Białym Domu?',
            answers: ['Pan White', 'Prezydent', 'Pan Brown', 'Pani Red'],
            correctAnswer: 1,
        },
        {
            question: 'Ten, kto mnie tworzy, nie potrzebuje mnie, kiedy to robi. Ten, który mnie kupuje nie potrzebuje mnie dla siebie. Ten, kto mnie użyje, nie będzie o tym wiedział. Czym jestem?',
            answers: ['Czas', 'Zegarek', 'Trumna', 'Gotówka'],
            correctAnswer: 2,
        },
        {
            question: 'Ile zwierząt Mojżesz zabrał do arki?',
            answers: ['Wszystkie', 'Wybrane gatunki', 'Ptaki', 'Żadnego'],
            correctAnswer: 3,
        },
    ]

    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            })




        } else if (isGameOver) {
            res.json({
                loser: true,
            })



        } else {
            const nextQuestion = questions[goodAnswers]
            const {
                question,
                answers
            } = nextQuestion;


            res.json({
                question,
                answers,
            })
        }
    })
    app.post('/answer/:index', (req, res) => {

        if (isGameOver) {
            res.json({
                loser: true,
            })
        }


        const {
            index
        } = req.params;
        const question = questions[goodAnswers]

        const isGoodAnswer = question.correctAnswer === Number(index);

        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswers,
        })

    })
    app.get('/help/friend', (req, res) => {
        if (callToAFriendUsed) {
            return res.json({
                text: 'To koło zostało już użyte.'
            })
        }

        callToAFriendUsed = true;

        const doesFriendKnowAnswer = Math.random() < 0.5;
        const question = questions[goodAnswers]

        res.json({
            text: doesFriendKnowAnswer ? `Sądze że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Hmm, no nie wiem....'
        })
    })

    app.get('/help/half', (req, res) => {
        if (halfOnHalfUsed) {
            return res.json({
                text: 'To koło zostało już użyte.'
            })
        }

        halfOnHalfUsed = true;


        const question = questions[goodAnswers];

        const answesrCopy = question.answers.filter((s, index) => (
            index !== question.correctAnswer

    ));

    
    answesrCopy.splice(~~(Math.random() * answesrCopy.length),1)



        res.json({
            answersToRemove: answesrCopy,
        })
    })

app.get('/help/crowd',(req,res) => {
    if (questionToTheCrowdUsed) {
        return res.json({
            text: 'To koło zostało już użyte.'
        })
    }

    questionToTheCrowdUsed = true;

    const chart = [10,20,30,40];

        for (let i =chart.length-1 ; i>0 ; i--) {
const change = Math.floor(Math.random() * 20 - 10);

chart[i] += change;
chart[i - 1] -= change;

        }
          const question = questions[goodAnswers];
        const{correctAnswer} = question;

[chart[3],chart[correctAnswer]] = [chart[correctAnswer], chart[3]];


    res.json({
        chart,
    })

})

}



module.exports = gameRoutes;