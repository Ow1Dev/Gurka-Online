export enum Suits {
  SPADE,
  HEART,
  DIAMOND,
  CLUB,
  JOKER,
}

export default class Card {
  suit: Suits;
  number: Number;

  /**
   * Generate the Card
   */
  constructor(suit: Suits = Suits.JOKER, number: Number = 0) {
    this.suit = suit;
    this.number = number;
  }
}
