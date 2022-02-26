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

// function addPlayer(self, playerInfo){
//   const ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship', 0);
//   ship.primary = playerInfo.primary
//   ship.playerId = playerInfo.playerId
//   ship.shieldLevel = 0
//   ship.spray = false
//   ship.rateOfFire = 200
//   ship.speed = 100
//   self.asteroids = self.physics.add.group();
//   asteroids = self.asteroids
//   overlap = self.physics.add.overlap(ship, self.asteroids, crash, null, this)
//   overlap.name = self.socket.id
//   ship.setMaxVelocity(150, 150)
//   self.ship = ship
// }

// function addOtherPlayers(self, playerInfo){
//   const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship', 0);
//   otherPlayer.shieldLevel = 0
//   otherPlayer.setMaxVelocity(150, 150)
//   self.otherPlayers[playerInfo.playerId] = otherPlayer
// }

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
// }

// function startSocketActions(self, allowedPlayersCount) {
//   self.socket = io.connect('', { query: `allowedPlayersCount=${allowedPlayersCount}` });
//   socket = self.socket;
//   self.socket.on('inProgress', function () {
//     clearStartScreen()
//     self.add.text(225, 400, 'Game In Progress. Go Away.'.toUpperCase(), { fontSize: '32px' })
//   })
//   self.socket.on('currentPlayers', function (players) {
//     Object.keys(players).forEach(function (id) {
//       if (players[id].playerId === self.socket.id) {
//         addPlayer(self, players[id]);
//       } else {
//         addOtherPlayers(self, players[id])
//       }
//     });
//   });
//   self.socket.on('waitingForPlayers', (gameData) => {
//     displayWaitScreen(self, gameData)
//   })
//   self.socket.on('newPlayer', function(playerInfo){
//     addOtherPlayers(self, playerInfo)
//   });
//   self.socket.on('disconnect', function(playerId){
//     self.otherPlayers[playerId].destroy()
//   })
//   self.socket.on('playerMoved', function(playerInfo){
//     otherPlayer = self.otherPlayers[playerInfo.playerId]
//     otherPlayer.setRotation(playerInfo.rotation)
//     otherPlayer.setPosition(playerInfo.x, playerInfo.y)
//   })
//   self.socket.on('createAsteroids', function (asteroidArray) {
//     asteroidArray.forEach((asteroid) => {
//       let phaserAsteroid = self.asteroids.create(500, 500, `asteroid${asteroid.scale}`)
//       phaserAsteroid.setScale(1.5)
//       phaserAsteroid.index = asteroid.index
//       phaserAsteroid.setPosition(asteroid.x, asteroid.y)
//       phaserAsteroid.setVelocity(asteroid.xVel, asteroid.yVel)
//     })
//     // start game
//     clearWaitScreen()
//     hasGameStarted = true
//   })
//   self.socket.on('laserUpdate', function(laser, owner) {
//     let laser_instance = new Laser(self, laser.x, laser.y, 'laserBlue');
//     self.add.existing(laser_instance);
//     self.physics.add.existing(laser_instance);
//     laser_instance.fire(laser.x, laser.y, laser.rotation, false);
//     self.physics.add.overlap(laser_instance, self.asteroids, destroyAsteroid);
//   });
//   self.socket.on('broadcastDestoryAsteroid', function(asteroidIndex){
//     self.asteroids.children.entries.forEach(function(asteroid) {
//       if (asteroid.index === asteroidIndex) asteroid.destroy()
//     })
//   })
//   self.socket.on('disableOtherPlayer', function(socketId){
//     self.otherPlayers[socketId].disableBody(true, true);
//   })
//   self.socket.on('enableOtherPlayer', function(socketId){
//     otherPlayer = self.otherPlayers[socketId]
//     otherPlayer.enableBody(true, otherPlayer.body.x, otherPlayer.body.y, true, true)
//   })
//   self.socket.on('updateScore', function({socketId, score: newScore}){
//     if (socketId === self.ship.playerId) {
//       score = newScore
//     } else {
//       scoreOther = newScore
//     }
//     updateScoreText()
//   })
//   self.socket.on('updateTimer', function(time){
//     if (time <= 0) {
//       endGame(self)
//     } else {
//       timerDisplay.setText(getTimerDisplay(time));
//     }
//   })
//   self.socket.on('shieldUpdateOtherPlayers', function(data){
//     let socketId = data['socketId']
//     otherPlayer = self.otherPlayers[socketId]
//     otherPlayer.shieldLevel = data['shieldLevel']
//     updateShieldPowerUp(otherPlayer)
//   })
//   self.socket.on('updatePowerups', function(data){
//     let powerup = physics.add.sprite(data['x'], data['y'], data['type'], 0);
//     powerup.id = data['id']
//     if(data['type'] === 'shield_powerup'){
//       physics.add.overlap(self.ship, powerup, shieldPowerup);
//     } else if(data['type'] === 'silver_powerup'){
//       physics.add.overlap(self.ship, powerup, rateOfFirePowerup);
//     } else if(data['type'] === 'gold_powerup'){
//       physics.add.overlap(self.ship, powerup, sprayPowerup);
//     } else {
//       physics.add.overlap(self.ship, powerup, speedPowerup);
//     }
//     powerupHash[data['id']] = powerup
//   })
//   self.socket.on('shieldPowerUp', function(data){
//     console.log('shieldPowerUp listener')
//     let powerup = powerupHash[data['powerupId']]
//     if(self.ship.playerId === data['playerId']){
//       self.ship.shieldLevel = 2;
//       self.ship.setTexture('ship_shield1')
//     } else {
//       powerup.destroy()
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.shieldLevel = 2;
//       otherPlayer.setTexture('ship_shield1')
//     }
//   })
//   self.socket.on('silverPowerup', function(data){
//     console.log('rateOfFire listener')
//     let powerup = powerupHash[data['powerupId']]
//     if(self.ship.playerId === data['playerId']){
//       self.ship.rateOfFire = true
//     } else {
//       powerup.destroy();
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.rateOfFire = true;
//     }
//   })
//   self.socket.on('silverPowerupOff', function(data){
//     if(self.ship.playerId === data['playerId']){
//       self.ship.rateOfFire = false
//     } else {
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.rateOfFire = false;
//     }
//   })
//   self.socket.on('goldPowerup', function(data){
//     console.log('Spray listener')
//     let powerup = powerupHash[data['powerupId']]
//     if(self.ship.playerId === data['playerId']){
//       self.ship.spray = true
//     } else {
//       powerup.destroy();
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.spray = true;
//     }
//   })
//   self.socket.on('goldPowerupOff', function(data){
//     if(self.ship.playerId === data['playerId']){
//       self.ship.spray = false
//     } else {
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.spray = false;
//     }
//   })
//   self.socket.on('starPowerup', function(data){
//     console.log('speed listener')
//     let powerup = powerupHash[data['powerupId']]
//     if(self.ship.playerId === data['playerId']){
//       self.ship.speed += 600
//     } else {
//       powerup.destroy();
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.speed += 600
//     }
//   })

//   self.socket.on('starPowerupOff', function(data){
//     let powerup = powerupHash[data['powerupId']]
//     if(self.ship.playerId === data['playerId']){
//       self.ship.speed -= 600
//     } else {
//       otherPlayer = self.otherPlayers[data['playerId']]
//       otherPlayer.speed -= 600
//     }
//   })
// }

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