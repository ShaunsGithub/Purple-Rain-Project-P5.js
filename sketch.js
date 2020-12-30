//Initializing a variable drops to hold an array of variables
//Three global variables
var drops = [];
var counter = 0;
var changePace = 10;

function setup() {
  //create the canvas with 400 X 400 pixels
  createCanvas(400, 400);
  //set up the array of drops
  setupDrops();
}

function setupDrops() {
  drops = [];
  //Create a new drop of rain 100 times.
  for(var i = 0; i < 10; i++){
    //The variable used to create the for loop ends up being the number sent to the drop creating function.
    drops[i] = new Drop();
  }
}

function draw() {
  counter++;
  if(counter > changePace) {
    counter = 0;
    if(drops.length > 50) {
      changePace = 1;
    }
    if(drops.length < 500) {
      drops[drops.length] = new Drop();
    }
    else {
      setupDrops();
    }
  }
  //Clear the canvas
  background(135, 206, 235);
  //loop throught all the drops calculating their next position and drawing them.
  for(var i = 0; i < drops.length; i++){
    //Call the function for the specific drop to fall and be shown.
    drops[i].fall();
    drops[i].show();
    
  }
}
//new class for the splashes
function Splash() {
  //sets the location of the splash
  this.start = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.thick = map(this.z, 0, 20, 1, 3);
    this.len = map(this.z, 0, 20, 5, 15);
  }
  this.x = 0;
  this.y = 0;
  this.z = 0;
  //draw splash.
  this.show = function() {
    strokeWeight(this.thick);
    
    line(this.x, this.y, this.x + 15, this.y - this.len);
    line(this.x, this.y, this.x - 15, this.y - this.len);
    line(this.x, this.y, this.x + 25, this.y - this.len);
    line(this.x, this.y, this.x - 25, this.y - this.len);
    line(this.x, this.y, this.x + 5, this.y - this.len);
    line(this.x, this.y, this.x - 5, this.y - this.len);
  }
}

//class for rain drops.
function Drop() {
  //Random position.
  this.x = random(0, 400);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  //map makes the the more distant rain drops smaller.
  this.len = map(this.z, 0, 20, 10, 20);
  //makes the more distant rain drops slower.
  this.yspeed = map(this.z, 0, 20, 1, 5);
  this.splash = new Splash();
  this.splashFlag = false;
  this.bottom = map(this.z, 0, 20, height - 40, height);
  this.thick = map(this.z, 0, 20, 1, 3);
  this.grav = map(this.z, 0, 20, 0.01, 0.2);
  
  //makes the drop fall and splash.
  this.fall = function() {
    this.yspeed = this.yspeed + this.grav;
    this.y = this.y + this.yspeed;
    
    //If the y position of the rain drop is less than the height of the canvas in other words below the canvas.
    if (this.y > this.bottom) {
      this.splashFlag = true;
      this.splash.start(this.x, this.y, this.z);
      //Give a random y position for the rain drop to start off again.
      this.y = random(-500, -50);
   
      this.yspeed = map(this.z, 0, 20, 1, 5);
    }
  }
  
  this.show = function() {
    if(this.splashFlag == true) {
      this.splash.show();
      this.splashFlag = false;
    }
    //Makes the rain drop seem closer by making it pop out more.
    strokeWeight(this.thick);
    //The colour of the rain drop.
    stroke(128, 0, 128);
    /*Creates the line using the x, y variables for its starting position and adding y with length variable to determine its ending 
    point*/
    line(this.x, this.y, this.x, this.y + this.len);
  }
  
}