import express from 'express';
import expressWs from 'express-ws';
import * as ws from 'ws';
import HashTable from './Util/HashTable';

const app = expressWs(express()).app;

var games: HashTable<ws[]> = {};

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

    switch (v.type) {
      case 'StartGame':
        BoardCastToGame(ID, 'the Game has started');
      case 'Msg':
        BoardCastToGame(ID, v.msg);
    }
  });

  ws.on('close', () => {
    RemovePlayerFromGame(ID, ws);
    BoardCastToGame(ID, `${Name} has Left`);
  });

  ws.on('error', () => {
    RemovePlayerFromGame(ID, ws);
    BoardCastToGame(ID, `Player got disconnected`);
  });

  console.log(games[ID]);

  AddPlayerToGame(ID, ws);
  BoardCastToGame(ID, `${Name} has joined this room`);
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
