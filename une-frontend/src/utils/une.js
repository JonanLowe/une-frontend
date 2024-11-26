class Deck{
    constructor(){
            this.deckPile=[
                {cardType: "number", cardNumber: "0", cardColour: "purple"},
                {cardType: "number", cardNumber: "1", cardColour: "purple"},
                {cardType: "number", cardNumber: "1", cardColour: "purple"}, 
                {cardType: "number", cardNumber: "2", cardColour: "purple"}, 
                {cardType: "number", cardNumber: "2", cardColour: "purple"},
                {cardType: "number", cardNumber: "3", cardColour: "purple"},
                {cardType: "number", cardNumber: "3", cardColour: "purple"},
                {cardType: "number", cardNumber: "4", cardColour: "purple"},
                {cardType: "number", cardNumber: "4", cardColour: "purple"},
                {cardType: "number", cardNumber: "5", cardColour: "purple"},
                {cardType: "number", cardNumber: "5", cardColour: "purple"},
                {cardType: "number", cardNumber: "6", cardColour: "purple"},
                {cardType: "number", cardNumber: "6", cardColour: "purple"},
                {cardType: "number", cardNumber: "7", cardColour: "purple"},
                {cardType: "number", cardNumber: "7", cardColour: "purple"},
                {cardType: "number", cardNumber: "8", cardColour: "purple"},
                {cardType: "number", cardNumber: "8", cardColour: "purple"},
                {cardType: "number", cardNumber: "9", cardColour: "purple"},
                {cardType: "number", cardNumber: "9", cardColour: "purple"},
                {cardType: "number", cardNumber: "0", cardColour: "orange"},
                {cardType: "number", cardNumber: "1", cardColour: "orange"},
                {cardType: "number", cardNumber: "1", cardColour: "orange"}, 
                {cardType: "number", cardNumber: "2", cardColour: "orange"}, 
                {cardType: "number", cardNumber: "2", cardColour: "orange"},
                {cardType: "number", cardNumber: "3", cardColour: "orange"},
                {cardType: "number", cardNumber: "3", cardColour: "orange"},
                {cardType: "number", cardNumber: "4", cardColour: "orange"},
                {cardType: "number", cardNumber: "4", cardColour: "orange"},
                {cardType: "number", cardNumber: "5", cardColour: "orange"},
                {cardType: "number", cardNumber: "5", cardColour: "orange"},
                {cardType: "number", cardNumber: "6", cardColour: "orange"},
                {cardType: "number", cardNumber: "6", cardColour: "orange"},
                {cardType: "number", cardNumber: "7", cardColour: "orange"},
                {cardType: "number", cardNumber: "7", cardColour: "orange"},
                {cardType: "number", cardNumber: "8", cardColour: "orange"},
                {cardType: "number", cardNumber: "8", cardColour: "orange"},
                {cardType: "number", cardNumber: "9", cardColour: "orange"},
                {cardType: "number", cardNumber: "9", cardColour: "orange"},
                {cardType: "number", cardNumber: "0", cardColour: "pink"},
                {cardType: "number", cardNumber: "1", cardColour: "pink"},
                {cardType: "number", cardNumber: "1", cardColour: "pink"}, 
                {cardType: "number", cardNumber: "2", cardColour: "pink"}, 
                {cardType: "number", cardNumber: "2", cardColour: "pink"},
                {cardType: "number", cardNumber: "3", cardColour: "pink"},
                {cardType: "number", cardNumber: "3", cardColour: "pink"},
                {cardType: "number", cardNumber: "4", cardColour: "pink"},
                {cardType: "number", cardNumber: "4", cardColour: "pink"},
                {cardType: "number", cardNumber: "5", cardColour: "pink"},
                {cardType: "number", cardNumber: "5", cardColour: "pink"},
                {cardType: "number", cardNumber: "6", cardColour: "pink"},
                {cardType: "number", cardNumber: "6", cardColour: "pink"},
                {cardType: "number", cardNumber: "7", cardColour: "pink"},
                {cardType: "number", cardNumber: "7", cardColour: "pink"},
                {cardType: "number", cardNumber: "8", cardColour: "pink"},
                {cardType: "number", cardNumber: "8", cardColour: "pink"},
                {cardType: "number", cardNumber: "9", cardColour: "pink"},
                {cardType: "number", cardNumber: "9", cardColour: "pink"},
                {cardType: "number", cardNumber: "0", cardColour: "black"},
                {cardType: "number", cardNumber: "1", cardColour: "black"},
                {cardType: "number", cardNumber: "1", cardColour: "black"}, 
                {cardType: "number", cardNumber: "2", cardColour: "black"}, 
                {cardType: "number", cardNumber: "2", cardColour: "black"},
                {cardType: "number", cardNumber: "3", cardColour: "black"},
                {cardType: "number", cardNumber: "3", cardColour: "black"},
                {cardType: "number", cardNumber: "4", cardColour: "black"},
                {cardType: "number", cardNumber: "4", cardColour: "black"},
                {cardType: "number", cardNumber: "5", cardColour: "black"},
                {cardType: "number", cardNumber: "5", cardColour: "black"},
                {cardType: "number", cardNumber: "6", cardColour: "black"},
                {cardType: "number", cardNumber: "6", cardColour: "black"},
                {cardType: "number", cardNumber: "7", cardColour: "black"},
                {cardType: "number", cardNumber: "7", cardColour: "black"},
                {cardType: "number", cardNumber: "8", cardColour: "black"},
                {cardType: "number", cardNumber: "8", cardColour: "black"},
                {cardType: "number", cardNumber: "9", cardColour: "black"},
                {cardType: "number", cardNumber: "9", cardColour: "black"},
            ]
    }

    shuffle(){
        let currentIndex = this.deckPile.length;
  
        while (currentIndex != 0) {
    
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [this.deckPile[currentIndex], this.deckPile[randomIndex]] = [
            this.deckPile[randomIndex], this.deckPile[currentIndex]];
        }
    }

    resetPiles(discardPile){
        if(this.deckPile.length>0){
            while(this.deckPile.length>0){
                discardPile.push(this.deckPile[this.deckPile.length -1])
                this.deckPile.pop()
            }
        }
        this.deckPile=[...discardPile]
        this.shuffle()
        playingDiscardPile.discardPile=[]
    }

    drawCards(cardsDrawn, playerHand){
        console.log("Try draw")
        if(cardsDrawn> this.deckPile.length)this.resetPiles(playingDiscardPile.discardPile)
        for(let i=0; i<cardsDrawn; i++){
            playerHand.push(this.deckPile[this.deckPile.length -1])
            this.deckPile.pop(this.deckPile[this.deckPile.length -1])
        }
        console.log(playerHand)
        if(this.deckPile.length===0)this.resetPiles(playingDiscardPile.discardPile)
      }

    startGame(totalPlayers, discardPile){
        this.shuffle()
        for(let i=0; i< totalPlayers.length; i++){
            this.drawCards(7, totalPlayers[i].hand) 
        }
        discardPile.push(this.deckPile[this.deckPile.length -1])
        this.deckPile.pop()
    }
}

