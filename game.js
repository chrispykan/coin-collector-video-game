let game;
let player;
let platforms;
let stars;
let scoreDisplay;
let currentScore = 0;
let cursors;
let jumpButton;

                                ///////////FUNCTIONS///////////
// add platforms to game
function createPlatforms() {
  platforms = game.add.physicsGroup();
 

  platforms.create(500, 550, 'platform');

  // platform does not move when collided with. *this code **AFTER** platforms have been positioned
  platforms.setAll('body.immovable', true);
}

// Stars to display in game
function createStars() {
  stars = game.add.physicsGroup();

  StarsCreate(450, 550, 'star');
}

// create stars with animations
function starCreate(left, top, starImage) {
  let star = stars.create(left, top, starImage);
  star.animations.add('spin');
  star.animations.play('spin', 10, true);

}
 

                                ///////////SETUP///////////

// seting up a phaser game when the page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
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
    
     // create and position sprite
    player = game.add.sprite(30, 600, 'dude');
    // middle of sprite in x direction, bottom of sprite in y direction
    player.anchor.setTo(0.5, 1);
    // sprite can walk
    player.animations.add('walk');
    // Enable the Arcade Physics system **AFTER** SPRITE SETTINGS
    game.physics.arcade.enable(player);
    //sprite stops at edges
    player.body.collideWorldBounds = true;

    createPlatforms();

    //  score display
    scoreDisplay = game.add.text(20, 20, "SCORE:" + currentScore, { font: "bold 20px Press Start 2P", fill: "white" });
   
    // keyboard input to play game
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  function update() {
    game.physics.arcade.collide(player, platforms);

    if (cursors.right.isDown) {
      // sprite walks when right key is pressed
      player.animations.play('walk', 10, true);
      // walks 350px per second in positive direction
      player.body.velocity.x = 350;
      // sprite body stays in positive scale 1 
      player.scale.x = 1;
    }

    else if (cursors.left.isDown) {
      // sprite walks when left key is pressed
      player.animations.play('walk', 10, true);
      // walks 350px per second in negative direction
      player.body.velocity.x = -350;
      // sprite body turns left
      player.scale.x = - 1;
    }
  
  }

  function render() {

  }

};

