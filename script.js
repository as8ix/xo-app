
let gridItems = document.getElementsByClassName('square')
let currentTurn = "X"
let gameIsFinished =  false;

let boardArray = [
    "0","1","2",
    "3","4","5",
    "6","7","8"
];

    for (const item of gridItems){
        item.addEventListener("click",function () 
        {

            if(gameIsFinished)
            {
                return
            }

            let value = item.getAttribute("value")
            let index = value -1
            if(boardArray[index] == "X" || boardArray[index] == "O"){
                document.getElementById("instructions").innerText = "already played here!"
                return 
            }

            let squareContent = document.querySelector(`.square[value="${value}"]`)
            squareContent.innerHTML = currentTurn
            
            boardArray[index] = currentTurn

            evaluteBoard()
            
            if(currentTurn == "X"){
                currentTurn ="O"
            }else{
                currentTurn ="X"
            }
            document.getElementById("instructions").textContent = `${currentTurn} turn now`


            function evaluteBoard(){
                if(
                    //rows
                    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
                    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
                    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||

                    //coloums
                    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
                    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
                    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||

                    //diagonal
                    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) ||
                    (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2])
                ){
                    var winner = currentTurn == "O" ? "O" : "X";
                    gameIsFinished = true
                    document.getElementById("instruction").innerHTML = `<p>${winner} has won! <span>Click reset to <br> restart the game!</span></p>`
                    setTimeout(() => {
                        document.getElementById("instruction").innerHTML = " "
                    }, 3000);
                    return
                }
                
                var isDraw = true
                for (square of boardArray){
                    if(square != "X" && square != "O")
                    {
                        isDraw = false
                        break
                    }
                }
                
                if(isDraw){
                    gameIsFinished = true
                    document.getElementById("instruction").innerHTML = "<p>It seems to be a draw. <span>Click reset to restart the game!</span></p>"
                    setTimeout(() => {
                        document.getElementById("instruction").innerHTML = " "
                    }, 3000);
                }
            }
        })
    }
    document.getElementById("reset-btn").addEventListener("click", function(){
    reset()
})

function reset() {

    gameIsFinished = false
    currentTurn = "X"
    document.getElementById("instructions").innerText = "START !"
    // reset visual part
    for(item of gridItems)
    {
        let value = item.getAttribute("value")
        let squareContent = document.querySelector(`.square[value="${value}"]`)
        squareContent.innerHTML = `<h3 class="square-content">
                        
        </h3>`
    }
    // reset logical part 
     boardArray = [
        "0","1","2",
        "3","4","5",
        "6","7","8"
    ];
}
