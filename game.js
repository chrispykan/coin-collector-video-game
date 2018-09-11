let game;
let player;
let platforms;
let items;
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

// add animated items to display in game
function addItems() {
  items = game.add.physicsGroup();

  createItem(315, 100, 'star');
  createItem(600, 500, 'coin');
  createItem(400, 450, 'poison');
}

// create items with animations
function createItem(left, top, image) {
  let item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}


                                ///////////HANDLERS///////////
function itemCollect(player, item) {
    item.kill();
    if (item.key === 'coin') {
       currentScore = currentScore + 10;
    } 
    else if (item.key === 'star') {
       currentScore = currentScore + 25;
    } 
    else if (item.key === 'poison') {
       currentScore = currentScore - 25;
    }
  }


                            
                                ///////////SETUP///////////

// seting up a phaser game when the page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  // will load before the game begins
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
    game.load.spritesheet('poison', './assets/poison.png', 32, 32);
    
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
    // sprite jump gravity velocity
    player.body.gravity.y = 500;

    //  score display
    scoreDisplay = game.add.text(20, 20, "SCORE:" + currentScore, { font: "24px Press Start 2P", fill: "white" });
   
    // keyboard input to play game
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    createPlatforms();
    addItems();
  }

  function update() {
    // update score when items are collected
   scoreDisplay.text = "SCORE:" + currentScore;
    // if sprite collides with platform
    game.physics.arcade.collide(player, platforms);
    // when sprite collects items
    game.physics.arcade.overlap(player, items, itemCollect);
    // Reset the sprite's movement
    player.body.velocity.x = 0;
    

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
    else {
      //  stand still
      player.animations.stop();
    }
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
  }

  function render() {
  }

};