//The basic idea
//You are going to create a simple card game in which a player will be able to battle the autoplayer. The game will deal 3 cards (each of which has a damage value) to the player and three cards to the autoplayer. The player will choose a card, and the computer will randomly choose a card, and whichever's card has the highest value will win the point. A round is finished once this has happened three times.

//The Cards
//Here is the array of cards. Instructions below.

//THIS DRAWS A RANDOM CARD FROM A DECK
class Deck {
    // draw a random card
    // deck has a property of cards
    constructor(cards) {

        this.cards = cards.slice(); //creates a copy of all objects in array, it won't mutate original cards, this is my declaration and initialization of the array Cards. I can do this right? Pull cards out of the array within the class? I mean, since it's all objects I can do it anywhere I want. That's right stupid cards you don't tell me what to do. I do what I want.
    }
    drawCardAt(index) {
    	return this.cards.splice(index, 1)[0];
    	//the splice method uses first, the index, which I have, second, howmany which is 1 card, still a method within the class. we use splice to KEEP shit here, because we aren't pulling stuff out yet. 
    }
    drawRandom() {
        let index = Math.floor(Math.random() * this.cards.length); //this is my random index
        return this.drawCardAt(index); //split these up so I can have drawing cards and drawing a random card be two separate things
         // this is returning my copy of the cards, with an index that is random from the cards length.
        
     }
}	

//need to mutate the array when I draw them Check
//need to put the cards back, figured out a way around by pulling them out
//if I am drawing random cards from a deck, ensure I don't draw the same card twice. The point of the object is that it's encapsulating a single idea as card, easier to access by name rather than index. Did this by creating a new array

//When I'm trying to do what I'm trying to do, break down that part of it, into small steps. Get it even smaller. 



const originalCards = [{
    name: "Bulbasaur",
    damage: 60
}, {
    name: "Caterpie",
    damage: 40
}, {
    name: "Charmander",
    damage: 60
}, {
    name: "Clefairy",
    damage: 50
}, {
    name: "Jigglypuff",
    damage: 60
}, {
    name: "Mankey",
    damage: 30
}, {
    name: "Meowth",
    damage: 60
}, {
    name: "Nidoran - female",
    damage: 60
}, {
    name: "Nidoran - male",
    damage: 50
}, {
    name: "Oddish",
    damage: 40
}, {
    name: "Pidgey",
    damage: 50
}, {
    name: "Pikachu",
    damage: 50
}, {
    name: "Poliwag",
    damage: 50
}, {
    name: "Psyduck",
    damage: 60
}, {
    name: "Rattata",
    damage: 30
}, {
    name: "Squirtle",
    damage: 60
}, {
    name: "Vulpix",
    damage: 50
}, {
    name: "Weedle",
    damage: 40
}];



