import express from 'express';
import expressWs from 'express-ws';
import * as ws from 'ws';
import HashTable from './Util/HashTable';

import Game from './Game/Game';
import Player from './Game/Player';

const app = expressWs(express()).app;

var games: HashTable<Game> = {};

app.ws('/game', (ws, req) => {
  if (!req.query.ID || !req.query.Name) {
    ws.close(1000, 'No Game ID');
    return;
  }

  let ID = req.query.ID as string;
  let Name = req.query.Name as string;

  if (Name.length < 3) {
    ws.close();
    return;
  }

  ws.on('message', (msg: string) => {
    let v = JSON.parse(msg);
    if (!v.type) return;

    const player = GetPlayerBySocket(ID, ws);
    if (player === null) return;
    v.player = player;

    switch (v.type) {
      case 'StartGame':
        games[ID].boardcast('the Game has started');
      case 'Msg':
        games[ID].boardcast(`${v.player.name}: ${v.msg}`);
    }
  });

  ws.on('close', () => {
    RemovePlayerFromGame(ID, GetPlayerBySocket(ID, ws));
    games[ID].boardcast(`${Name} has Left`);
  });

  ws.on('error', () => {
    RemovePlayerFromGame(ID, GetPlayerBySocket(ID, ws));
    games[ID].boardcast(`Player got disconnected`);
  });

  console.log(games[ID]);

  AddPlayerToGame(ID, new Player(ws, Name));
  games[ID].boardcast(`${Name} has joined this room`);
});

//TODO: Add and rmove plauer to gamme class
function AddPlayerToGame(ID: string, player: Player) {
  games[ID] = games[ID] === undefined ? new Game() : games[ID];
  games[ID].players.push(player);
}

function RemovePlayerFromGame(ID: string, player: Player | null) {
  if (player === null) return;

  var index = games[ID].players.indexOf(player);
  if (index < 0) return;
  games[ID].players.splice(index, 1);
}

//TODO: Add to util class
function GetPlayerBySocket(ID: string, socket: ws): Player | null {
  var player: Player | null = null;
  for (let p of games[ID].players) {
    if (p.conneciton === socket) {
      player = p;
      break;
    }
  }
  return player;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
