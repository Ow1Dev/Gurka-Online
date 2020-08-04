import Player from '../src/Player';
import Card, { Suits } from '../src/Card';

describe('Player', () => {
  it('Should create an instance of the player', () => {
    const game = new Player('name');
    expect(game).toBeDefined();
  });

  it('Should deal a card to a player', () => {
    const player = new Player('name');
    player.dealCard(new Card(Suits.CLUB, 1));
    expect(player.hand.length).toBe(1);
    player.dealCard(new Card(Suits.HEART, 5));
    expect(player.hand.length).toBe(2);
  });

  it('Should take a card to a player', () => {
    const player = new Player('name');
    const card = new Card();

    player.dealCard(card);
    expect(player.hand.length).toBe(1);

    player.takeCard(new Card(Suits.HEART, 5));
    expect(player.hand.length).toBe(1);

    player.takeCard(card);
    expect(player.hand.length).toBe(0);
  });

  it('Should return currect card', () => {
    const player = new Player('name');
    const card = new Card();

    player.dealCard(new Card());
    player.dealCard(card);

    expect(player.hand.length).toBe(2);
    expect(player.getCard(0)).toMatchObject(card);
  });

  it('Player should have a name', () => {
    const player = new Player('test');
    expect(player.name).toBeDefined();
    expect(player.name).toBe('test');
  });
});
