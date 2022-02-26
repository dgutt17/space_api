import preload from './preload.mjs'
import create from './create.mjs'
import update from './update.mjs'

let canvasWidth = 1000;
let canvasHeight = 800;

var config = {
  type: Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);

// let setAsteroids;
// let asteroids;
// let score = 0;
// let scoreOther = 0;
// let gameOver = false;
// let scoreText;
// let scoreTextOther;
// let cursors;
// let lastFired = 100;
// let socket;
// let physics;
// let startScreen;
// let hasJoined = false;
// let hasGameStarted = false;
// let selector;
// let selectorYPos1 = 583;
// let selectorYPos2 = 653;
// let rateOfFire = 200;
// let scene = null;
// let spray = false;
// const angles = [-0.4, -0.2, 0.2, 0.4]
// let speed = 100
// let timerDisplay;
// let timedEvent;
// let isTimerRunning = false;
// let waitingText;
// let roomTagInstructionsText;
// let roomTagText;
// let powerupHash = {}

// class LaserGroup extends Phaser.Physics.Arcade.Group
// {
//   constructor(scene) {
//     super(scene.physics.world, scene);
//     this.createMultiple({
//       classType: Laser,
//       frameQuantity: 30, // 30 instances of Laser
//       active: false,
//       visible: false,
//       key: 'laserGreen'
//     })
//   }

//   fireLaser(x, y, r) {
//     const laser = this.getFirstDead(true, x, y, 'laserGreen');
//     let ship = this.scene.ship
//     if (laser) {
//       laser.fire(x, y, r);
//       if (ship.spray) {
//         for(let i = 0; i <= 3; i++) {
//           const laser = this.getFirstDead(true, x, y, 'laserGreen');
//           laser.fire(x, y, r + angles[i]);
//         }
//       }
//     }
//   }
// }

// class Laser extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y, sprite = 'laserGreen') {
//     super(scene, x, y, sprite);
//   }

//   fire(x, y, r, emit = true) {
//     this.body.reset(x, y);
//     this.setActive(true);
//     this.setVisible(true);
//     this.setAngle(r)
//     this.setScale(0.5)
//     this.scene.physics.add.overlap(this, this.scene.asteroids, destroyAsteroid);
//     this.scene.physics.velocityFromRotation(r, 400, this.body.velocity);
//     if (emit && this.scene.socket) this.scene.socket.emit('laserShot', { x: x, y: y, rotation: r })
//   }
// }

// function crash(player, asteroid){
//   asteroid.destroy()
//   socket.emit('destroyAsteroid', {asteroidIndex: asteroid.index, laser: false})
//   if (player.shieldLevel === 0) {
//     player.disableBody(true, true);
//     socket.emit('disablePlayer', socket.id)
//     resetPlayer(player)
//   } else {
//     player.shieldLevel -= 1;
//     let texture = player.shieldLevel === 0 ? 'ship' : 'ship_shield2'
//     player.setTexture(texture)
//     socket.emit('shieldUpdate', {socketId: player.playerId, shieldLevel: player.shieldLevel})
//   }
// }

// function resetPlayer(player) {
//   setTimeout(() => {
//     player.enableBody(true, player.body.x, player.body.y, true, true)
//     player.setTexture('ship')
//     socket.emit('enablePlayer', socket.id)
//     pauseCollider(player)
//   }, 500)
// }

// function pauseCollider(player) {
//   setTimeout(() => {
//     overlap = physics.add.overlap(player, asteroids, crash, null, this)
//     overlap.name = socket.id
//   }, 2000)
//   const collider = physics.world.colliders.getActive().find(function(collider){
//     return collider.name === socket.id
//   })
//   collider.destroy()
// }


// function destroyAsteroid(laser, asteroid) {
//   asteroid.disableBody(true, true);
//   if (laser.texture.key === 'laserGreen') {
//     socket.emit('destroyAsteroid', {asteroidIndex: asteroid.index, laser: true, x: asteroid.x, y: asteroid.y})
//   }
//   laser.destroy()
// }

// function rateOfFirePowerup(ship, powerup) {
//   if(powerup){
//     console.log('rateOfFirePowerup emitter')
//     socket.emit('destroyPowerup', powerup.id, 'silver_powerup')
//     powerup.destroy()
//   }
// }

// function sprayPowerup(ship, powerup) {
//   if(powerup){
//     console.log('sprayPowerup emitter')
//     socket.emit('destroyPowerup', powerup.id, 'gold_powerup')
//     powerup.destroy()
//   }
// }

// function shieldPowerup(ship, powerup) {
//   if(powerup){
//     console.log('shieldPowerup emitter')
//     socket.emit('destroyPowerup', powerup.id, 'shield_powerup')
//     powerup.destroy()
//   }
// }

// function updateShieldPowerUp(player){
//   if(player.shieldLevel === 2){
//     player.setTexture('ship_shield1')
//   } else if(player.shieldLevel === 1){
//     player.setTexture('ship_shield2')
//   } else{
//     player.setTexture('ship')
//   }
// }

// function speedPowerup(ship, powerup) {
//   if(powerup){
//     console.log('speed emitter')
//     socket.emit('destroyPowerup', powerup.id, 'star_powerup')
//     powerup.destroy()
//   }
// 

// function getOutcome() {
//   if (score > scoreOther) return 'You Win!'
//   if (score === scoreOther) return 'You Tied!'
//   return 'You Lose!'
// }

// function endGame(self) {
//   hasGameStarted = false
//   self.ship.destroy()
//   Object.values(self.otherPlayers).forEach((player) => player.destroy())
//   timerDisplay.destroy()
//   let gameOverText = self.add.text(500, 300, 'Times Up:'.toUpperCase(), { fontSize: '32px' })
//   let outcomeText = self.add.text(500, 340, getOutcome().toUpperCase(), { fontSize: '32px' })
//   gameOverText.setOrigin(0.5)
//   outcomeText.setOrigin(0.5)
//   scoreText.setOrigin(0.5)
//   scoreText.setPosition(500, 400)
//   scoreTextOther.setOrigin(0.5)
//   scoreTextOther.setPosition(500, 420)
// }

// function updateScoreText() {
//   scoreText.setText('Your Score: ' + score);
//   scoreTextOther.setText('Opponent Score: ' + scoreOther);
// }

// function getTimerDisplay(time) {
//   let minutes = Math.floor(time / 60)
//   let remainingSeconds = time % 60
//   let seconds = (remainingSeconds < 10) ? '0' + remainingSeconds : remainingSeconds
//   return minutes + ':' + seconds
// }

// function displayWaitScreen(self, gameData) {
//   timerDisplay.setText(getTimerDisplay(gameData['time']));
//   waitingText = self.add.text(500, 300, 'Waiting for other player to join...'.toUpperCase(), { fontSize: '32px' })
//   roomTagInstructionsText = self.add.text(500, 420, 'Send the other player this url:', { fontSize: '28px' })
//   waitingText.setOrigin(0.5)
//   roomTagInstructionsText.setOrigin(0.5)
//   roomTagText = document.createElement("P")
//   roomTagText.innerText = gameData['baseUrl'] + '?room_tag=' + gameData['roomTag']
//   roomTagText.classList.add("room-tag")
//   let canvas = document.getElementsByTagName('canvas')[0]
//   document.body.appendChild(roomTagText)
// }

// function clearWaitScreen() {
//   if (waitingText) {
//     waitingText.destroy()
//     roomTagInstructionsText.destroy()
//     roomTagText.parentNode.removeChild(roomTagText)
//     // roomTagText.destroy()
//   }
// }