// make function to generate a card deck
const makeDecks = () => {
  const deck = [];

  let suitIndex = 0;
  const suits = ["spades", "hearts", "clubs", "diamonds"];

  // loop 1 , 4 suits, give every suit an emoji
  while (suitIndex < suits.length) {
    const currentSuit = suits[suitIndex];
    let emojiSuit = "";
    if (currentSuit == "spades") {
      emojiSuit = "♠️";
    } else if (currentSuit == "hearts") {
      emojiSuit = "♥️";
    } else if (currentSuit == "clubs") {
      emojiSuit = "♣️";
    } else if (currentSuit == "diamonds") {
      emojiSuit = "♦️";
    }

    // loop 2, rank 1-13
    let rankCounter = 1;
    // assign card's value and different name for card 1, 11, 12, 13
    let cardValue = rankCounter;
    while (rankCounter <= 13) {
      let cardName = "";
      if (rankCounter == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = "king";
        cardValue = 10;
      } else {
        cardName = String(rankCounter);
        cardValue = rankCounter;
      }
      // assign a card object
      const card = {
        rank: rankCounter,
        suit: currentSuit,
        name: cardName,
        emojiSuit: emojiSuit,
        value: cardValue,
      };
      // push the card to card deck
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  // return a card deck
  return deck;
};

// generate a new card Deck
const deck = makeDecks();

// Returns a random card object from the deck.
const dealARandomCard = () => {
  let randomCard = deck[Math.floor(Math.random() * deck.length)];
  return randomCard;
};

// generate 2 card object in a row for the first drawn with params playerCards
const firstCardsDeal = (playerCards) => {
  playerCards.push(dealARandomCard());
  playerCards.push(dealARandomCard());
  return playerCards;
};

// a funtion to generates a new card
const addingNewCard = (playerCards, playerTotalScore) => {
  // generate a new card
  let newCard = dealARandomCard();
  // calculate the new user's score
  let newPlayerTotalScore = playerTotalScore + newCard.value;
  // push the new card to userCards array
  playerCards.push(newCard);
  let newCardMessage = `Your new card is : ${newCard.name} ${newCard.emojiSuit} total score : ${newPlayerTotalScore}. <br>`;

  return { newCard, newPlayerTotalScore, newCardMessage };
};

// a function to calculate in hand score with params playerCards
const calculateScore = (playerCards) => {
  let totalScore = 0;
  for (let i = 0; i < playerCards.length; i++) {
    let cardValue = Number(playerCards[i].value);
    totalScore = totalScore + cardValue;
    // check for an 11 (ace). If the score is already over 21, remove the 11 and replace it with a 1.
    if (cardValue == 11 && totalScore > 21) {
      cardValue = 1;
    }
  }
  // check for a blackjack (a hand with only 2 cards: ace + 10) and return 0 instead of the actual score. 0 will represent a blackjack in our game.
  if (totalScore == 21 && playerCards.length == 2) {
    return 0;
  }
  return totalScore;
};

// define a function to compare the score
const compareTheScore = (userTotalScore, compTotalScore) => {
  // If you and the computer are both over, you lose.
  if (userTotalScore > 21 && compTotalScore > 21) {
    return `You went over. You lose 😤`;
  }

  if (userTotalScore == compTotalScore) {
    return `Draw 🙃`;
  } else if (compTotalScore == 0) {
    return `Lose, opponent has Blackjack 😱`;
  } else if (userTotalScore == 0) {
    return `Win with a Blackjack 😎`;
  } else if (userTotalScore > 21) {
    return `You went over. You lose 😭`;
  } else if (compTotalScore > 21) {
    return `Opponent went over. You win 😁`;
  } else if (userTotalScore > compTotalScore) {
    return `You win 😃`;
  } else {
    return `You lose 😤`;
  }
};

// assign game mode for the game
const startTheGameMode = "START_THE_GAME_MODE";
const addCardMode = "ADD_CARD_MODE";
const gameOver = "GAME_OVER ";

let gameMode = startTheGameMode;

// assign an array for user and comp cards
let userCards = [];
let compCards = [];
// assign a var for the total amount of cards in hand
let userTotalScore;
let compTotalScore;

//play the game
var main = function (input) {
  var myOutputValue = "Click Submit to deal cards.";

  while (gameMode == startTheGameMode) {
    // generates the first 2 cards
    userCards = firstCardsDeal(userCards);
    compCards = firstCardsDeal(compCards);

    // calculate the score
    userTotalScore = calculateScore(userCards);
    compTotalScore = calculateScore(compCards);

    // comapring the score from the 1st 2 cards
    compareTheScore(userTotalScore, compTotalScore);

    const userCardsMessage = `user cards are: ${userCards[0].name} ${userCards[0].emojiSuit} and ${userCards[1].name} ${userCards[1].emojiSuit}`;
    const compCardsMessage = `computer cards are: ${compCards[0].name} ${compCards[0].emojiSuit} and ${compCards[1].name} ${compCards[1].emojiSuit}`;

    // check if there's blackjack
    if (compTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Lose, opponent has Blackjack 😱`;
    } else if (userTotalScore == 0) {
      gameMode = gameOver;
      return `${userCardsMessage}<br>${compCardsMessage}<br>
            Win with a Blackjack 😎`;
    }
    // if there's no blackjack, continue to play, ask the user whether to hit or stand
    gameMode = addCardMode;
    return `${userCardsMessage}, total score : ${userTotalScore} <br>
          ${compCardsMessage}, total score : ${compTotalScore} <br>
          Type 'y' to get another card, type 'n' to pass: `;
  }

  // ask the user whether to hit or stand
  if (gameMode == addCardMode && userTotalScore < 21 && input == "y") {
    // generate a new user's card
    let { newUserTotalScore, newCardMessage } = addingNewCard(
      userCards,
      userTotalScore
    );

    // if new total score is bigger than 21, the game is over, user lose, return the message
    if (newUserTotalScore > 21) {
      gameMode = gameOver;

      return compareTheScore(newUserTotalScore, compTotalScore);
    }
    return `${newCardMessage} <br>
            Type 'y' to get another card, type 'n' to pass:`;
  }

  if (input == "no") {
    let newCard = dealARandomCard();
    compCards.push(newCard);
    compTotalScore += newCard.value;
    return compareTheScore(userTotalScore, compTotalScore);
  }

  userCards = [];
  compCards = [];
  userTotalScore = 0;
  compTotalScore = 0;
  gameMode = startTheGameMode;
  return myOutputValue;
};
