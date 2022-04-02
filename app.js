const NUMURL = "http://numbersapi.com/";
const FAVNUMBER = 3;
const REPEAT = 3;
const numDiv = document.getElementById("number-facts");
const favNumDiv = document.getElementById("fav-number-facts");

// PART 1

// Step 1
axios.get(`${NUMURL}${FAVNUMBER}?json`)
    .then(res => console.log(res.data.text))
    .catch(err => console.log("Error", err))


// Step 2
function appendToPage(numText, div) {
    let newFact = document.createElement("p");
    newFact.innerText = numText
    div.append(newFact)
}

let multipleNumbers = [];

for (let i = 1; i < 5; i++) {
    multipleNumbers.push(
        axios.get(`${NUMURL}${i}?json`)
    );
}

Promise.all(multipleNumbers)
.then(numArr => (
    numArr.forEach(num => appendToPage((JSON.parse(JSON.stringify(num.data.text))), numDiv))
))
    .catch(err => console.log(err));


// Step 3

favNumArr = []

for (let i = 1; i < REPEAT + 1; i++) {
    favNumArr.push(
        axios.get(`${NUMURL}${FAVNUMBER}?json`)
    );
}
Promise.all(favNumArr)
.then(numArr => (
    numArr.forEach(num => appendToPage((JSON.parse(JSON.stringify(num.data.text))), favNumDiv))
))
    .catch(err => console.log(err));



// Part 2

let DECKID = "wwn18f2dcmfg"
const DRAWCARDURL = `http://deckofcardsapi.com/api/deck/${DECKID}/draw/?count=`

// Step 1

axios.get(`${DRAWCARDURL}1`)
    .then(res => console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`))
    .catch(err => console.log("Error", err))

// Step 2

axios.get(`${DRAWCARDURL}1`)
    .then(res => {
            console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
            return axios.get(`${DRAWCARDURL}1`);
    })
    .then(res => console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`))
    .catch(err => console.log("Error", err))

// Step 3

const NEWDECKURL = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
const cardDeckDiv = document.getElementById("carddeck");
const drawCardBtn = document.getElementById("draw-card-btn");
let deckId = null;

getDeckId = axios.get(`${NEWDECKURL}`)
    .then(res => {
        deckId = res.data.deck_id;
    })
    .catch(err => console.log("Error", err))


drawCardBtn.onclick = () => {
    axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => {
        let returnVal = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`
        newCard = document.createElement("p");
        newCard.innerText = returnVal;
        cardDeckDiv.append(newCard);
        })
    .catch(err => console.log("Error", err))
}