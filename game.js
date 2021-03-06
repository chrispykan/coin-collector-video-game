// Dev: Chris Kanyotu - www.github.com/chrispykan
let game;
let player;
let platforms;
let items;
let poisons;
let tokens;
let scoreDisplay;
let currentScore = 0;
let cursors;
let jumpButton;
let livesDisplay;
let currentLives = 3;
let message;
let won = false;
let winningScore = 100;
let gameOver = false;



                                ///////////FUNCTIONS///////////
// add platforms to game
function createPlatforms() {
  platforms = game.add.physicsGroup();

  //  place platforms
  platforms.create(450, 550, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(300, 450, 'platform');
  platforms.create(250, 150, 'platform');
  platforms.create(50, 300, 'platform');
  platforms.create(150, 250, 'platform');
  platforms.create(650, 300, 'platform');
  platforms.create(550, 200, 'platform2');
  platforms.create(300, 450, 'platform2');
  platforms.create(400, 350, 'platform2');
  platforms.create(100, 100, 'platform2');


  // platform does not move when collided with. *this code **AFTER** platforms have been positioned
  platforms.setAll('body.immovable', true);
}

function createPoisons() {
  poisons = game.add.physicsGroup();

  // place poisons
  poisonCreate(375, 100, 'poison');
  poisonCreate(370,500,'poison');
  poisonCreate(100, 375, 'poison');
}

// add spinnning animated items to display in game (coins, stars)
function addItems() {
  items = game.add.physicsGroup();

  // place items(coins and stars)
  createItem(375, 400, 'coin');
  createItem(575, 500, 'coin');
  createItem(225, 500, 'coin');
  createItem(100, 250, 'coin');
  createItem(575, 150, 'coin');
  createItem(525, 300, 'coin');
  createItem(650, 250, 'coin');
  createItem(225, 200, 'coin');
  createItem(125, 50, 'star');
}

// create items with spin animations  (stars and coins )
function createItem(left, top, image) {
  let item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 8, true);
}

// create poison with bubble animation
function poisonCreate(left, top, poisonImage){
  let poison = poisons.create(left, top, poisonImage);
  poison.animations.add('bubble');
  poison.animations.play('bubble', 10, true);
}
// token function is separate from other spinning items as I call it only at the end
function createToken(left, top, image) {
  tokens = game.add.physicsGroup();
  let token = tokens.create(750, 500, 'token');
  token.animations.add('spin');
  token.animations.play('spin', 8, true);
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
  if (currentScore === winningScore) {
    createToken();
    
  }
}
// remove poison from display when collected
function poisonCollect(player, poison) {
  poison.kill();
  currentLives = currentLives - 1;
  // when player loses
  if (currentLives === 0) {
    player.kill();
    gameOver = true;

  }
}
// remove token from display when collected and win the game
function tokenCollect (player, token) {
  token.kill();
  won = true;
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
    scoreDisplay = game.add.text(16, 16, "SCORE:" + currentScore, { font: "20px Press Start 2P", fill: "white" });
    // display sprite lives
    livesDisplay = game.add.text(645, 16, "LIVES:" + currentLives, { font: "20px Press Start 2P", fill: "white" });
    // display winning message
    message = game.add.text(game.world.centerX, 250, "", { font: "30px Press Start 2P", fill: "white" });
    message.anchor.setTo(0.5, 1);
    // keyboard input to play game
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  

    createPlatforms();
    addItems();
    createPoisons();
  }

  function update() {
    // if sprite collides with platform
    game.physics.arcade.collide(player, platforms);
    // when sprite collects items ( coins and stars)
    game.physics.arcade.overlap(player, items, itemCollect);
    // when sprite collects poison
    game.physics.arcade.overlap(player, poisons, poisonCollect);
    // //  when win token is created
    game.physics.arcade.overlap(player, tokens, tokenCollect);
    // Reset the sprite's movement
    player.body.velocity.x = 0;
     // update score when items are collected
    scoreDisplay.text = "SCORE:" + currentScore;
    // update lives if poison is collected
    livesDisplay.text = "LIVES:" + currentLives;
    

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
    if (won) {
      message.text = "  YAY!\n\nYOU WON!";
    }
    if (gameOver) {
      message.text ="        x_x\n\nYOU DIED.TRY AGAIN!"
    }
  }

  function render() {
  }

};