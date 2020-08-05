import Game from '../src/Game';
import Player from '../src/Player';
import Card, { Suits } from '../src/Card';

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

  it('Should be able to put a card in the middle', () => {
    const player = new Player('test');
    const game = new Game([player]);

    const card_1 = new Card(Suits.SPADE, 1);
    const card_2 = new Card(Suits.SPADE, 5);
    const card_3 = new Card(Suits.SPADE, 11);

    player.dealCard(card_1);
    player.dealCard(card_2);
    player.dealCard(card_3);

    expect(player.hand.length).toBe(3);

    let success = false;

    // Start card
    success = game.putACardinMiddleDeck(player, card_3);
    expect(success).toBe(true);
    expect(player.hand.length).toBe(2);
    expect(game.middledeck.cards.length).toBe(1);

    success = game.putACardinMiddleDeck(player, card_2);
    expect(success).toBe(false);
    expect(player.hand.length).toBe(2);
    expect(game.middledeck.cards.length).toBe(1);

    success = game.putACardinMiddleDeck(player, card_1);
    expect(success).toBe(true);
    expect(player.hand.length).toBe(1);
    expect(game.middledeck.cards.length).toBe(2);
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
