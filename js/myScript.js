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
var currentLocationClass = "item-3-3";

//APPLE
////Cordinates of the apple
var appleX = 1;
var appleY = 1;

var apple = document.querySelector(".apple");

//Current location class of the apple
var appleLocationClass = "hidden";

//SKULL
//cordincates of the skull
var skullOneX = 0;
var skullOneY = 0;

var skullTwoX = 0;
var skullTwoY = 0;

var skullThreeX = 0;
var skullThreeY = 0;

var skullOne = document.querySelector(".skull-one");
var skullTwo = document.querySelector(".skull-two");
var skullThree = document.querySelector(".skull-three");

//Skull states
var skullOneState = "0";
var skullTwoState = "0";
var skullThreeState = "0";

//Current location of the skull
var skullOneLocationClass = "hidden";
var skullTwoLocationClass = "hidden";
var skullThreeLocationClass = "hidden";

//objects
//Objects
function Hazard(hazardElement, xAxis, yAxis, hazardClass, state){
    this.hazardElement = hazardElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.hazardClass = hazardClass;
    this.state = state;
}

var skullOne2 = new Hazard(document.querySelector(".skull-one"), 0, 0, "hidden", 0);
var skullTwo2 = new Hazard(document.querySelector(".skull-two"), 0, 0, "hidden", 0);
var skullThree2 = new Hazard(document.querySelector(".skull-three"), 0, 0, "hidden", 0);

//Wait
var wait = 250;

//document.getElementById("reset-button").onclick = reset();
document.onkeydown = checkKey;

//Spawn the first apple
spawnApple();

function checkKey(e){
    e = e || window.event;
    if(e.keyCode == '39'){
        //left arrow
        moveBoxRight();
    }
    else if(e.keyCode == '38'){
        //Up arrow
        moveBoxUp();
    }
    else if(e.keyCode == '40'){
        //down arrow
        moveBoxDown();
    }
    else if(e.keyCode == '37'){
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
        jumpToggle();
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

            jumpToggle();
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

    boxLocationX = 3;
    boxLocationY = 3;

    updateBoxLocation();

    turnCount = 0;
    playerScore = 0;
    scoreCounter.innerHTML = playerScore;

    skullReset();

    //document.getElementById("turn-count").innerHTML = turnCount;

    // skullOne.classList.remove(skullLocationClass);
    // skullLocationClass = "hidden";
    // skullOne.classList.add(skullLocationClass);

    spawnApple();
}

//Update the boxes current location after it moves
function updateBoxLocation(){
    boxMonster.classList.remove(currentLocationClass);
    currentLocationClass = "item-" + (boxLocationX) + "-" + boxLocationY;
    boxMonster.classList.add(currentLocationClass);
}

//UPDATE
//Updates the turn count
function updateTurn(){
    turnCount++;
    //document.getElementById("turn-count").innerHTML = turnCount;
    
    skullGrow(skullOne, skullOneState);
    skullGrow(skullTwo, skullTwoState);
    skullGrow(skullThree, skullThreeState);
    if(turnCount == 5){
        skullStateChange(skullOne, 1);
        skullSpawn(skullOne);
    } 
    if(turnCount == 11){
       skullStateChange(skullTwo, 1);
        skullSpawn(skullTwo);
    }
    if(turnCount == 17){
        skullStateChange(skullThree, 1);
         skullSpawn(skullThree);
     }
    // if(turnCount == 15){
    //     skullStateChange(skullThree, 1);
    //     spawnSkull(3);
    // } 
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
    boxMonster.classList.toggle("box-base");
    boxMonster.classList.toggle("box-jump");
}

//Check Monster
function monsterCheck(){
    checkForApple();
    //Game over by skulls
    gameOver(skullOneX, skullOneY, skullOneState);
    gameOver(skullTwoX, skullTwoY, skullTwoState);
    gameOver(skullThreeX, skullThreeY, skullThreeState);
    
}

//Apples logic
//Spawn apple
function spawnApple(){
    while(true){
        appleX = Math.floor(Math.random() * 5) + 1;
        appleY = Math.floor(Math.random() * 5) + 1;
        if((appleX != boxLocationX && appleY != boxLocationY) && !skullsAtLocation(appleX, appleY)){
            apple.classList.remove(appleLocationClass);
            appleLocationClass = "item-" + appleX + "-" + appleY;
            apple.classList.add(appleLocationClass);
            break;
        }
    }
    
}

//Check for apple
function checkForApple(){
    if(appleX == boxLocationX && appleY == boxLocationY){
        playerScore += 50;
        scoreCounter.innerHTML = playerScore;
        spawnApple();
        
    }
}

//Sound for apple

//Skull logic
function skullSpawn(skull){
    if(skull == skullOne){
        skullToSpawn(skullOneX, skullOneY, skullOne, skullOneLocationClass);
    } else if(skull == skullTwo){
        skullToSpawn(skullTwoX, skullTwoY, skullTwo, skullTwoLocationClass);
    } else if(skull == skullThree){
        skullToSpawn(skullThreeX, skullThreeY, skullThree, skullThreeLocationClass);
    }
}

function skullToSpawn(skullX, skullY, skull, location){
    while(true){
        skullX = Math.floor(Math.random() * 5) + 1;
        skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX != appleX && skullY != appleY){
            
            
            var locationClass = ("item-" + skullX + "-" + skullY);
            var newClass = "state-1 " + locationClass + " skull";
            //Change location Class
            if(location == skullOneLocationClass){
                skullOneLocationClass = locationClass;
                newClass = "skull-one " + newClass;
                skullOneY = skullY;
                skullOneX = skullX;
            } else if(location == skullTwoLocationClass){
                skullTwoLocationClass = locationClass;
                newClass = "skull-two " + newClass;
                skullTwoY = skullY;
                skullTwoX = skullX;
            } else if(location == skullThreeLocationClass){
                skullThreeLocationClass = locationClass;
                newClass = "skull-three " + newClass;
                skullThreeY = skullY;
                skullThreeX = skullX;
            }

            skull.classList = newClass;
            break;
        }
    }
}

