//Timechecker
var lastTime = new Date();

//Turn count
var turnCount = 0;

//Size of play area
var maxX = 5;
var maxY = 5;

//Player Score
var playerScore = 0;
var scoreCounter = document.querySelector(".score");

//BOX MONSTER
////Cordinates of the box monster
var boxLocationX = 3;
var boxLocationY = 3;

var boxMonster = document.querySelector(".box");

////Current location class of the box monster
// var currentLocationClass = "item-3-3";

//APPLE
////Cordinates of the apple
var appleX = 1;
var appleY = 1;

var apple = document.querySelector(".apple");

//SKULL
var nextSkull = 5;
var currentSkull = 0;

//Objects
function Hazard(hazardElement, xAxis, yAxis, state, hazardClass){
    this.hazardElement = hazardElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.state = state;
    this.hazardClass = hazardClass;

    //Object methods
    // this.updateX = function(newX) {
    //     xAxis = newX
    // };

    // this.updateY = function(newY){
    //     yAxis = newY
    // };

    // this.updateState = function(newState) {
    //     state = newState
    // };
}


var skullOne = new Hazard(document.querySelector(".skull-one"), 0, 0, 0, "skull-one");
var skullTwo = new Hazard(document.querySelector(".skull-two"), 0, 0, 0, "skull-two");
var skullThree = new Hazard(document.querySelector(".skull-three"), 0, 0, 0, "skull-three");
var skullFour = new Hazard(document.querySelector(".skull-four"), 0, 0, 0, "skull-four");
var skullFive = new Hazard(document.querySelector(".skull-five"), 0, 0, 0, "skull-five");
var skullSix = new Hazard(document.querySelector(".skull-six"), 0, 0, 0, "skull-six");

var skulls = [skullOne, skullTwo, skullThree, skullFour, skullFive, skullSix];

//Wait
var wait = 250;

//document.getElementById("reset-button").onclick = reset();
document.onkeydown = checkKey;

//Spawn the first apple
spawnApple();

function checkKey(e){
    e = e || window.event;
    if((e.keyCode == '39') || (e.keyCode == '68')){
        //left arrow
        moveBoxRight();
    }
    else if((e.keyCode == '38') || (e.keyCode == '87')){
        //Up arrow
        moveBoxUp();
    }
    else if((e.keyCode == '40') || (e.keyCode == '83')){
        //down arrow
        moveBoxDown();
    }
    else if((e.keyCode == '37') || (e.keyCode == '65')){
        //Right arrow
        moveBoxLeft();

    }
}

//Right
function moveBoxRight(){
    movement("right");
}

//Up
function moveBoxUp(){
    movement("up");
    
}

//Down
function moveBoxDown(){
    movement("down");
}

//Left
function moveBoxLeft(){
    movement("left");
}

//Movement
function movement(direction){
    if(Math.floor((new Date() - lastTime) < wait)){
        // console.log("test");
    } else if(((direction == "left" && boxLocationX != 1) || (direction == "right" && boxLocationX != 5)) || ((direction == "up" && boxLocationY != 1) || (direction == "down" && boxLocationY != 5))){
        // jumpToggle();
        boxMonster.classList.add("box-jump");
        //Updates the turn
        updateTurn();

        //Change character location
        if(direction == "left"){
            boxLocationX = boxLocationX - 1;
        } else if(direction == "up"){
            boxLocationY = boxLocationY - 1;
        } else if(direction == "down"){
            boxLocationY = boxLocationY + 1;
        } else{
            boxLocationX = boxLocationX + 1;
        }
        
        boxMonster.classList.add("box-animation-" + direction);
        setTimeout(function(){
            
            updateBoxLocation();
            monsterCheck();
            boxMonster.classList.remove("box-animation-" + direction);

            monsterCheck();
        }, wait);
        lastTime = new Date();
        
    } else{
        switchCollision("box-collision-" + direction);
        lastTime = new Date();
    }

}

//Resets the Game
function reset(){
    //console.log("test");

    //Log score
    if(playerScore > 0){
        console.log("Game Over - Score: " + playerScore);
    }

    //Reset player location
    boxLocationX = 3;
    boxLocationY = 3;

    updateBoxLocation();

    //Reset game variables
    currentSkull = 0;
    nextSkull = 5;

    turnCount = 0;
    playerScore = 0;
    scoreCounter.innerHTML = playerScore;

    skullReset();

    //document.getElementById("turn-count").innerHTML = turnCount;

    // skullOne.classList.remove(skullLocationClass);
    // skullLocationClass = "hidden";
    // skullOne.classList.add(skullLocationClass);

    //Spawn new apple
    spawnApple();

}

//Update the boxes current location after it moves
function updateBoxLocation(){
    // boxMonster.classList.remove(currentLocationClass);
    // currentLocationClass = "item-" + (boxLocationX) + "-" + boxLocationY;
    boxMonster.classList = "box box-base item-" + (boxLocationX) + "-" + boxLocationY;

    // boxMonster.classList.add(currentLocationClass);
}

//UPDATE
//Updates the turn count
function updateTurn(){
    turnCount++;

    skullGrow();

    newSkull();
     
}



function newSkull(){
    if((turnCount == nextSkull) && (currentSkull != 6)){
        var turnTilNextSkull = 5;
        if(turnCount > 15){
            turnTilNextSkull = 10;
        }
        nextSkull = nextSkull + turnTilNextSkull;
    
        skulls[currentSkull].state = 1;
        skullSpawn(skulls[currentSkull]);
    
        currentSkull++;
    }
}

//Switch Collision Class
function switchCollision(collisionClass){
    boxMonster.classList.add(collisionClass);
        setTimeout(function(){
            boxMonster.classList.remove(collisionClass);
    }, wait);

}

