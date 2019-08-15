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

//Current location of the skull
var skullOneLocationClass = "hidden";
var skullTwoLocationClass = "hidden";
var skullThreeLocationClass = "hidden";

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
        moveBoxLeft();
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
        moveBoxRight();

    }
}

//Left
function moveBoxLeft(){
    if(Math.floor((new Date() - lastTime) < wait)){
        // console.log("test");
    } else if(boxLocationX != maxX){
        jumpToggle();
        //Updates the turn
        updateTurn();
        //Change box location X
        boxLocationX = boxLocationX + 1;

        boxMonster.classList.add("box-animation-right");
        setTimeout(function(){
        updateBoxLocation();
        boxMonster.classList.remove("box-animation-right");

        jumpToggle();
        monsterCheck();
        }, wait);
        lastTime = new Date();
        
    } else{
        switchCollision("box-collision-right");
        lastTime = new Date();
    }

    
    
}

//Up
function moveBoxUp(){
    
    if(Math.floor((new Date() - lastTime) < wait)){
        // console.log("test");
    } else if(boxLocationY != 1){
        jumpToggle();
        //Updates the turn
        updateTurn();
        //Change box location Y
        boxLocationY = boxLocationY - 1;

        boxMonster.classList.add("box-animation-up");
        setTimeout(function(){
        updateBoxLocation();
        boxMonster.classList.remove("box-animation-up");

        jumpToggle();
        monsterCheck();
        }, wait);
        lastTime = new Date();
        
    } else{
        switchCollision("box-collision-up");
        lastTime = new Date();
    }
    
}

//Down
function moveBoxDown(){

    if(Math.floor((new Date() - lastTime) < wait)){
        // console.log("test");
    } else if(boxLocationY != maxY){
        jumpToggle();
        //Updates the turn
        updateTurn();
        //Change box location Y
        boxLocationY = boxLocationY + 1;

        boxMonster.classList.add("box-animation-down");
        setTimeout(function(){
        updateBoxLocation();
        boxMonster.classList.remove("box-animation-down");

        jumpToggle();
        monsterCheck();
        }, wait);
        lastTime = new Date();
        
    } else{
        switchCollision("box-collision-down");
        lastTime = new Date();
    }
    
}

//Right
function moveBoxRight(){
    
    if(Math.floor((new Date() - lastTime) < wait)){
        // console.log("test");
    } else if(boxLocationX != 1){
        jumpToggle();
        //Updates the turn
        updateTurn();
        //Change box location X
        boxLocationX = boxLocationX - 1;

        boxMonster.classList.add("box-animation-left");
        setTimeout(function(){
            updateBoxLocation();
            // theBox.classList.remove(currentLocationClass);
            // currentLocationClass = "item-" + (boxLocationX) + "-" + boxLocationY;
            // theBox.classList.add(currentLocationClass);
            boxMonster.classList.remove("box-animation-left");

            jumpToggle();
            monsterCheck()
        }, wait);
        lastTime = new Date();
        
    } else{
        switchCollision("box-collision-left");
        lastTime = new Date();
    }
    

}

//Movement
function movement(movementAnimation, direction, movementModifier){
    jumpToggle();
    //Updates the turn
    updateTurn();
    //Change box location X
    direction = direction + movementModifier;

    boxMonster.classList.add(movementAnimation);
    setTimeout(function(){
        updateBoxLocation();
        boxMonster.classList.remove(movementAnimation);

        jumpToggle();
        monsterCheck()
    }, wait);
        lastTime = new Date();

}

function reset(){
    //console.log("test");

    boxLocationX = 3;
    boxLocationY = 3;

    updateBoxLocation();

    turnCount = 0;
    playerScore = 0;
    scoreCounter.innerHTML = playerScore;

    document.getElementById("turn-count").innerHTML = turnCount;

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

//Updates the turn count
function updateTurn(){
    turnCount++;
    document.getElementById("turn-count").innerHTML = turnCount;
    // spawnSkull();
    if(turnCount > 4){
        // spawnSkull();
        testVar(skullOneLocationClass);
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
    boxMonster.classList.toggle("box-base");
    boxMonster.classList.toggle("box-jump");
}

//Check Monster
function monsterCheck(){
    checkForApple();
    
    skullGrowth();

    //Game over by skulls
    gameOver(skullOneX, skullOneY, skullOne);
    gameOver(skullTwoX, skullTwo, skullTwo);
    gameOver(skullThreeX, skullThreeY, skullThree);
    // if((boxLocationX == skullOneX && boxLocationY == skullOneY) && hasClass(skullOne, "skull-3")){
    //     reset();
    // }
    
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
function spawnSkull(){
    skullToSpawn(skullOneX, skullOneY, skullOne, skullOneLocationClass);
    // while(true){
    //     skullOneX = Math.floor(Math.random() * 5) + 1;
    //     skullOneY = Math.floor(Math.random() * 5) + 1;
    //     if(skullOneX != appleX && skullOneY != appleY){
    //         skullOne.classList.remove(skullOneLocationClass);
    //         skullOneLocationClass = "item-" + skullOneX + "-" + skullOneY;
    //         skullOne.classList.add(skullOneLocationClass);
    //         break;
    //     }
    // }
}

function skullToSpawn(skullX, skullY, skull, locationClass){
    while(true){
        skullX = Math.floor(Math.random() * 5) + 1;
        skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX != appleX && skullY != appleY){
            skull.classList.remove(locationClass);

            console.log(locationClass);
            console.log(skullOneLocationClass);;

            var locationClass = ("item-" + skullX + "-" + skullY);
            skull.classList.add(locationClass);
            break;
        }
    }
}

function skullGrowth(){


    skulls = document.querySelectorAll(".skull");
    
    skulls.forEach(skull => {
        if(skullOne.classList == null){

        } else if(hasClass(skull, "skull-1")){
            skull.classList.remove("skull-1");
            skull.classList.add("skull-2");
        } else if(hasClass(skull, "skull-2")){
            skull.classList.remove("skull-2");
            skull.classList.add("skull-3");
        } else if(hasClass(skull, "skull-3")){
            skull.classList.remove("skull-3");
            skull.classList.add("skull-1");
            spawnSkull();
        }
    });
    

    
}

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

function gameOver(skullX, skullY, skull){
    if((boxLocationX == skullX && boxLocationY == skullY) && hasClass(skull, "skull-3")){
        reset();
    }
}

function testVar(svend){
    skullOneX = 2;
    skullOneY = 2;
    console.log(svend);
    skullOne.classList.remove(svend);
    svend = ("item-" + skullOneX + "-" + skullOneY);
    skullOne.classList.add(svend);
    console.log(svend);

}

//Base functions
//Test to see if element contains specific class
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}