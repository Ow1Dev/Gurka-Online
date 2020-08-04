import Deck from '../src/Deck';
import Card, { Suits } from '../src/Card';

describe('Deck', () => {
  it('Should create an instance of the player', () => {
    const deck = new Deck();
    expect(deck).toBeDefined();
  });

  it('Should deal have 54 cards', () => {
    const deck = new Deck();
    deck.initCards();
    expect(deck.cards.length).toBe(54);
  });

  it('Should be apple to add a card to deck', () => {
    const deck = new Deck();
    const card = new Card();

    expect(deck.cards.length).toBe(0);
    deck.addCard(card);
    expect(deck.cards.length).toBe(1);
    expect(deck.cards[0]).toBe(card);
  });
  it('Should be apple to remove a card to deck', () => {
    const deck = new Deck();
    const card = new Card();

    deck.addCard(card);
    expect(deck.cards.length).toBe(1);

    deck.removeCard(new Card());
    expect(deck.cards.length).toBe(1);

    deck.removeCard(card);
    expect(deck.cards.length).toBe(0);
    expect(deck.cards.includes(card)).toBe(false);
  });
});
