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

//SKULL
var skull = document.querySelector("skull");

//Current location class of the apple
var appleLocationClass = "hidden";

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
    
}

//Apples logic
//Spawn apple
function spawnApple(){
    while(true){
        appleX = Math.floor(Math.random() * 5) + 1;
        appleY = Math.floor(Math.random() * 5) + 1;
        if(appleX != boxLocationX && appleY != boxLocationY){
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
function skullGrowth(){


    skull = document.querySelector(".skull");
    
    if(skull.classList == null){

    } else if(hasClass(skull, "skull-1")){
        skull.classList.remove("skull-1");
        skull.classList.add("skull-2");
    } else if(hasClass(skull, "skull-2")){
        skull.classList.remove("skull-2");
        skull.classList.add("skull-3");
    } else if(hasClass(skull, "skull-3")){
        skull.classList.remove("skull-3");
        skull.classList.add("skull-1");
    }

    // skull_1.classList.replace("skull-1", "skull-2");
    // skull_2.classList.replace("skull-2", "skull-3");
    // skull_3.classList.replace("skull-3", "skull-1");
    
}

//Base functions
//Test to see if element contains specific class
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}