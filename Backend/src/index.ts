import express from 'express';
import expressWs from 'express-ws';
import * as ws from 'ws';

const app = expressWs(express()).app;

interface HashTable<T> {
  [key: string]: T;
}

var games: HashTable<ws[]> = {};

app.ws('/game', (ws, req) => {
  if (!req.query.ID) {
    ws.close();
    return;
  }

  let ID = req.query.ID as string;

  ws.on('message', (msg: String) => {
    console.log(`${msg}`);
    ws.send(msg);
  });

  ws.on('close', () => {
    RemovePlayerFromGame(ID, ws);
    BoardCastToGame(ID, `A Player has Left`);
  });

  ws.on('error', () => {
    RemovePlayerFromGame(ID, ws);
    BoardCastToGame(ID, `A Player got disconnected`);
  });

  console.log(games[ID]);

  AddPlayerToGame(ID, ws);
  BoardCastToGame(ID, `A new Player has joined with game ID ${req.query.ID}`);
});

function AddPlayerToGame(ID: string, socket: ws) {
  games[ID] = games[ID] === undefined ? [] : games[ID];
  games[ID].push(socket);
}

function RemovePlayerFromGame(ID: string, socket: ws) {
  var index = games[ID].indexOf(socket);
  if (index < 0) return;
  games[ID].splice(index, 1);
}

function BoardCastToGame(ID: string, msg: string) {
  games[ID].forEach((e) => {
    e.send(msg);
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
