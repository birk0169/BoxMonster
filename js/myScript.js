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
function Character(characterElement, xAxis, yAxis){
    this.characterElement = characterElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
}

var monster;

//APPLE
function Fruit(fruitElement, xAxis, yAxis, points){
    this.fruitElement = fruitElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.points = points;
}

var apple;

//SKULL
var skullContainer = document.getElementById("skull-container");

var maxSkulls = 20;

var nextSkull = 5;
var currentSkull = 0;

//Objects
function Hazard(hazardElement, xAxis, yAxis, state){
    this.hazardElement = hazardElement;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.state = state;
    // this.hazardClass = hazardClass;
}


// var skulls = [skullOne, skullTwo, skullThree, skullFour, skullFive, skullSix, skullSeven, skullEight, skullNine, skullTen];
var skulls = [];

//Wait
var wait = 250;

//Sound
var soundOn = true;

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

//EVENT LISTENERS
//Keydown
document.onkeydown = checkKey;

//Click
document.getElementById("sound").addEventListener("click", muteToggle);

//FUNCTIONS
//Start the game
gameStart();

//Game Start
function gameStart(){
    //Add player
    let playerContainer = document.getElementById("player-container");

    let playerElement = document.createElement('div');
    playerElement.classList = "mx-3 my-3";

    

    playerContainer.append(playerElement);
    monster = new Character(playerElement, 3, 3);

    //Add apple
    let appleContainer = document.getElementById("apple-container");

    let appleElement = document.createElement('div');

    appleContainer.append(appleElement);
    apple = new Fruit(appleElement, 1, 1, 50);


    spawnApple();
}




//Sounds
//Mute
function muteToggle(){
    let soundButton = document.getElementById("sound");
    soundButton.classList.toggle("fa-volume-mute");
    soundButton.classList.toggle("fa-volume-up");
    if(soundOn){
        soundOn = false;
    } else{
        soundOn = true;
    }
}

//play sounds
// function sound(src) {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function () {
//         this.sound.play();

//     }
//     this.stop = function () {
//         this.sound.pause();
//     }
// }

function playJump(){
    if(soundOn){
        snd1.pause();
        snd1.currentTime = 0;
        snd1.play();
    }
    
    // snd1.pause();
    // snd1.currentTime = 0;
    // snd1.play();
}

function playMunch(){
    if(soundOn){
        snd2.pause();
        snd2.currentTime = 0.15;
        snd2.play();
    }

    // snd2.pause();
    // snd2.currentTime = 0.15;
    // snd2.play();
    
}

//Check keys
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
        muteToggle();
        test();

    }
}

