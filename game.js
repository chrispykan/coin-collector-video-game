let game;
let player;
let platforms;
let items;
var text;
var currentScore = 0;
                                ///////////FUNCTIONS///////////

// create an item and to screen
function createItem(left, top, image){
  let item = items.create(left, top, image)
  item.animations.add('spin');
  item.animations.play('spin', 10, true);;
  }

// add items to collect in the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(375, 100, 'poison');
  createItem(125, 50, 'star');
}

// add platforms to game
function addPlatforms() {
  platforms.create = game.add.physicsGroup();
  platforms.setAll('body.immovable', true);
  platforms.create(450, 550, 'platform');

}
                                ///////////SETUP///////////

// seting up a phaser game when the page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  // will load befor the game begins
  function preload() {
    // background color
    game.stage.backgroundColor = '#7ce0f9';
    // load images
    game.load.image('platform', './assets/platform_1.png');
    game.load.image('platform2', './assets/platform_2.png');
    // load spritesheets
    game.load.spritesheet('dude', './assets/dude.png', 32, 32);
    game.load.spritesheet('coin', './assets/coin.png', 36, 44);
    game.load.spritesheet('token', './assets/token.png', 42, 54);
    game.load.spritesheet('star', './assets/star.png', 32, 32);
    game.load.spritesheet('poion', './assets/poison.png', 32, 32);
    
  }
  function create(){
    // Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
     // create and position sprite
    player = game.add.sprite(30, 600, 'dude');
    // middle of sprite in x direction, bottom of sprite in y direction
    player.anchor.setTo(0.5, 1);
  


    //  score display
    text = game.add.text(20, 20, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
  }

  function update(){
 

  }
};

