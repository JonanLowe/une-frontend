const {Player, Deck, Discard, hasAnyoneWon}= require('./une.js')


/* playerOne= new Player("CFodd")
playerOne.username= "Not CFodd" 
playerTwo= new Player("P2")
playerThree= new Player("P3")

totalPlayers=[playerOne, playerTwo]

playingDiscardPile= new Discard()

playingDeck= new Deck()
playingDeck.startGame(totalPlayers, playingDiscardPile.discardPile) */

//DECK ============================================================================
//=================================================================================
//=================================================================================
describe("Deck methods correctly working",()=>{
    //SHUFFLE======================================================================
    test("shuffle works as intended",()=>{
        testDeck= new Deck()
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"},
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}
        ]
        const actualOutput= testDeck.deckPile
        testDeck.shuffle()
        const expectedOutput=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"},
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}
        ]
        expect(actualOutput).not.toEqual(expectedOutput)
        expect(actualOutput.length).toBe(expectedOutput.length)
    })
    //RESET DISCARD & DECK PILES========================================================
    test("if any cards are in the discard pile, move them to the deck and then empty the discard pile",()=>{
        testDeck= new Deck()
        playingDiscardPile= new Discard()
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"}
        ]
        playingDiscardPile.discardPile= [
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}]

            const expectedOutputDeck= [
                {cardType: "number", cardNumber: "0", cardColour: "blue"},
                {cardType: "number", cardNumber: "1", cardColour: "blue"},
                {cardType: "number", cardNumber: "2", cardColour: "blue"},
                {cardType: "number", cardNumber: "3", cardColour: "blue"},
                {cardType: "number", cardNumber: "4", cardColour: "blue"},
                {cardType: "number", cardNumber: "5", cardColour: "blue"}
            ]
            const expectedOutputDiscard= []
            
        testDeck.resetPiles(playingDiscardPile.discardPile)
            
        const actualOutputDiscard= playingDiscardPile.discardPile
        const actualOutputDeck= testDeck.deckPile

        expect(actualOutputDiscard).toEqual(expectedOutputDiscard)
        expect(actualOutputDeck).not.toEqual(expectedOutputDeck)
        expect(actualOutputDeck.length).toBe(expectedOutputDeck.length)
    })
    //DRAW A CARD=======================================================================
    test("drawCards pops a card from the end of the deck",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"}
        ]

        const actualOutput= testDeck.deckPile
        testDeck.drawCards(1, testPlayer.hand)
        const expectedOutput= [
        {cardType: "number", cardNumber: "0", cardColour: "blue"},
        {cardType: "number", cardNumber: "1", cardColour: "blue"}]

        expect(actualOutput).toEqual(expectedOutput)
    })
    test("drawCards pushes the card removed from deck onto the player's hand",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"}
        ]

        const actualOutput= testPlayer.hand
        testDeck.drawCards(1, testPlayer.hand)
        const expectedOutput= [{cardType: "number", cardNumber: "2", cardColour: "blue"}]

        expect(actualOutput).toEqual(expectedOutput)
    })
    test("drawCards works for multiple cards being drawn",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"},
            {cardType: "number", cardNumber: "3", cardColour: "blue"}
        ]

        const actualOutputDeck= testDeck.deckPile
        const expectedOutputDeck= [{cardType: "number", cardNumber: "0", cardColour: "blue"}]

        const actualOutputPlayer= testPlayer.hand
        const expectedOutputPlayer= [
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"}]

        testDeck.drawCards(3, testPlayer.hand)

        expect(actualOutputPlayer).toEqual(expectedOutputPlayer)
        expect(actualOutputDeck).toEqual(expectedOutputDeck)
    })
    test("when you draw more cards then there are available it resets the piles",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        playingDiscardPile= new Discard()
        playingDiscardPile.discardPile= [
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}]
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"}
        ]

        
        const expectedOutputDeck= 2

        testDeck.drawCards(4, testPlayer.hand)
        const actualOutputDeck= testDeck.deckPile
        const actualOutputDiscard= playingDiscardPile.discardPile
        const expectedOutputDiscard= []

        expect(actualOutputDeck.length).toBe(expectedOutputDeck)
        expect(actualOutputDiscard).toEqual(expectedOutputDiscard)
    })
    test("when you an equal amount of cards as there is in the deck, it resets the piles",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        playingDiscardPile= new Discard()
        playingDiscardPile.discardPile= [
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}]
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"}
        ]

        
        const expectedOutputDeck= 3

        testDeck.drawCards(3, testPlayer.hand)
        const actualOutputDeck= testDeck.deckPile
        const actualOutputDiscard= playingDiscardPile.discardPile
        const expectedOutputDiscard= []

        expect(actualOutputDeck.length).toBe(expectedOutputDeck)
        expect(actualOutputDiscard).toEqual(expectedOutputDiscard)
    })
    //START GAME============================================================================
    test("should push one card onto the discard pile and pop one off the deck",()=>{
        testDeck= new Deck()
        testPlayer= new Player("Test Player")
        playingDiscardPile= new Discard()
        testDeck.deckPile=[
            {cardType: "number", cardNumber: "0", cardColour: "blue"},
            {cardType: "number", cardNumber: "1", cardColour: "blue"},
            {cardType: "number", cardNumber: "2", cardColour: "blue"},
            {cardType: "number", cardNumber: "3", cardColour: "blue"},
            {cardType: "number", cardNumber: "4", cardColour: "blue"},
            {cardType: "number", cardNumber: "5", cardColour: "blue"}
        ]

        testDeck.startGame([], playingDiscardPile.discardPile)

        const actualOutputDeck= testDeck.deckPile
        const actualOutputDiscard= playingDiscardPile.discardPile

        const expectedOutputDeck= 5
        const expectedOutputDiscard= 1

        expect(actualOutputDeck.length).toBe(expectedOutputDeck)
        expect(actualOutputDiscard.length).toBe(expectedOutputDiscard)
    })
    test("should give all players in the array 7 cards.",()=>{
        testDeck= new Deck()
        testPlayer1= new Player("Test Player 1")
        testPlayer2= new Player("Test Player 2")
        playingDiscardPile= new Discard()
        testDeck.deckPile=[
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
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]

        testDeck.startGame([testPlayer1, testPlayer2], playingDiscardPile.discardPile)

        const actualOutputDeck= testDeck.deckPile
        const actualOutputPlayer1= testPlayer1.hand
        const actualOutputPlayer2= testPlayer2.hand

        const expectedOutputDeck= 1
        const expectedOutputPlayer1= 7
        const expectedOutputPlayer2= 7

        expect(actualOutputDeck.length).toBe(expectedOutputDeck)
        expect(actualOutputPlayer1.length).toBe(expectedOutputPlayer1)
        expect(actualOutputPlayer2.length).toBe(expectedOutputPlayer2)
    })
})

