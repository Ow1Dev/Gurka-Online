import Player from '../src/Game/Player';
import Card, { Suits } from '../src/Game/Card';

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

  it('Should be able to clear the hand', () => {
    const player = new Player('name');
    const card = new Card();
    player.dealCard(card);

    player.clearHand();
    expect(player.hand.length).toBe(0);
  });

  it('Should return if the player owns the card', () => {
    const player_1 = new Player();
    const player_2 = new Player();
    const card = new Card();

    player_1.dealCard(card);
    expect(player_1.hand.length).toBe(1);
    expect(player_2.hand.length).toBe(0);

    var p1OwnsCard = player_1.ownsCard(card);
    var p2OwnsCard = player_2.ownsCard(card);

    expect(p1OwnsCard).toBe(true);
    expect(p2OwnsCard).toBe(false);
  });

  it('Should return currect card', () => {
    const player = new Player('name');
    const card = new Card();

    player.dealCard(new Card());
    player.dealCard(card);

    expect(player.hand.length).toBe(2);
    expect(player.getCard(0)).toMatchObject(card);
  });

  it('Should return the lowest card', () => {
    const player = new Player();
    const lowCard = new Card(Suits.HEART, 2);

    player.dealCard(new Card(Suits.CLUB, 7));
    player.dealCard(lowCard);
    player.dealCard(new Card(Suits.DIAMOND, 3));

    expect(player.getCard(1)).toBe(lowCard);

    const c = player.getLowestCard();
    expect(c).toBe(lowCard);
  });

  it('Player should have a name', () => {
    const player = new Player('test');
    expect(player.name).toBeDefined();
    expect(player.name).toBe('test');
  });
});
