let game;
let character;
var platforms;


// seting up a phaser game when the page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  // will load befor the game begins
  function preload() {
    // background color
    game.stage.backgroundColor = '#a4b3c9';
    // load images
    game.load.image('platform', './assets/platform_1.png');
    game.load.image('platform2', './assets/platform_2.png');
    // load spritesheets
    game.load.spritesheet('dude', './assets/dude.png', 48, 62);
    game.load.spritesheet('coin', './assets/coin.png' 36, 44);
    game.load.spritesheet('token', './assets/token.png' 42, 54);
    game.load.spritesheet('star', './assets/star.png' 32, 32);
    game.load.spritesheet('poion', './assets/poison.png' 32, 32);
    
  }
  function create(){
    // Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // create the sprite
    character = game.add.sprite(20, 539, 'dude');
  );
    
   
  }
  function update(){

  }
};