//SkullGrow alt
function skullGrow(skull, state){
    if(state == 1){
        skullStateChange(skull, 2);
    } else if(state == 2){
        skullStateChange(skull, 3);
    } else if(state == 3){
        skullStateChange(skull, 1);
        skullSpawn(skull);

    }
}

//Change the state of an input skull
function skullStateChange(skull, state){
    if(skull == skullOne){
        skull.classList.remove("state-" + skullOneState);
        skullOneState = state;
        skull.classList.add("state-" + skullOneState);
    } else if(skull == skullTwo){
        skull.classList.remove("state-" + skullTwoState);
        skullTwoState = state;
        skull.classList.add("state-" + skullTwoState);
    } else if(skull == skullThree){
        skull.classList.remove("state-" + skullThreeState);
        skullThreeState = state;
        skull.classList.add("state-" + skullThreeState);
    }
}

//Check for skulls
function skullsAtLocation(xCordinate, yCordinate){
    if(skullOneX == xCordinate && skullOneY == yCordinate){
        return true;
    } else if(skullTwoX == xCordinate && skullTwoY == yCordinate){
        return true;
    } else if(skullThreeX == xCordinate && skullThreeY == yCordinate){
        return true;
    } else{
        return false;
    }
}

function gameOver(skullX, skullY, state){
    if((boxLocationX == skullX && boxLocationY == skullY) && state == 3){
        console.log("Game over");
        reset();
    }
}

//Test
function testVar(svend){
    skullOneX = 2;
    skullOneY = 2;
    console.log(svend);
    skullOne.classList.remove(svend);
    if(svend == skullOneLocationClass){
        svend = ("item-" + skullOneX + "-" + skullOneY);
        skullOneLocationClass = svend;
    } else if(svend == skullTwoLocationClass){
        svend = ("item-" + skullOneX + "-" + skullOneY);
        skullTwoLocationClass = svend;
    } else if(svend == skullThreeLocationClass){
        svend = ("item-" + skullOneX + "-" + skullOneY);
        skullThreeLocationClass = svend;
    }
    
    skullOne.classList.add(svend);
    console.log(svend);

}

//Base functions
//Test to see if element contains specific class
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function skullReset(){
    
    //Skull one location reset
    skullOneX = 0;
    skullOneY = 0;

    console.log("SkullOne " + skullOneLocationClass);

    // skullOne.classList.remove(skullOneLocationClass);
    skullOneLocationClass = "hidden";
    skullOne.classList = "state-0 skull-one skull hidden";
    // skullOne.classList.remove(skullOneLocationClass);

    //Skull two location reset
    skullTwoX = 0;
    skullTwoY = 0;


    console.log("SkullTwo " + skullTwoLocationClass);

    // skullTwo.classList.remove(skullTwoLocationClass);
    skullTwoLocationClass = "hidden";
    skullTwo.classList = "state-0 skull-two skull hidden";
    // skullTwo.classList.remove(skullTwoLocationClass);

    //Skull three location reset
    skullThreeX = 0;
    skullThreeY = 0;

    console.log("SkullThree " + skullThreeLocationClass);

    // skullThree.classList.remove(skullThreeLocationClass);
    skullThreeLocationClass = "hidden";
    skullThree.classList = "state-0 skull-three skull hidden";
    // skullThree.classList.remove(skullThreeLocationClass);


    skullStateChange(skullOne, 0);
    skullStateChange(skullTwo, 0);
    skullStateChange(skullThree, 0);
}

