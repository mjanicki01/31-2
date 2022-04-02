const NUMURL = "http://numbersapi.com/";
const FAVNUMBER = 3;
const REPEAT = 3;
const numDiv = document.getElementById("number-facts");
const favNumDiv = document.getElementById("fav-number-facts");

// Part 1
// Step 1

async function getFavNum() {
    res = await axios.get(`${NUMURL}${FAVNUMBER}?json`);
    console.log(res.data.text);
}

getFavNum()

// Step 2 & 3

let multipleNumbers = [];

function appendToPage(numText, div) {
    let newFact = document.createElement("p");
    newFact.innerText = numText;
    div.append(newFact);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

for (let i = 1; i < REPEAT + 1; i++) {
    multipleNumbers.push(getRandomInt(100));
}

async function appendMultiNum(arr) {
    for (let i = 0; i < arr.length; i++) {
        res = await axios.get(`${NUMURL}${arr[i]}?json`)
        appendToPage((JSON.parse(JSON.stringify(res.data.text))), numDiv)
    }
}

appendMultiNum(multipleNumbers)


// PART 2

const NEWDECKURL = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
const cardDeckDiv = document.getElementById("carddeck");
const drawCardBtn = document.getElementById("draw-card-btn");

class CardDeck {

    async init() {
        let res = await axios.get(NEWDECKURL);
        this.deckId = res.data.deck_id;
    }

    async shuffleDeck() {
        await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
    }

    async getCard(numCards) {
        await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${numCards}`)
    }
}

deck = new CardDeck;
deck.init()

drawCardBtn.onclick = () => {
    let res = deck.getCard(1);
    let returnVal = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
    newCard = document.createElement("p");
    newCard.innerText = returnVal;
    cardDeckDiv.append(newCard);
};