//Jump toggle
function jumpToggle(){
    boxMonster.classList.add("box-jump");
}

//Check Monster
function monsterCheck(){
    //Point apple
    checkForApple();
    //Game over by skulls
    gameOverCheck();
    
}

//Apples logic
//Spawn apple
function spawnApple(){
    while(true){
        appleX = Math.floor(Math.random() * 5) + 1;
        appleY = Math.floor(Math.random() * 5) + 1;
        if((appleX != boxLocationX && appleY != boxLocationY) && !skullsAtLocation(appleX, appleY)){
            // appleLocationClass = "item-" + appleX + "-" + appleY;
            apple.classList = "apple item-" + appleX + "-" + appleY;
            break;
        }
    }
    
}

//Check for apple
function checkForApple(){
    if(appleX == boxLocationX && appleY == boxLocationY){
        var pointsForApple = 50;
        if(turnCount > 30){
            pointsForApple = 150;
        } else if(turnCount > 15){
            pointsForApple = 100;
        }
        playerScore += pointsForApple;
        scoreCounter.innerHTML = playerScore;
        spawnApple();
        
    }
}

//Sound for apple

//Skull logic
function skullSpawn(skull){
    //skullToSpawn(skull);

    while(true){
        
        var skullX = Math.floor(Math.random() * 5) + 1;
        var skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX!= appleX && skullY != appleY){
            
            var locationClass = ("item-" + skullX + "-" + skullY);
            var newClass = skull.hazardClass + " state-1 " + locationClass + " skull";
            skull.xAxis = skullX;
            skull.yAxis = skullY;

            skull.hazardElement.classList = newClass;
            break;
        }
    }

}

function skullToSpawn(skull){
    //var breakPoint = 0;
    while(true){
        //console.log('breakPoint:', breakPoint)
        
        // breakPoint++;
        var skullX = Math.floor(Math.random() * 5) + 1;
        var skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX!= appleX && skullY != appleY){
            
            var locationClass = ("item-" + skullX + "-" + skullY);
            var newClass = skull.hazardClass + " state-1 " + locationClass + " skull";
            skull.xAxis = skullX;
            skull.yAxis = skullY;

            skull.hazardElement.classList = newClass;
            break;
        }
        // if(breakPoint > 6){
        //     console.log("emergancy break point");
        //     break;
        // }
    }
    // console.log(skull);
}

//SkullGrow alt
// function skullGrow(skull, state){
//     if(state == 1){
//         skullStateChange(skull, 2);
//     } else if(state == 2){
//         skullStateChange(skull, 3);
//     } else if(state == 3){
//         skullStateChange(skull, 1);
//         skullSpawn(skull);

//     }
// }

//SkullGrow OOP
function skullGrow(){
    skulls.forEach(skull =>{
        if(skull.state == 1){
            skullStateChange(skull, 2);
        } else if(skull.state == 2){
            skullStateChange(skull, 3);
        } else if(skull.state == 3){
            skullStateChange(skull, 1);
            try{
                skullSpawn(skull);
            } catch(err){
                console.log(err);
            }
        }
    });
    
}

//Change the state of an input skull
// function skullStateChange(skull, state){
//     if(skull == skullOne){
//         skull.classList.remove("state-" + skullOneState);
//         skullOneState = state;
//         skull.classList.add("state-" + skullOneState);
//     } else if(skull == skullTwo){
//         skull.classList.remove("state-" + skullTwoState);
//         skullTwoState = state;
//         skull.classList.add("state-" + skullTwoState);
//     } else if(skull == skullThree){
//         skull.classList.remove("state-" + skullThreeState);
//         skullThreeState = state;
//         skull.classList.add("state-" + skullThreeState);
//     }
// }

//OOP change skull state
function skullStateChange(skull, state){
    // skull.classList.remove("state-" + skull.state);
    skull.state = state;
    // skull.classList.add("state-" + skull.state);
    skull.hazardElement.classList = skull.hazardClass + " item-" + skull.xAxis + "-" + skull.yAxis + " state-" + skull.state;
}

//Check for skulls
function skullsAtLocation(xCordinate, yCordinate){
    var skullAtLocation = false;
    skulls.forEach(skull =>{
        if((skull.xAxis == xCordinate) && (skull.yAxis == yCordinate)){
            skullAtLocation = true;
        }
    });
    return skullAtLocation;
}

function gameOverCheck(){
    var gameOver = false;
    skulls.forEach(skull =>{
        if((boxLocationX == skull.xAxis && boxLocationY == skull.yAxis) && skull.state == 3){
            gameOver = true;
        }
    });
    if(gameOver){
        reset();
    }
}

//Test
// function testVar(svend){
//     skullOneX = 2;
//     skullOneY = 2;
//     console.log(svend);
//     skullOne.classList.remove(svend);
//     if(svend == skullOneLocationClass){
//         svend = ("item-" + skullOneX + "-" + skullOneY);
//         skullOneLocationClass = svend;
//     } else if(svend == skullTwoLocationClass){
//         svend = ("item-" + skullOneX + "-" + skullOneY);
//         skullTwoLocationClass = svend;
//     } else if(svend == skullThreeLocationClass){
//         svend = ("item-" + skullOneX + "-" + skullOneY);
//         skullThreeLocationClass = svend;
//     }
    
//     skullOne.classList.add(svend);
//     console.log(svend);

// }

//Base functions
//Test to see if element contains specific class
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function skullReset(){
    
    skulls.forEach(skull => {
        skull.xAxis = 0;
        skull.yAxis = 0;

        skull.state = 0;

        skull.hazardElement.classList = skull.state + " " + skull.hazardClass + " skull";
    });
}

