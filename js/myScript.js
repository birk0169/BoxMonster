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

function reset(){
    //console.log("test");

    boxLocationX = 3;
    boxLocationY = 3;

    updateBoxLocation();

    turnCount = 0;
    playerScore = 0;
    scoreCounter.innerHTML = playerScore;

    document.getElementById("turn-count").innerHTML = turnCount;

    skullOne.classList.remove(skullLocationClass);
    skullLocationClass = "hidden";
    skullOne.classList.add(skullLocationClass);

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
    
    // skullGrow();

    if(turnCount == 5){
        spawnSkull();
        // skullOne.classList.remove(skullOneActive);
        // skullOneActive = "active";
        // skullOne.classList.add(skullOneActive);

        // spawnSkull();
        //testVar(skullOneLocationClass);
    } 
    if(turnCount == 10){
        // skullTwo.classList.remove(skullTwoState);
        // skullTwoState = "active";
        // skullTwo.classList.add(skullTwoState);
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
}

function skullToSpawn(skullX, skullY, skull, location){
    while(true){
        skullX = Math.floor(Math.random() * 5) + 1;
        skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX != appleX && skullY != appleY){
            
            skull.classList.remove(location);
            var locationClass = ("item-" + skullX + "-" + skullY);
            //Change location Class
            if(location == skullOneLocationClass){
                skullOneLocationClass = locationClass;
            } else if(location == skullTwoLocationClass){
                skullTwoLocationClass = locationClass;
            } else if(location == skullThreeLocationClass){
                skullThreeLocationClass = locationClass;
            }

            console.log(locationClass);
            console.log(skullOneLocationClass);;

            
            skull.classList.add(locationClass);
            break;
        }
    }
}

function skullGrow(){
    var skulls = document.querySelectorAll(".skull");
    
    skulls.forEach(skull => {
        if(skullOne.classList == null){
            
        } else if(hasClass(skull, "state-0")){

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
    console.log("test");
    if((boxLocationX == skullX && boxLocationY == skullY) && hasClass(skull, "skull-3")){
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


//SkullGrow alt
function skullGrow(skull){
    var skulls = document.querySelectorAll(".skull");
    skullStateChange(skull, 1)
    skull.classList.remove
}

function skullStateChange(skull, state){
    if(skull == skullOne){
        skull.classList.remove(skull);
        skullOneState = state;
    } else if(skull == skullTwo){
        skullTwoState = state;
    } else if(skull == skullThree){
        skullThreeState = state;
    }
}