class Discard{
    constructor(){
        this.discardPile=[]
    }
}

class Player{
    constructor(username){
        this.username=username
        this.hand=[]
        this.isTurnFinished=false
        this.validTurn= false
    }

    isValidCard(card, discardPile){
        if(this.hand[card].cardColour===discardPile[discardPile.length -1].cardColour || this.hand[card].cardNumber===discardPile[discardPile.length -1].cardNumber){
            this.validTurn= true
            return true
        }
        else{
            console.log("choose a valid card")
            return false
        }
    }

    playCard(card, discardPile){
        if(this.isValidCard(card, discardPile)){
            discardPile.push(this.hand[card])
            this.hand.splice(card,1)
            this.isTurnFinished=true
        }
    }

    canDoValidMove(){
        for(let i=0; i<this.hand.length; i++){
            if(this.isValidCard(i,playingDiscardPile.discardPile)){
                console.log("got a valid card")
                this.validTurn= true
                return true
            }
        }
        this.validTurn= false
        return false
    }

    drawUntilValidCard(){
        this.canDoValidMove()
        while(this.validTurn===false){
            console.log("added a card")
            playingDeck.drawCards(1, this.hand)
            this.canDoValidMove()
        }
    }

    hasWon(){
        if(this.hand.length===0)return true
        return false
    }
}

function hasAnyoneWon(totalPlayers){
    for(let i=0; i<totalPlayers.length; i++){
        if(totalPlayers[i].hasWon()===true)return true
        else{return false}
    }
}

/* 
Game(){



    while(!hasAnyoneWon()){
        console.log("game time")
        totalPlayers[totalPlayers.length -1].hasWon()
        while(!playerOne.isTurnFinished){
            console.log("Player 1 turn----------------")
            console.log(playerOne.hand, "P ONE HAND")
            playerOne.canDoValidMove()
            totalPlayers[totalPlayers.length -1].isTurnFinished=false
            playerOne.playCard(0, playingDiscardPile.discardPile)
            }
            playerOne.hasWon()
            while(!playerTwo.isTurnFinished){
                console.log("Player 2 turn----------------")
        console.log(playerTwo.hand, "P TWO HAND")
        playerTwo.canDoValidMove()
        playerOne.isTurnFinished=false
        playerTwo.playCard(0, playingDiscardPile.discardPile)
        }
        if(totalPlayers.length>=3){
            playerTwo.hasWon()
        while(!playerThree.isTurnFinished){
            console.log("Player 3 turn----------------")
            console.log(playerThree.hand, "P THREE HAND")
            playerThree.canDoValidMove()
            playerTwo.isTurnFinished=false
            playerThree.playCard(0, playingDiscardPile.discardPile)
            }
            }
            if(totalPlayers.length===4){
                playerThree.hasWon()
                while(!playerFour.isTurnFinished){
                    console.log("Player 4 turn----------------")
                    playerFour.canDoValidMove()
                    playerThree.isTurnFinished=false
                    playerFour.playCard(0, playingDiscardPile.discardPile)
                    }
                    }
                    console.log("ONE TURN ROUND")
                    }
                    
                    console.log("Player x Won!!") 
}
                    */

//module.exports={Player, Deck, Discard, hasAnyoneWon}
export{Player, Deck, Discard, hasAnyoneWon}