function test(){
    let node = document.createElement("div");
    node.classList = "state-1";
    
    console.log('node:', node);


    skullContainer.appendChild(node);

    let number = 1;

    //test
    // let test = document.querySelector("#skull-container div:nth-child(" + number + ")");
    let test = document.getElementById("skull-container");
    console.log('test:', Hazard(test, 0, 0, 1));
    //-


    let newSkull = new Hazard(test, 0, 0, 1);
    console.log('newSkull', newSkull);
    skulls.push(newSkull);
    console.log('skulls:', skulls)
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

    } else if(((direction == "left" && monster.xAxis != 1) || (direction == "right" && monster.xAxis != 5)) || ((direction == "up" && monster.yAxis != 1) || (direction == "down" && monster.yAxis != 5))){
        // jumpToggle();
        
        //Jump Sound
        playJump();
        
        monster.characterElement.classList.add("box-jump");
        //Updates the turn
        updateTurn();

        //Change character location
        if(direction == "left"){
            monster.xAxis = monster.xAxis - 1;
        } else if(direction == "up"){
            monster.yAxis = monster.yAxis - 1;
        } else if(direction == "down"){
            monster.yAxis = monster.yAxis + 1;
        } else{
            monster.xAxis = monster.xAxis + 1;
        }
        
        monster.characterElement.classList.add("box-animation-" + direction);
        setTimeout(function(){
            
            updateBoxLocation();
            monsterCheck();
            monster.characterElement.classList.remove("box-animation-" + direction);

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
    monster.xAxis = 3;
    monster.yAxis = 3;

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

    //document.getElementById("skulls").innerHTML = '';


    //Spawn new apple
    spawnApple();

}

//Update the boxes current location after it moves
function updateBoxLocation(){
    // boxMonster.classList.remove(currentLocationClass);
    // currentLocationClass = "item-" + (boxLocationX) + "-" + boxLocationY;
    monster.characterElement.classList = "mx-" + (monster.xAxis) + " my-" + monster.yAxis;

    // boxMonster.classList.add(currentLocationClass);
}

//UPDATE
//Updates the turn count
function updateTurn(){
    turnCount++;
    console.log("turn count: " + turnCount);

    //Increase points for apple
    if(turnCount % 5 == 0){
        apple.points += 5;
    }

    skullGrow();

    newSkull();
     
}




//Switch Collision Class
function switchCollision(collisionClass){
    monster.characterElement.classList.add(collisionClass);
        setTimeout(function(){
            monster.characterElement.classList.remove(collisionClass);
    }, wait);

}

//Jump toggle
function jumpToggle(){
    monster.characterElement.classList.add("box-jump");
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
        if((apple.xAxis != monster.xAxis && apple.yAxis != monster.yAxis) && !skullsAtLocation(apple.xAxis, apple.yAxis)){
            // appleLocationClass = "item-" + appleX + "-" + appleY;
            apple.fruitElement.classList = "apple x-" + apple.xAxis + " y-" + apple.yAxis;
            break;
        }
    }
    
}

//Check for apple
function checkForApple(){
    if(apple.xAxis == monster.xAxis && apple.yAxis == monster.yAxis){

        playMunch();
        playerScore += apple.points;
        scoreCounter.innerHTML = playerScore;
        spawnApple();
        
    }
}

//Sound for apple

//Skull logic

function newSkull(){
    if((turnCount == nextSkull) && (currentSkull != maxSkulls)){
        insertSkull(currentSkull);
        let turnTilNextSkull = 4;
        if(turnCount > 33){
            turnTilNextSkull = 10;
        } else if(turnCount > 12){
            turnTilNextSkull = 7;
        }
        nextSkull = nextSkull + turnTilNextSkull;
    
        // skulls[currentSkull].state = 1; 
        // console.log("test: " + skulls[0]);
        skullSpawn(skulls[currentSkull]);
    
        currentSkull++;
    }
}

function insertSkull(number){
    let node = document.createElement("div");
    node.classList = "state-1";
    


    skullContainer.appendChild(node);

    // let number = 1;

    let newSkull = new Hazard(document.querySelector("#skull-container div:nth-child(" + (number + 1) + ")"), 0, 0, 1);
    skulls.push(newSkull);
}

//Spawn skull at random location
function skullSpawn(skull){
    //skullToSpawn(skull);

    while(true){
        
        var skullX = Math.floor(Math.random() * 5) + 1;
        var skullY = Math.floor(Math.random() * 5) + 1;
        if(skullX!= apple.xAxis && skullY != apple.yAxis){
            
            var locationClass = ("x-" + skullX + " y-" + skullY);
            var newClass = "state-1 " + locationClass;
            skull.xAxis = skullX;
            skull.yAxis = skullY;

            skull.hazardElement.classList = newClass;
            break;
        }
    }

}

//Not in use
// function skullToSpawn(skull){
//     //var breakPoint = 0;
//     while(true){
//         //console.log('breakPoint:', breakPoint)
        
//         // breakPoint++;
//         var skullX = Math.floor(Math.random() * 5) + 1;
//         var skullY = Math.floor(Math.random() * 5) + 1;
//         if(skullX!= apple.xAxis && skullY != apple.yAxis){
            
//             var locationClass = ("item-" + skullX + "-" + skullY);
//             var newClass = skull.hazardClass + " state-1 " + locationClass + " skull";
//             skull.xAxis = skullX;
//             skull.yAxis = skullY;

//             skull.hazardElement.classList = newClass;
//             break;
//         }
//     }
// }


//SkullGrow OOP
function skullGrow(){

    if(skulls.length != 0){
        
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

    
}

//OOP change skull state
function skullStateChange(skull, state){
    // skull.classList.remove("state-" + skull.state);
    skull.state = state;
    // skull.classList.add("state-" + skull.state);
    skull.hazardElement.classList = "x-" + skull.xAxis + " y-" + skull.yAxis + " state-" + skull.state;
}

//Check for skulls
function skullsAtLocation(xCordinate, yCordinate){
    let skullAtLocation = false;
    if(skulls.length != 0){

        skulls.forEach(skull =>{
            if((skull.xAxis == xCordinate) && (skull.yAxis == yCordinate)){
                skullAtLocation = true;
            }
        });

    }
    
    return skullAtLocation;
}

function gameOverCheck(){
    var gameOver = false;
    skulls.forEach(skull =>{
        if((monster.xAxis == skull.xAxis && monster.yAxis == skull.yAxis) && skull.state == 3){
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
    //Empty skull container
    skullContainer.innerHTML = "";
    //Reset skulls class
    skulls = [];

    // skulls.forEach(skull => {
    //     skull.xAxis = 0;
    //     skull.yAxis = 0;

    //     skull.state = 0;

    //     skull.hazardElement.classList = skull.state + " " + skull.hazardClass + " skull";
    // });
}

