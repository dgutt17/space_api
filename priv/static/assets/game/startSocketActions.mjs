// import Socket from "../../../../assets/js/phaser_socket.js"
// import phaser_socket from "/assets/js/phaser_socket.js"
// import {Socket} from "phoenix"

// We use self to pass this so not to confuse with the this keyword in JS
export default function startSocketActions(self, allowedPlayersCount) {
  // self.socket = io.connect('', { query: `allowedPlayersCount=${allowedPlayersCount}` });
  // socket = self.socket;
  let socket = new Socket("/socket", {params: {token: window.userToken}})
  socket.connect()
  let channel = socket.channel("room:42", {})
  channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp) })
    .receive("error", resp => { console.log("Unable to join", resp) })

  // socket.on('currentPlayers', function (players) {
  //   Object.keys(players).forEach(function (id) {
  //     if (players[id].playerId === self.socket.id) {
  //       addPlayer(self, players[id]);
  //     } else {
  //       addOtherPlayers(self, players[id])
  //     }
  //   });
  // });
}

function addPlayer(self, playerInfo){
  const ship = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship', 0);
  ship.primary = playerInfo.primary
  ship.playerId = playerInfo.playerId
  ship.shieldLevel = 0
  ship.spray = false
  ship.rateOfFire = 200
  ship.speed = 100
  self.asteroids = self.physics.add.group();
  asteroids = self.asteroids
  overlap = self.physics.add.overlap(ship, self.asteroids, crash, null, this)
  overlap.name = self.socket.id
  ship.setMaxVelocity(150, 150)
  self.ship = ship
}

function addOtherPlayers(self, playerInfo){
  const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'ship', 0);
  otherPlayer.shieldLevel = 0
  otherPlayer.setMaxVelocity(150, 150)
  self.otherPlayers[playerInfo.playerId] = otherPlayer
}