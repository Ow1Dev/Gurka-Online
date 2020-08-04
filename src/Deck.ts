import Card, { Suits } from './Card';

export default class Deck {
  cards: Card[] = [];

  initCards() {
    for (let i = 1; i <= 13; i++) {
      this.cards.push(new Card(Suits.CLUB, i));
      this.cards.push(new Card(Suits.DIAMOND, i));
      this.cards.push(new Card(Suits.HEART, i));
      this.cards.push(new Card(Suits.SPADE, i));
    }

    this.cards.push(new Card(Suits.JOKER, 0));
    this.cards.push(new Card(Suits.JOKER, 0));
  }

  getRandomCard(): Card {
    return this.getCard(Math.floor(Math.random() * this.cards.length));
  }

  getCard(i: number): Card {
    return this.cards[i];
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(card: Card) {
    var index = this.cards.indexOf(card);
    if (index < 0) return;
    this.cards.splice(index, 1);
  }

  /**
   *   Generate the Deck
   */
  constructor() {}
}
