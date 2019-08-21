//VARIABLES
//Timechecker
var lastTime = new Date();

//JumpQueue
var jumpQueue = false;
var nextJump = "...";

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
function Fruit(fruitElement, xAxis, yAxis, points){
    this.fruitElement = fruitElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.points = points;
}

var apple = new Fruit( document.querySelector(".apple"), 1, 1, 50);

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
var skullSeven = new Hazard(document.querySelector(".skull-seven"), 0, 0, 0, "skull-seven");
var skullEight = new Hazard(document.querySelector(".skull-eight"), 0, 0, 0, "skull-eight");
var skullNine = new Hazard(document.querySelector(".skull-nine"), 0, 0, 0, "skull-nine");
var skullTen = new Hazard(document.querySelector(".skull-ten"), 0, 0, 0, "skull-ten");


var skulls = [skullOne, skullTwo, skullThree, skullFour, skullFive, skullSix, skullSeven, skullEight, skullNine, skullTen];

//Wait
var wait = 250;

//Test Sound
var snd1 = new Audio();
var src1 = document.createElement("source");
src1.type = "audio/mpeg";
src1.src = "sounds/jump.mp3";
snd1.appendChild(src1);

var snd2 = new Audio();
var src2 = document.createElement("source");
src2.type = "audio/mpeg";
src2.src = "sounds/bite.mp3";
snd2.appendChild(src2);


//FUNCTIONS
//Sounds
function playJump(){
    snd1.pause();
    snd1.currentTime = 0;
    snd1.play();
}

function playMunch(){
    snd2.pause();
    snd2.currentTime = 0.15;
    snd2.play();
    
}


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
    else if(e.keyCode == '32'){
        //Right arrow
        //preload();

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
        // nextJump = direction;
        // jumpQueue = true;
        // console.log(jumpQueue);

    } else if(((direction == "left" && boxLocationX != 1) || (direction == "right" && boxLocationX != 5)) || ((direction == "up" && boxLocationY != 1) || (direction == "down" && boxLocationY != 5))){
        // jumpToggle();
        
        //Jump Sound
        playJump()
        
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
    // if(jumpQueue){
    //     console.log('test');
    //     jumpQueue = false;
    //     movement(nextJump);
    // }

}

//Resets the Game
function reset(){

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

    //Reset Apple Points
    apple.points = 50;

    turnCount = 0;
    playerScore = 0;
    scoreCounter.innerHTML = playerScore;

    skullReset();

    document.getElementById("skulls").innerHTML = '';


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

    //Increase points for apple
    if(turnCount % 5 == 0){
        apple.points += 5;
    }

    skullGrow();

    newSkull();
     
}



function newSkull(){
    if((turnCount == nextSkull) && (currentSkull != 10)){
        var turnTilNextSkull = 5;
        if(turnCount > 45){
            turnTilNextSkull = 15;
        } else if(turnCount > 15){
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
        apple.xAxis = Math.floor(Math.random() * 5) + 1;
        apple.yAxis = Math.floor(Math.random() * 5) + 1;
        if((apple.xAxis != boxLocationX && apple.yAxis != boxLocationY) && !skullsAtLocation(apple.xAxis, apple.yAxis)){
            // appleLocationClass = "item-" + appleX + "-" + appleY;
            apple.fruitElement.classList = "apple item-" + apple.xAxis + "-" + apple.yAxis;
            break;
        }
    }
    
}

//Check for apple
function checkForApple(){
    if(apple.xAxis == boxLocationX && apple.yAxis == boxLocationY){

        playMunch();
        playerScore += apple.points;
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
        if(skullX!= apple.xAxis && skullY != apple.yAxis){
            
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
        if(skullX!= apple.xAxis && skullY != apple.yAxis){
            
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

