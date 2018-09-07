let game


// seting up a phaser game when the page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  // will load befor the game begins
  function preload() {
    // background color
    game.stage.backgroundColor = "#a4b3c9";
    // load images
    game.load.image("platform", "./assets/platform_1.png");
    game.load.image("platform2", "./assets/platform_2.png");
    game.load.image("coin", "./assets/coin.png");
    game.load.image("token", "./assets/token.png");
    game.load.image("star", "./assets/star.png");
    game.load.image("poion", "./assets/poison.png");
    // load spritesheets
    game.load.spritesheet("dude", "./assets/dude.png");
  }
  function create(){

  }
  function update(){

  }
};