//PLAYER CLASS TESTING=====================================
//=========================================================
//=========================================================
describe("Player Class testing", ()=>{
    //CARD VALIDATION =============================================
    test("Return true if the card is capable of being played (same colour)",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[{cardType: "number", cardNumber: "8", cardColour: "purple"}]
        playingDiscardPile.discardPile=[{cardType: "number", cardNumber: "6", cardColour: "purple"}]

        const actualOutput= testPlayer.isValidCard(0, playingDiscardPile.discardPile)
        const expectedOutput= true
        

        expect(actualOutput).toBe(expectedOutput)
        
    })
    test("Return true if the card is capable of being played (same number)",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[{cardType: "number", cardNumber: "8", cardColour: "orange"}]
        playingDiscardPile.discardPile=[{cardType: "number", cardNumber: "8", cardColour: "purple"}]

        const actualOutput= testPlayer.isValidCard(0, playingDiscardPile.discardPile)
        const expectedOutput= true
        

        expect(actualOutput).toBe(expectedOutput)
        
    })
    test("Return false if the card is NOT capable of being played ",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[{cardType: "number", cardNumber: "6", cardColour: "orange"}]
        playingDiscardPile.discardPile=[{cardType: "number", cardNumber: "8", cardColour: "purple"}]

        const actualOutput= testPlayer.isValidCard(0, playingDiscardPile.discardPile)
        const expectedOutput= false
        
        expect(actualOutput).toBe(expectedOutput)
    })
    //PLAY CARD METHOD =======================================================
    test("Return undefined does not get through the validation check",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[{cardType: "number", cardNumber: "6", cardColour: "orange"}]
        playingDiscardPile.discardPile=[{cardType: "number", cardNumber: "8", cardColour: "purple"}]

        const actualOutput= testPlayer.playCard(0, playingDiscardPile.discardPile)
        const expectedOutput= undefined
        
        expect(actualOutput).toBe(expectedOutput)
    })
    test("If it passes the validation check add a card to the discard pile and remove it from hand",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[{cardType: "number", cardNumber: "8", cardColour: "orange"}]
        playingDiscardPile.discardPile=[{cardType: "number", cardNumber: "8", cardColour: "purple"}]

        testPlayer.playCard(0, playingDiscardPile.discardPile)

        const actualOutputPlayer= testPlayer.hand
        const expectedOutputPlayer= []

        const actualOutputDiscard= playingDiscardPile.discardPile
        const expectedOutputDiscard= [{cardType: "number", cardNumber: "8", cardColour: "purple"}, {cardType: "number", cardNumber: "8", cardColour: "orange"}]
        
        expect(actualOutputPlayer).toEqual(expectedOutputPlayer)
        expect(actualOutputDiscard).toEqual(expectedOutputDiscard)
    })
    //CAN DO VALID MOVE=========================================================
    test("Returns true if any card in the hand can be played",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[
            {cardType: "number", cardNumber: "4", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "8", cardColour: "orange"}
        ]
        playingDiscardPile.discardPile=[
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]

        const actualOutput= testPlayer.canDoValidMove()
        const expectedOutput= true
        
        expect(actualOutput).toBe(expectedOutput)
    })
    test("Returns false if no card in the hand can be played",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[
            {cardType: "number", cardNumber: "4", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "7", cardColour: "orange"}
        ]
        playingDiscardPile.discardPile=[
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]

        const actualOutput= testPlayer.canDoValidMove()
        const expectedOutput= false
        
        expect(actualOutput).toBe(expectedOutput)
    })
    //DRAW UNTIL VALID CARD===============================================
    test("Return undefined if it passes the can do valid move check",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()

        testPlayer.hand=[
            {cardType: "number", cardNumber: "8", cardColour: "orange"}
        ]
        playingDiscardPile.discardPile=[
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]

        const actualOutput= testPlayer.drawUntilValidCard()
        const expectedOutput= undefined

        expect(actualOutput).toBe(expectedOutput)
    })
    test("If it fails the canDoValidMove check then draw cards until you can play one. (one draw)",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()
        playingDeck= new Deck()

        playingDeck.deckPile=[
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "8", cardColour: "orange"}
        ]
        testPlayer.hand=[
            {cardType: "number", cardNumber: "7", cardColour: "orange"}
        ]
        playingDiscardPile.discardPile=[
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]
        testPlayer.drawUntilValidCard()

        const actualOutputPlayer= testPlayer.hand
        const expectedOutputPlayer= [
            {cardType: "number", cardNumber: "7", cardColour: "orange"},
            {cardType: "number", cardNumber: "8", cardColour: "orange"}
        ]

        expect(actualOutputPlayer).toEqual(expectedOutputPlayer)
    })
    test("If it fails the canDoValidMove check then draw cards until you can play one. (5 draw)",()=>{
        testPlayer= new Player("Test Player 1")
        playingDiscardPile= new Discard()
        playingDeck= new Deck()

        playingDeck.deckPile=[
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "8", cardColour: "orange"},
            {cardType: "number", cardNumber: "1", cardColour: "orange"},
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "4", cardColour: "orange"}
        ]
        testPlayer.hand=[
            {cardType: "number", cardNumber: "7", cardColour: "orange"}
        ]
        playingDiscardPile.discardPile=[
            {cardType: "number", cardNumber: "8", cardColour: "purple"}
        ]
        testPlayer.drawUntilValidCard()

        const actualOutputPlayer= testPlayer.hand
        const expectedOutputPlayer= [
            {cardType: "number", cardNumber: "7", cardColour: "orange"},
            {cardType: "number", cardNumber: "4", cardColour: "orange"},
            {cardType: "number", cardNumber: "3", cardColour: "orange"},
            {cardType: "number", cardNumber: "2", cardColour: "orange"},
            {cardType: "number", cardNumber: "1", cardColour: "orange"},
            {cardType: "number", cardNumber: "8", cardColour: "orange"}
        ]

        expect(actualOutputPlayer).toEqual(expectedOutputPlayer)
    })
    //HAS WON==============================================================
    test("If the player has 0 cards hasWon() returns true",()=>{
        testPlayer= new Player("Test Player 1")

        const actualOutput= testPlayer.hasWon()
        const expectedOutput= true

        expect(actualOutput).toBe(expectedOutput)
    })
    test("If the player has MORE THAN 0 cards hasWon() returns false",()=>{
        testPlayer= new Player("Test Player 1")
        testPlayer.hand=[
            {cardType: "number", cardNumber: "7", cardColour: "orange"}
        ]

        const actualOutput= testPlayer.hasWon()
        const expectedOutput= false

        expect(actualOutput).toBe(expectedOutput)
    })
})
//GAME FUNCTIONS==================================================
//================================================================
//================================================================
describe("General game testing",()=>{
    //hasAnyoneWon================================================
    test("hasAnyone function returns false if all players fail hasWon()",()=>{
        testPlayer1= new Player("Test Player 1")
        testPlayer2= new Player("Test Player 2")
        const totalPlayers=[testPlayer1, testPlayer2]

        testPlayer1.hand=[
            {cardType: "number", cardNumber: "7", cardColour: "orange"}
        ]
        testPlayer2.hand=[
            {cardType: "number", cardNumber: "6", cardColour: "orange"}
        ]

        const actualOutput= hasAnyoneWon(totalPlayers)
        const expectedOutput= false

        expect(actualOutput).toBe(expectedOutput)
    })
    test("hasAnyone function returns true if anyone's hasWon() is true",()=>{
        testPlayer1= new Player("Test Player 1")
        testPlayer2= new Player("Test Player 2")
        const totalPlayers=[testPlayer1, testPlayer2]

        testPlayer2.hand=[
            {cardType: "number", cardNumber: "6", cardColour: "orange"}
        ]

        const actualOutput= hasAnyoneWon(totalPlayers)
        const expectedOutput= true

        expect(actualOutput).toBe(expectedOutput)
    })
})
/* 
click on join game button
this will cause you to create a new instance of player class
this will be appended into the totalPlayers array.
The new instance of player class will depend on the length of totalPlayers
*/