const playGame = (rounds) => {
    const newDeck = new Deck(originalCards); //I want to pass in the original cards completely, because it's creating a copy of original cards, so that when I play a new game I can reset it with the original cards again. Has a cards property, and a draw random method. 
    const playerCards = [];
    const computerCards = [];
    for (let i = 0; i < rounds; i++) {
        playerCards.push(newDeck.drawRandom()); //Now these arrays have three cards each, random!!!
        computerCards.push(newDeck.drawRandom()); // Computer hand!!!!
        //tested here, pulled code out so it would be global, put in console to make sure it was drawing right. Drew four because I had it <=, fixed to <.
    }
    //create an instance of a deck and pass into it, playerHand
    let playerHand = new Deck(playerCards); //now these are proper deck objects, we dont want to work with just a dumb array, we want to work with smart object that knows how to call functions on those cards.
    let computerHand = new Deck(computerCards);
    let playerScore = 0;
    let computerScore = 0;
    //these variables persist through each round, it resets before it begins the first round. Then each round increments the winner's score accordingly. Once the loop ends, which is after x number of rounds, then we have the final score of each player
    for (let i = 0; i < rounds; i++) {
        let outcome = playRound(playerHand, computerHand)
        if (outcome == "Eggbert won round") {
            playerScore++;
            alertAndLog("Eggbert won the round!");
        } else if (outcome == "Tie") {
            alertAndLog("No one won this round, so no one gets points");
        } else {
            computerScore++;
            alertAndLog("The computer has won this round.");
        } 
        alertAndLog("Here is the player score: " + playerScore + " and the computer score: " + computerScore);
       
    } 

    if (playerScore > computerScore) {
        alertAndLog("Eggbert wins!");
    } else if (computerScore > playerScore) {
        alertAndLog("Computer wins!");
    } else {
        alertAndLog("It's a tie!");
    }
}
const alertAndLog = (str) => { 
    console.log(str);
    alert(str);
}
//this is a phase of the game
const playRound = (playerHand, computerHand) => {
    // first choose card
    let promptBox = "";
    //can pass a literal string, or I can pass a variable that contains a string. Inevitably you change something in code, so it's good practice to make a variable to store whatever you need now in case you need to change it later. Also to describe what that string is, semantically.
    for (let j = 0; j < playerHand.cards.length; j++) {
        promptBox += `${j+1}. name:  ${playerHand.cards[j].name}  damage:  ${playerHand.cards[j].damage}\n`;
        // these brackets ${} represent more than just the object, you can do things to whatever they represent. Since j is a number, I can add to it to allow people who use the console to read an array as 1, 2, 3 instead of 0, 1, 2. So their selection won't be weird. 


    }
    promptBox += "Type the number that corresponds to the card you wish to play?"
    // http://jennifermadden.com/javascript/lineBreaks.html <--- found this out
  
    let index = prompt(promptBox);
    index = parseInt(index) - 1;
    //input is the index of the card they chose. I converted it to 1,2,3 instead of 0,1,2
    //In this prompt box, we want to have the players remaining cards defined for them. One per line. And then, finally the prompt to type a number corresponding to the card they want to play. Prompt takes a single string, I want to build that string using the for loop... Concatenation does this. For loop is going to add this on to the empty string.

    //at this stage I want a card
    //saved to variables so that I can use them outside the array

  	let playerSingleCard = playerHand.drawCardAt(index);
  	let computerSingleCard = computerHand.drawRandom();
  	//now once I draw the cards, it will remove them from hands, next round, those cards won't be there!!! YESSSSS LOOK MA NO CARDS. !!!!1
    alertAndLog(`The computer played a ${computerSingleCard.name} with an attack of ${computerSingleCard.damage}`)
 
    //now I don't have to cl something like "pick a card, 1, 2, 3" with a bunch of different loops, since each round will lose a card out of it. 
    //type in the console 1, 2 or 3. if you are a player. Then when I use index, just subract one.

    //player prompted
    //computer random
    if(playerSingleCard.damage > computerSingleCard.damage) {
		
        return "Eggbert won round";
	} else if (playerSingleCard.damage == computerSingleCard.damage){
		return "Tie";
	} else {
		return "Computer has won";
	}
}


//Calling the entire game function requires number of rounds. 
playGame(3); 



//lose condition
//whoever wins the round, keep track of winner, 3 times length of the array of cards






//Example Play
//There are 10 Pokemon cards in the deck

//Eggbert (the player) is dealt three random cards from the deck

// for(let i = 0; i < 3; i++) { 
//copyCards = Math.floor(Math.random(originalCards[0].name));

//The computer is dealt three random cards from the deck

// 
//}

//Eggbert chooses a card and plays it! It has a damage of 10.

// const gamePlay = (card) => {

//}

//

//The computer randomly chooses a card and plays it! It has a damage of 8.




// //Eggbert wins!


// //The score is displayed:
// //somewhere in here, the array object for player has to get values passed in from the array object pokemon. So if player has Clefairy, his damage is now 60
// printStates: function() {
// 	console.log(player.name + " (Eggbert" + player.damage + "points.");
// 	console.log(computer.name + " (Computer) " + computer.damage );
// }


//Score: Eggbert: 1, Computer: 0

//Rounds Won: Eggbert: 0, Computer: 0

//They do this again two more times. The round ends.

//The score is displayed. The rounds won are displayed.

//The game object

//For each part, think about:

//What's the best data type for this property? Number? String? Array? object? boolean? Some crazy combination of these).

//Hint/reminder: use a property when you want to "keep track" of something

//Or should you create a method?

//The game should be able to:

//keep a library of all the Pokemon cards that can be played (see the array in the "The Cards" section)

//know what cards have been 

//know how many cards are left to be played/dealt overall

//track points for both the player and the computer Note: Points are determined by the following: If the player's card beats the computer's card, the player gets one point (and vice versa). If there is a tie, no one gets a point.

//track rounds

//track number of rounds won for both player and computer
//automatically deal 3 cards from the library to the player and 3 cards to the computer each round
//determine the winner of each play
//stop once there are no cards left or not enough to deal 3 to each the player and computer

//The player object
//The player should be able to:
//see their stats: their points and how many rounds they've won.
//see what cards they have been dealt/see what cards are left in their hand
//pick a card from the hand that has been dealt to them (thereby playing this card agaist the computer's card). The round ends once this has happened 3 times.
//receive new cards given to them by the game each round.
//see the cards that they have played in the past.
//The "UI"
//The user should see the following in the console:

/* the scoreboard after each round
the cards in the player's hand
the cards in the computer's hand
the cards that are in play
the winner of each round (or if there was a tie)
the winner of the game when the game is over
the final score when the game is over */


//Game
//inside game there is a deck
//inside game there are players
//inside players there are victory conditions