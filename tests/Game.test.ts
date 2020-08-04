import Game from '../src/Game';
import Player from '../src/Player';

describe('Game', () => {
  it('Should create an instance of the game', () => {
    const game = new Game();
    expect(game).toBeDefined();
  });

  it('Should have a deck when created', () => {
    const game = new Game();
    expect(game.deck).toBeDefined();
  });

  it('Should be able to start a game', () => {
    const game = new Game();
    expect(game.hasStarted).toBe(false);

    game.start();
    expect(game.hasStarted).toBe(true);
  });

  it('Should give player 7 cards each', () => {
    const player = new Player('name');
    const game = new Game([player]);

    game.deck.initCards();
    game.reset(7);

    expect(player.hand.length).toBe(7);
    expect(game.deck.cards.length).toBe(47);
  });

  it('Should return to first player when finishTurn', () => {
    const game = new Game();
    game.start();

    game.setPlayerTurn(game.players.length - 1);
    expect(game.currentPlayer).toBe(game.players[game.players.length - 1]);
    game.finishPlayerTurn();
    expect(game.currentPlayer).toBe(game.players[0]);
  });
});

const game = new Game();
